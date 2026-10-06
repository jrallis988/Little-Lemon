import json
import logging
import sys

from shared.telemetry import JsonFormatter, audit


def test_formatter_is_one_json_line_and_redacts_secrets() -> None:
    formatter = JsonFormatter("ingestion-api")
    try:
        raise RuntimeError(
            "Endpoint=sb://localhost;SharedAccessKey=super-secret;UseDevelopmentEmulator=true;"
        )
    except RuntimeError:
        record = logging.LogRecord(
            name="ingestion-api",
            level=logging.ERROR,
            pathname=__file__,
            lineno=1,
            msg="enqueue_failed",
            args=(),
            exc_info=sys.exc_info(),
        )
    record.audit = {"event": "enqueue_failed", "api_key": "local-dev-key", "correlation_id": "trace-42"}
    rendered = formatter.format(record)
    assert "\n" not in rendered
    assert "super-secret" not in rendered
    assert "local-dev-key" not in rendered
    payload = json.loads(rendered)
    assert payload["event"] == "enqueue_failed"
    assert payload["correlation_id"] == "trace-42"
    assert payload["api_key"] == "[redacted]"
    assert payload["error_type"] == "RuntimeError"
    assert "SharedAccessKey=[redacted]" in payload["exception"]


def test_audit_helper_sets_the_event_name(caplog) -> None:
    logger = logging.getLogger("telemetry-test")
    logger.setLevel(logging.INFO)
    logger.addHandler(caplog.handler)
    audit(logger, "message_enqueued", correlation_id="trace-42", source="partner-a")
    record = caplog.records[-1]
    assert record.message == "message_enqueued"
    assert record.audit["source"] == "partner-a"
