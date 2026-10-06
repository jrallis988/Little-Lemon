"""Request and queue-message contracts for the ingestion API."""

import json
from datetime import datetime
from typing import Any, Literal, Self

from pydantic import BaseModel, ConfigDict, Field, field_validator, model_validator

MAX_PAYLOAD_BYTES = 180_000
_TOKEN = r"^[A-Za-z0-9][A-Za-z0-9._:-]{0,127}$"


def _require_timezone(value: datetime | None) -> datetime | None:
    if value is not None and value.tzinfo is None:
        raise ValueError("datetime must include a timezone")
    return value


class IngestionRequest(BaseModel):
    """JSON body accepted from callers and webhooks."""

    model_config = ConfigDict(extra="forbid", str_strip_whitespace=True)

    source: str = Field(pattern=_TOKEN)
    event_type: str = Field(pattern=_TOKEN)
    external_id: str | None = Field(default=None, pattern=_TOKEN)
    occurred_at: datetime | None = None
    payload: dict[str, Any] = Field(default_factory=dict)

    @field_validator("occurred_at")
    @classmethod
    def occurred_at_must_be_aware(cls, value: datetime | None) -> datetime | None:
        return _require_timezone(value)

    @model_validator(mode="after")
    def payload_must_fit_in_a_queue_message(self) -> Self:
        encoded = json.dumps(self.payload, separators=(",", ":")).encode("utf-8")
        if len(encoded) > MAX_PAYLOAD_BYTES:
            raise ValueError(f"payload exceeds {MAX_PAYLOAD_BYTES} bytes")
        return self


class QueueMessage(BaseModel):
    """Body published to the ingestion queue. Version 1 of the pipeline contract."""

    model_config = ConfigDict(extra="forbid")

    schema_version: Literal[1] = 1
    message_id: str = Field(min_length=1, max_length=128)
    correlation_id: str = Field(min_length=1, max_length=128)
    received_at: datetime
    source: str
    event_type: str
    external_id: str | None = None
    occurred_at: datetime | None = None
    payload: dict[str, Any]


class IngestionResponse(BaseModel):
    message_id: str
    correlation_id: str
    status: Literal["queued"] = "queued"


class HealthResponse(BaseModel):
    status: Literal["ok"]
    service: str


class ReadyResponse(BaseModel):
    status: Literal["ready"]
    service: str
