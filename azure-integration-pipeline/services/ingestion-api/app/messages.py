"""Pure helpers that build the queue message for a validated request."""

import re
import uuid
from datetime import datetime, timezone

from app.models import IngestionRequest, QueueMessage

# Stable namespace for idempotency keys. Do not change it after messages exist.
IDEMPOTENCY_NAMESPACE = uuid.UUID("c1c14f0a-6a1e-4c1a-9b3e-0e5a1a1a1a1a")
_CORRELATION = re.compile(r"^[A-Za-z0-9._:-]{1,128}$")


def new_correlation_id(requested: str | None) -> str:
    """Keep a caller correlation id when it is a short safe token."""
    if requested and _CORRELATION.fullmatch(requested):
        return requested
    return str(uuid.uuid4())


def new_message_id(request: IngestionRequest) -> str:
    """Derive a stable id when the caller supplies an idempotency key."""
    if request.external_id:
        material = f"{request.source}|{request.event_type}|{request.external_id}"
        return str(uuid.uuid5(IDEMPOTENCY_NAMESPACE, material))
    return str(uuid.uuid4())


def build_queue_message(
    request: IngestionRequest,
    *,
    correlation_id: str,
    now: datetime,
) -> QueueMessage:
    """Normalize timestamps to UTC and attach pipeline identity fields."""
    if now.tzinfo is None:
        raise ValueError("now must be timezone-aware")
    occurred = request.occurred_at.astimezone(timezone.utc) if request.occurred_at else None
    return QueueMessage(
        schema_version=1,
        message_id=new_message_id(request),
        correlation_id=correlation_id,
        received_at=now.astimezone(timezone.utc),
        source=request.source,
        event_type=request.event_type,
        external_id=request.external_id,
        occurred_at=occurred,
        payload=request.payload,
    )
