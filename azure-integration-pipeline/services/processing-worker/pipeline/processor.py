"""Validate a queue body and decide whether to complete, retry, or dead-letter it."""

from dataclasses import dataclass
from datetime import datetime, timezone
from enum import StrEnum
from typing import Protocol

from pydantic import ValidationError

from pipeline.errors import PermanentStorageError, TransientStorageError
from pipeline.models import QueueMessage, StoredRecord


class Disposition(StrEnum):
    COMPLETE = "complete"
    DEAD_LETTER = "dead_letter"
    ABANDON = "abandon"


@dataclass(frozen=True)
class Outcome:
    disposition: Disposition
    reason: str
    blob_name: str | None = None
    error_type: str | None = None


class BlobStore(Protocol):
    def write_record(self, record: StoredRecord) -> str:
        """Persist the record and return its blob name."""


def decode_message_body(body: object) -> str:
    """Decode a Service Bus body, which may be bytes or a sequence of chunks."""
    if isinstance(body, str):
        return body
    if isinstance(body, (bytes, bytearray, memoryview)):
        return bytes(body).decode("utf-8")
    if isinstance(body, (list, tuple)):
        chunks: list[bytes] = []
        for chunk in body:
            if isinstance(chunk, str):
                chunks.append(chunk.encode("utf-8"))
            else:
                chunks.append(bytes(chunk))
        return b"".join(chunks).decode("utf-8")
    raise TypeError(f"unsupported message body type: {type(body).__name__}")


def transform(message: QueueMessage, processed_at: datetime) -> StoredRecord:
    if processed_at.tzinfo is None:
        raise ValueError("processed_at must be timezone-aware")
    occurred = message.occurred_at.astimezone(timezone.utc) if message.occurred_at else None
    return StoredRecord(
        schema_version=1,
        message_id=message.message_id,
        correlation_id=message.correlation_id,
        source=message.source,
        event_type=message.event_type,
        external_id=message.external_id,
        occurred_at=occurred,
        received_at=message.received_at.astimezone(timezone.utc),
        processed_at=processed_at.astimezone(timezone.utc),
        payload=message.payload,
    )


def process_payload(raw: str, storage: BlobStore, *, now: datetime) -> Outcome:
    """Turn one queue body into a disposition. Storage errors are not logged here."""
    try:
        message = QueueMessage.model_validate_json(raw)
    except (ValidationError, ValueError):
        return Outcome(Disposition.DEAD_LETTER, "invalid_message")
    try:
        record = transform(message, now)
        blob_name = storage.write_record(record)
    except PermanentStorageError as exc:
        cause = exc.__cause__ or exc
        return Outcome(Disposition.DEAD_LETTER, "storage_rejected", error_type=type(cause).__name__)
    except TransientStorageError as exc:
        cause = exc.__cause__ or exc
        return Outcome(Disposition.ABANDON, "storage_unavailable", error_type=type(cause).__name__)
    except Exception as exc:
        return Outcome(Disposition.ABANDON, "processing_error", error_type=type(exc).__name__)
    return Outcome(Disposition.COMPLETE, "stored", blob_name=blob_name)
