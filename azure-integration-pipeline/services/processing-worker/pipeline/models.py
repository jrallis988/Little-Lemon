"""Queue and stored-record contracts for the processing worker."""

import json
from datetime import datetime
from typing import Any, Literal, Self

from pydantic import BaseModel, ConfigDict, Field, field_validator, model_validator

MAX_PAYLOAD_BYTES = 180_000
_TOKEN = r"^[A-Za-z0-9][A-Za-z0-9._:-]{0,127}$"
_ID = r"^[A-Za-z0-9._:-]{1,128}$"


def _require_timezone(value: datetime | None) -> datetime | None:
    if value is not None and value.tzinfo is None:
        raise ValueError("datetime must include a timezone")
    return value


class QueueMessage(BaseModel):
    """Version 1 body published by the ingestion API."""

    model_config = ConfigDict(extra="forbid")

    schema_version: Literal[1]
    message_id: str = Field(pattern=_ID)
    correlation_id: str = Field(pattern=_ID)
    received_at: datetime
    source: str = Field(pattern=_TOKEN)
    event_type: str = Field(pattern=_TOKEN)
    external_id: str | None = Field(default=None, pattern=_TOKEN)
    occurred_at: datetime | None = None
    payload: dict[str, Any]

    @field_validator("message_id")
    @classmethod
    def message_id_is_a_safe_blob_segment(cls, value: str) -> str:
        if value in {".", ".."} or ".." in value:
            raise ValueError("message_id is not a safe blob name")
        return value

    @field_validator("received_at", "occurred_at")
    @classmethod
    def datetimes_must_be_aware(cls, value: datetime | None) -> datetime | None:
        return _require_timezone(value)

    @model_validator(mode="after")
    def payload_must_fit(self) -> Self:
        encoded = json.dumps(self.payload, separators=(",", ":")).encode("utf-8")
        if len(encoded) > MAX_PAYLOAD_BYTES:
            raise ValueError(f"payload exceeds {MAX_PAYLOAD_BYTES} bytes")
        return self


class StoredRecord(BaseModel):
    """Document written to blob storage after a message is accepted."""

    model_config = ConfigDict(extra="forbid")

    schema_version: Literal[1] = 1
    message_id: str
    correlation_id: str
    source: str
    event_type: str
    external_id: str | None = None
    occurred_at: datetime | None = None
    received_at: datetime
    processed_at: datetime
    payload: dict[str, Any]
