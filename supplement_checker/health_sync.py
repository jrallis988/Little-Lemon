"""
Native device health sync helpers (Apple HealthKit / Google Health Connect).

Stores non-PHI summaries only in profile history_sources. Full device payloads
should remain on-device or in private object storage if ever persisted.
"""

from __future__ import annotations

from datetime import datetime, timezone
from typing import Any

from pydantic import BaseModel, Field, field_validator

from .profile_ingestion import HistorySource, HistorySourceType


class DeviceSyncSummary(BaseModel):
    provider: HistorySourceType
    label: str | None = None
    metric_types: list[str] = Field(default_factory=list)
    sample_count: int = Field(default=0, ge=0)
    date_start: str | None = None
    date_end: str | None = None
    notes: str | None = Field(default=None, max_length=500)

    @field_validator("provider")
    @classmethod
    def require_device_provider(cls, value: HistorySourceType) -> HistorySourceType:
        allowed = {
            HistorySourceType.APPLE_HEALTHKIT,
            HistorySourceType.GOOGLE_HEALTH_CONNECT,
        }
        if value not in allowed:
            raise ValueError("provider must be apple_healthkit or google_health_connect")
        return value


def summary_text(sync: DeviceSyncSummary) -> str:
    metrics = ", ".join(sync.metric_types[:12]) or "unspecified"
    return (
        f"samples={sync.sample_count}; metrics=[{metrics}]; "
        f"range={sync.date_start or '?'}→{sync.date_end or '?'}"
        + (f"; notes={sync.notes}" if sync.notes else "")
    )


def to_history_source(sync: DeviceSyncSummary) -> HistorySource:
    return HistorySource(
        source_type=sync.provider,
        label=sync.label or sync.provider.value,
        device_sync_at=datetime.now(timezone.utc),
        text_excerpt=summary_text(sync),
    )


def parse_mobile_sync_payload(payload: dict[str, Any]) -> DeviceSyncSummary:
    """Normalize a mobile client sync acknowledgement payload."""
    return DeviceSyncSummary.model_validate(payload)
