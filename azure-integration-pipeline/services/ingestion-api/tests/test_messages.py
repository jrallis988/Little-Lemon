import json
import uuid
from datetime import datetime, timedelta, timezone
from pathlib import Path

import pytest
from pydantic import ValidationError

from app.config import Settings
from app.messages import build_queue_message, new_correlation_id, new_message_id
from app.models import IngestionRequest, QueueMessage

CONTRACT_PATH = Path(__file__).resolve().parents[3] / "contracts" / "example-message.json"

NOW = datetime(2026, 10, 6, 19, 55, tzinfo=timezone.utc)


def test_contract_example_round_trips() -> None:
    message = QueueMessage.model_validate_json(CONTRACT_PATH.read_text(encoding="utf-8"))
    assert message.source == "partner-a"
    assert message.event_type == "order.created"
    again = QueueMessage.model_validate_json(message.model_dump_json())
    assert again == message


def test_external_id_is_a_stable_idempotency_key() -> None:
    request = IngestionRequest(
        source="partner-a",
        event_type="order.created",
        external_id="ord_123",
        payload={"amount": 10},
    )
    first = build_queue_message(request, correlation_id="corr-1", now=NOW)
    second = build_queue_message(request, correlation_id="corr-2", now=NOW)
    assert first.message_id == second.message_id
    assert first.correlation_id != second.correlation_id


def test_same_external_id_with_a_different_event_is_a_different_message() -> None:
    created = IngestionRequest(source="partner-a", event_type="order.created", external_id="ord_123")
    cancelled = IngestionRequest(
        source="partner-a",
        event_type="order.cancelled",
        external_id="ord_123",
    )
    assert new_message_id(created) != new_message_id(cancelled)


def test_missing_external_id_generates_unique_message_ids() -> None:
    request = IngestionRequest(source="partner-a", event_type="order.created")
    assert new_message_id(request) != new_message_id(request)


def test_occurred_at_is_normalized_to_utc() -> None:
    local = timezone(timedelta(hours=-4))
    request = IngestionRequest(
        source="partner-a",
        event_type="order.created",
        occurred_at=datetime(2026, 10, 6, 15, 54, tzinfo=local),
    )
    message = build_queue_message(request, correlation_id="corr", now=NOW)
    assert message.occurred_at == datetime(2026, 10, 6, 19, 54, tzinfo=timezone.utc)


def test_naive_datetime_is_rejected() -> None:
    with pytest.raises(ValidationError):
        IngestionRequest(
            source="partner-a",
            event_type="order.created",
            occurred_at=datetime(2026, 10, 6, 19, 54),
        )


def test_extra_and_empty_fields_are_rejected() -> None:
    with pytest.raises(ValidationError):
        IngestionRequest(source="partner-a", event_type="order.created", unexpected=True)
    with pytest.raises(ValidationError):
        IngestionRequest(source="", event_type="order.created")


def test_payload_over_the_queue_budget_is_rejected() -> None:
    with pytest.raises(ValidationError):
        IngestionRequest(source="partner-a", event_type="order.created", payload={"blob": "x" * 180_001})


def test_invalid_correlation_id_is_replaced() -> None:
    generated = new_correlation_id("not valid")
    uuid.UUID(generated)
    assert new_correlation_id("trace-42") == "trace-42"


def test_namespace_prefix_is_stripped_and_a_target_is_required(monkeypatch: pytest.MonkeyPatch) -> None:
    settings = Settings(
        _env_file=None,
        servicebus_connection_string=None,
        servicebus_fully_qualified_namespace="sb://example.servicebus.windows.net/",
    )
    assert settings.servicebus_fully_qualified_namespace == "example.servicebus.windows.net"

    monkeypatch.delenv("SERVICEBUS_CONNECTION_STRING", raising=False)
    monkeypatch.delenv("SERVICEBUS_FULLY_QUALIFIED_NAMESPACE", raising=False)
    with pytest.raises(ValidationError):
        Settings(_env_file=None, servicebus_connection_string="  ", servicebus_fully_qualified_namespace=None)


def test_queue_message_json_has_no_extra_keys() -> None:
    request = IngestionRequest(source="partner-a", event_type="order.created", payload={"currency": "USD"})
    body = json.loads(build_queue_message(request, correlation_id="corr", now=NOW).model_dump_json())
    assert body["schema_version"] == 1
    assert body["payload"] == {"currency": "USD"}
