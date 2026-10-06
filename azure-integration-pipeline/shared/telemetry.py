"""JSON stdout logs shared by the ingestion API and the processing worker."""

from __future__ import annotations

import json
import logging
import re
import sys
from datetime import datetime, timezone
from typing import Any

_SECRET_KEY_PARTS = (
    "password",
    "secret",
    "token",
    "credential",
    "connection_string",
    "api_key",
    "sharedaccesskey",
    "accountkey",
)
_SECRET_VALUE = re.compile(
    r"(SharedAccessKey=|AccountKey=|sig=)[^;\s&\"']+",
    re.IGNORECASE,
)
_RESERVED = {"timestamp", "level", "service", "message", "logger", "exception", "error_type"}


def _redact_text(text: str) -> str:
    return _SECRET_VALUE.sub(lambda match: f"{match.group(1)}[redacted]", text)


def _sanitize(key: str, value: Any) -> Any:
    lowered = key.lower()
    if any(part in lowered for part in _SECRET_KEY_PARTS):
        return "[redacted]"
    if isinstance(value, str):
        return _redact_text(value)
    return value


class JsonFormatter(logging.Formatter):
    """Format one log record as a single-line JSON object."""

    def __init__(self, service: str) -> None:
        super().__init__()
        self.service = service

    def format(self, record: logging.LogRecord) -> str:
        payload: dict[str, Any] = {
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "level": record.levelname,
            "service": self.service,
            "logger": record.name,
            "message": record.getMessage(),
            "event": record.getMessage(),
        }
        audit = getattr(record, "audit", None)
        if isinstance(audit, dict):
            for key, value in audit.items():
                if key not in _RESERVED:
                    payload[key] = _sanitize(str(key), value)
        if record.exc_info and record.exc_info[0] is not None:
            payload["error_type"] = record.exc_info[0].__name__
            payload["exception"] = _redact_text(self.formatException(record.exc_info))
        return json.dumps(payload, default=str, separators=(",", ":"))


def configure_logging(service: str, level: str) -> logging.Logger:
    """Attach a JSON handler to the named service logger."""
    logger = logging.getLogger(service)
    logger.handlers.clear()
    logger.setLevel(level.upper())
    handler = logging.StreamHandler(sys.stdout)
    handler.setFormatter(JsonFormatter(service))
    logger.addHandler(handler)
    logger.propagate = False
    return logger


def audit(logger: logging.Logger, event: str, **fields: Any) -> None:
    """Write one structured audit event. Do not pass payloads or secrets."""
    logger.info(event, extra={"audit": {"event": event, **fields}})
