"""FastAPI application factory."""

import secrets
from contextlib import asynccontextmanager
from datetime import datetime, timezone
from typing import AsyncIterator

from azure.core.exceptions import AzureError
from azure.servicebus.exceptions import ServiceBusError
from fastapi import FastAPI, HTTPException, Request, status
from starlette.datastructures import Headers
from starlette.responses import JSONResponse
from starlette.types import ASGIApp, Message, Receive, Scope, Send

from app.config import Settings
from app.messages import build_queue_message, new_correlation_id
from app.models import HealthResponse, IngestionRequest, IngestionResponse, ReadyResponse
from app.publisher import AzureServiceBusPublisher, PublisherUnavailable
from shared.telemetry import audit, configure_logging


def content_length_status(method: str, content_length: str | None, max_bytes: int) -> int | None:
    """Return an HTTP status when a write request declares an unacceptable size."""
    if method not in {"POST", "PUT", "PATCH"} or content_length is None:
        return None
    try:
        size = int(content_length)
    except ValueError:
        return status.HTTP_400_BAD_REQUEST
    if size > max_bytes:
        return status.HTTP_413_CONTENT_TOO_LARGE
    return None


def _remember_correlation_id(scope: Scope, correlation_id: str) -> None:
    state = scope.setdefault("state", {})
    if isinstance(state, dict):
        state["correlation_id"] = correlation_id
        return
    setattr(state, "correlation_id", correlation_id)


class CorrelationMiddleware:
    """Attach a correlation id to every HTTP response, including validation errors."""

    def __init__(self, app: ASGIApp) -> None:
        self.app = app

    async def __call__(self, scope: Scope, receive: Receive, send: Send) -> None:
        if scope["type"] != "http":
            await self.app(scope, receive, send)
            return
        correlation_id = new_correlation_id(Headers(scope=scope).get("x-correlation-id"))
        _remember_correlation_id(scope, correlation_id)
        encoded = correlation_id.encode("ascii")

        async def send_with_correlation(message: Message) -> None:
            if message["type"] == "http.response.start":
                headers = list(message.get("headers", []))
                headers.append((b"x-correlation-id", encoded))
                message["headers"] = headers
            await send(message)

        await self.app(scope, receive, send_with_correlation)


class BodySizeLimitMiddleware:
    """Reject declared bodies that cannot fit in a Service Bus Standard message."""

    def __init__(self, app: ASGIApp, max_bytes: int) -> None:
        self.app = app
        self.max_bytes = max_bytes

    async def __call__(self, scope: Scope, receive: Receive, send: Send) -> None:
        if scope["type"] != "http":
            await self.app(scope, receive, send)
            return
        headers = Headers(scope=scope)
        code = content_length_status(scope["method"], headers.get("content-length"), self.max_bytes)
        if code is None:
            await self.app(scope, receive, send)
            return
        detail = "invalid content-length" if code == status.HTTP_400_BAD_REQUEST else "payload too large"
        response = JSONResponse(status_code=code, content={"detail": detail})
        await response(scope, receive, send)


def _authorize(settings: Settings, presented_key: str | None) -> None:
    expected = settings.ingestion_api_key
    if expected is None:
        return
    if presented_key is None or not secrets.compare_digest(
        presented_key.encode("utf-8"),
        expected.encode("utf-8"),
    ):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="unauthorized")


def create_app(
    settings: Settings | None = None,
    publisher: object | None = None,
) -> FastAPI:
    """Build the ASGI app. Tests inject a publisher so no broker connection is opened."""
    settings = settings or Settings()
    logger = configure_logging(settings.service_name, settings.log_level)
    if settings.environment == "production" and settings.servicebus_connection_string:
        logger.warning(
            "service bus connection string is set in production; prefer managed identity"
        )

    @asynccontextmanager
    async def lifespan(_app: FastAPI) -> AsyncIterator[None]:
        _app.state.settings = settings
        _app.state.logger = logger
        if publisher is None:
            live = AzureServiceBusPublisher(settings)
            await live.open()
            _app.state.publisher = live
            try:
                yield
            finally:
                await live.close()
        else:
            _app.state.publisher = publisher
            yield

    app = FastAPI(
        title="Ingestion API",
        version="1.0.0",
        summary="Accept records and place them on an Azure Service Bus queue.",
        lifespan=lifespan,
    )
    app.add_middleware(BodySizeLimitMiddleware, max_bytes=settings.max_body_bytes)
    app.add_middleware(CorrelationMiddleware)

    @app.get("/health", response_model=HealthResponse)
    async def health() -> HealthResponse:
        return HealthResponse(status="ok", service=settings.service_name)

    @app.get("/ready", response_model=ReadyResponse)
    async def ready(request: Request) -> ReadyResponse:
        live_publisher = request.app.state.publisher
        if not getattr(live_publisher, "is_open", False):
            raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="not ready")
        return ReadyResponse(status="ready", service=settings.service_name)

    @app.post(
        "/v1/records",
        status_code=status.HTTP_202_ACCEPTED,
        response_model=IngestionResponse,
        summary="Validate a record and enqueue it",
        description=(
            "Returns 202 after Service Bus accepts the message. "
            "Processing and storage happen asynchronously in the worker."
        ),
    )
    async def ingest(body: IngestionRequest, request: Request) -> IngestionResponse:
        _authorize(settings, request.headers.get("X-Api-Key"))
        correlation_id = request.state.correlation_id
        message = build_queue_message(
            body,
            correlation_id=correlation_id,
            now=datetime.now(timezone.utc),
        )
        try:
            await request.app.state.publisher.publish(message)
        except (ServiceBusError, AzureError, PublisherUnavailable) as exc:
            audit(
                logger,
                "enqueue_failed",
                correlation_id=correlation_id,
                message_id=message.message_id,
                source=message.source,
                event_type=message.event_type,
                error_type=type(exc).__name__,
            )
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="queue is unavailable",
            ) from None
        audit(
            logger,
            "message_enqueued",
            correlation_id=correlation_id,
            message_id=message.message_id,
            source=message.source,
            event_type=message.event_type,
        )
        return IngestionResponse(message_id=message.message_id, correlation_id=correlation_id)

    return app
