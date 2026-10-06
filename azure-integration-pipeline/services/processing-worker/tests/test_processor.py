import logging
from datetime import datetime, timedelta, timezone
from pathlib import Path

import pytest
from pydantic import ValidationError

from pipeline.config import Settings
from pipeline.errors import PermanentStorageError, TransientStorageError
from pipeline.models import QueueMessage, StoredRecord
from pipeline.processor import Disposition, decode_message_body, process_payload
from pipeline.runner import handle_delivery
from pipeline.storage import blob_name_for

CONTRACT_PATH = Path(__file__).resolve().parents[3] / "contracts" / "example-message.json"

NOW = datetime(2026, 10, 6, 20, 0, tzinfo=timezone.utc)


class MemoryBlobStore:
    def __init__(self, error: Exception | None = None) -> None:
        self.error = error
        self.records: dict[str, StoredRecord] = {}

    def write_record(self, record: StoredRecord) -> str:
        if self.error is not None:
            raise self.error
        name = blob_name_for(record.message_id, record.processed_at)
        self.records[name] = record
        return name


class FakeReceiver:
    def __init__(self) -> None:
        self.completed: list[object] = []
        self.dead_lettered: list[tuple[object, str]] = []
        self.abandoned: list[object] = []

    def complete_message(self, message: object) -> None:
        self.completed.append(message)

    def dead_letter_message(self, message: object, *, reason: str, error_description: str) -> None:
        self.dead_lettered.append((message, reason))
        assert error_description == reason

    def abandon_message(self, message: object) -> None:
        self.abandoned.append(message)


class FakeMessage:
    def __init__(self, body: object, message_id: str = "broker-id", delivery_count: int = 1) -> None:
        self.body = body
        self.message_id = message_id
        self.delivery_count = delivery_count


def contract_text() -> str:
    return CONTRACT_PATH.read_text(encoding="utf-8")


def test_contract_example_round_trips() -> None:
    message = QueueMessage.model_validate_json(contract_text())
    assert message.external_id == "ord_123"
    assert QueueMessage.model_validate_json(message.model_dump_json()) == message


def test_valid_message_is_stored_and_completed() -> None:
    store = MemoryBlobStore()
    outcome = process_payload(contract_text(), store, now=NOW)
    assert outcome.disposition is Disposition.COMPLETE
    assert outcome.blob_name == "2026/10/06/11111111-1111-4111-8111-111111111111.json"
    stored = store.records[outcome.blob_name]
    assert stored.payload == {"amount": 10, "currency": "USD"}
    assert stored.processed_at == NOW
    assert stored.received_at == datetime(2026, 10, 6, 19, 55, tzinfo=timezone.utc)


def test_occurred_at_is_converted_to_utc() -> None:
    message = QueueMessage.model_validate_json(contract_text())
    local = timezone(timedelta(hours=-4))
    shifted = message.model_copy(update={"occurred_at": datetime(2026, 10, 6, 15, 54, tzinfo=local)})
    store = MemoryBlobStore()
    outcome = process_payload(shifted.model_dump_json(), store, now=NOW)
    stored = store.records[outcome.blob_name or ""]
    assert stored.occurred_at == datetime(2026, 10, 6, 19, 54, tzinfo=timezone.utc)


def test_invalid_json_and_unsafe_ids_are_dead_lettered() -> None:
    store = MemoryBlobStore()
    invalid = process_payload("{", store, now=NOW)
    assert invalid.disposition is Disposition.DEAD_LETTER
    assert invalid.reason == "invalid_message"
    assert store.records == {}

    message = QueueMessage.model_validate_json(contract_text()).model_copy(update={"message_id": ".."})
    with pytest.raises(ValidationError):
        QueueMessage.model_validate(message.model_dump())
    unsafe = process_payload(
        contract_text().replace("11111111-1111-4111-8111-111111111111", ".."),
        store,
        now=NOW,
    )
    assert unsafe.disposition is Disposition.DEAD_LETTER


def test_storage_errors_choose_retry_or_dead_letter() -> None:
    transient = process_payload(
        contract_text(),
        MemoryBlobStore(error=TransientStorageError("try again")),
        now=NOW,
    )
    permanent = process_payload(
        contract_text(),
        MemoryBlobStore(error=PermanentStorageError("storage rejected the write")),
        now=NOW,
    )
    assert transient.disposition is Disposition.ABANDON
    assert transient.reason == "storage_unavailable"
    assert permanent.disposition is Disposition.DEAD_LETTER
    assert permanent.reason == "storage_rejected"


def test_chunked_body_is_completed_and_bad_bytes_are_dead_lettered() -> None:
    raw = contract_text().encode("utf-8")
    receiver = FakeReceiver()
    store = MemoryBlobStore()
    logger = logging.getLogger("processing-worker-test")
    message = FakeMessage([raw[:12], raw[12:]])
    outcome = handle_delivery(message, receiver, store, logger, now=NOW)
    assert outcome.disposition is Disposition.COMPLETE
    assert receiver.completed == [message]

    bad = FakeMessage(b"\xff")
    bad_outcome = handle_delivery(bad, receiver, store, logger, now=NOW)
    assert bad_outcome.disposition is Disposition.DEAD_LETTER
    assert bad_outcome.reason == "undecodable_body"
    assert receiver.dead_lettered[-1][1] == "undecodable_body"


def test_decode_rejects_unsupported_bodies() -> None:
    with pytest.raises(TypeError):
        decode_message_body(123)


def test_settings_require_https_storage_and_a_broker(monkeypatch: pytest.MonkeyPatch) -> None:
    settings = Settings(
        _env_file=None,
        servicebus_fully_qualified_namespace="sb://example.servicebus.windows.net/",
        storage_account_url="https://example.blob.core.windows.net/",
    )
    assert settings.servicebus_fully_qualified_namespace == "example.servicebus.windows.net"
    assert settings.storage_account_url == "https://example.blob.core.windows.net"

    monkeypatch.delenv("SERVICEBUS_CONNECTION_STRING", raising=False)
    monkeypatch.delenv("SERVICEBUS_FULLY_QUALIFIED_NAMESPACE", raising=False)
    monkeypatch.delenv("STORAGE_CONNECTION_STRING", raising=False)
    monkeypatch.delenv("STORAGE_ACCOUNT_URL", raising=False)
    with pytest.raises(ValidationError):
        Settings(
            _env_file=None,
            servicebus_connection_string=(
                "Endpoint=sb://localhost;SharedAccessKeyName=RootManageSharedAccessKey;"
                "SharedAccessKey=SAS_KEY_VALUE;UseDevelopmentEmulator=true;"
            ),
            storage_connection_string=None,
            storage_account_url="http://azurite:10000/devstoreaccount1",
        )
