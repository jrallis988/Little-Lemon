"""Long-running receive loop. Signal handlers stop the loop between messages."""

from __future__ import annotations

import logging
import signal
from datetime import datetime, timezone
from typing import Any

from azure.identity import DefaultAzureCredential
from azure.servicebus import ServiceBusClient

from pipeline.config import Settings
from pipeline.errors import PermanentStorageError, TransientStorageError
from pipeline.processor import Disposition, Outcome, decode_message_body, process_payload
from pipeline.storage import AzureBlobStore
from shared.telemetry import audit, configure_logging


def apply_outcome(receiver: Any, message: Any, outcome: Outcome) -> None:
    if outcome.disposition is Disposition.COMPLETE:
        receiver.complete_message(message)
        return
    if outcome.disposition is Disposition.DEAD_LETTER:
        receiver.dead_letter_message(
            message,
            reason=outcome.reason,
            error_description=outcome.reason,
        )
        return
    receiver.abandon_message(message)


def handle_delivery(
    message: Any,
    receiver: Any,
    storage: Any,
    logger: logging.Logger,
    *,
    now: datetime,
) -> Outcome:
    broker_message_id = getattr(message, "message_id", None)
    delivery_count = getattr(message, "delivery_count", None)
    try:
        raw = decode_message_body(message.body)
    except (UnicodeDecodeError, TypeError) as exc:
        outcome = Outcome(Disposition.DEAD_LETTER, "undecodable_body", error_type=type(exc).__name__)
        apply_outcome(receiver, message, outcome)
        audit(
            logger,
            "message_dead_lettered",
            broker_message_id=broker_message_id,
            delivery_count=delivery_count,
            reason=outcome.reason,
            error_type=outcome.error_type,
        )
        return outcome

    outcome = process_payload(raw, storage, now=now)
    apply_outcome(receiver, message, outcome)
    event = {
        Disposition.COMPLETE: "message_completed",
        Disposition.DEAD_LETTER: "message_dead_lettered",
        Disposition.ABANDON: "message_abandoned",
    }[outcome.disposition]
    audit(
        logger,
        event,
        broker_message_id=broker_message_id,
        delivery_count=delivery_count,
        reason=outcome.reason,
        blob_name=outcome.blob_name,
        error_type=outcome.error_type,
    )
    return outcome


def build_servicebus_client(
    settings: Settings,
) -> tuple[ServiceBusClient, DefaultAzureCredential | None]:
    if settings.servicebus_connection_string:
        return ServiceBusClient.from_connection_string(settings.servicebus_connection_string), None
    namespace = settings.servicebus_fully_qualified_namespace
    if namespace is None:
        raise RuntimeError("service bus namespace is not configured")
    credential = DefaultAzureCredential()
    client = ServiceBusClient(fully_qualified_namespace=namespace, credential=credential)
    return client, credential


def consume(client: ServiceBusClient, storage: Any, settings: Settings, logger: logging.Logger) -> None:
    """Pull messages until SIGINT or SIGTERM. In-flight work finishes first."""
    stop = {"value": False}

    def request_stop(signum: int, _frame: object) -> None:
        stop["value"] = True
        audit(logger, "shutdown_requested", signal=signum)

    signal.signal(signal.SIGTERM, request_stop)
    signal.signal(signal.SIGINT, request_stop)

    with client.get_queue_receiver(
        queue_name=settings.servicebus_queue_name,
        prefetch_count=settings.prefetch_count,
        max_wait_time=settings.receive_wait_seconds,
    ) as receiver:
        while not stop["value"]:
            messages = receiver.receive_messages(
                max_message_count=settings.batch_size,
                max_wait_time=settings.receive_wait_seconds,
            )
            if stop["value"]:
                for message in messages:
                    receiver.abandon_message(message)
                break
            for message in messages:
                handle_delivery(
                    message,
                    receiver,
                    storage,
                    logger,
                    now=datetime.now(timezone.utc),
                )
                if stop["value"]:
                    break


def run() -> None:
    settings = Settings()
    logger = configure_logging(settings.service_name, settings.log_level)
    if settings.environment == "production" and (
        settings.servicebus_connection_string or settings.storage_connection_string
    ):
        logger.warning("connection string is set in production; prefer managed identity")

    store = AzureBlobStore(settings)
    client: ServiceBusClient | None = None
    credential: DefaultAzureCredential | None = None
    try:
        store.ensure_container()
        client, credential = build_servicebus_client(settings)
        audit(
            logger,
            "worker_started",
            queue=settings.servicebus_queue_name,
            container=settings.storage_container,
        )
        consume(client, store, settings, logger)
        audit(logger, "worker_stopped", queue=settings.servicebus_queue_name)
    except (PermanentStorageError, TransientStorageError) as exc:
        audit(logger, "worker_failed", reason=str(exc), error_type=type(exc).__name__)
        raise SystemExit(1) from None
    finally:
        store.close()
        if client is not None:
            client.close()
        if credential is not None:
            credential.close()
