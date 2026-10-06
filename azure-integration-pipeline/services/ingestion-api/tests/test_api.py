import json
import logging
import uuid

import pytest
from azure.servicebus.exceptions import ServiceBusError
from fastapi.testclient import TestClient

from app.config import Settings
from app.factory import content_length_status, create_app
from app.models import QueueMessage
from shared.telemetry import JsonFormatter

EMULATOR = (
    "Endpoint=sb://localhost;SharedAccessKeyName=RootManageSharedAccessKey;"
    "SharedAccessKey=SAS_KEY_VALUE;UseDevelopmentEmulator=true;"
)
BODY = {
    "source": "partner-a",
    "event_type": "order.created",
    "external_id": "ord_123",
    "occurred_at": "2026-10-06T19:54:00Z",
    "payload": {"amount": 10, "currency": "USD"},
}


class FakePublisher:
    def __init__(self) -> None:
        self.messages: list[QueueMessage] = []
        self.error: Exception | None = None
        self.is_open = True

    async def publish(self, message: QueueMessage) -> None:
        if self.error is not None:
            raise self.error
        self.messages.append(message)


def build_client(
    publisher: FakePublisher,
    *,
    api_key: str | None = None,
    publisher_open: bool = True,
) -> TestClient:
    publisher.is_open = publisher_open
    settings = Settings(
        _env_file=None,
        servicebus_connection_string=EMULATOR,
        servicebus_queue_name="ingestion-queue",
        ingestion_api_key=api_key,
        environment="local",
    )
    return TestClient(create_app(settings, publisher))


@pytest.fixture
def publisher() -> FakePublisher:
    return FakePublisher()


@pytest.fixture
def client(publisher: FakePublisher) -> TestClient:
    with build_client(publisher) as test_client:
        yield test_client


def test_health_and_ready(client: TestClient) -> None:
    health = client.get("/health")
    assert health.status_code == 200
    assert health.json()["status"] == "ok"
    ready = client.get("/ready")
    assert ready.status_code == 200
    assert ready.json()["status"] == "ready"


def test_ready_reports_a_closed_publisher(publisher: FakePublisher) -> None:
    with build_client(publisher, publisher_open=False) as client:
        response = client.get("/ready")
    assert response.status_code == 503


def test_record_is_validated_and_enqueued(client: TestClient, publisher: FakePublisher) -> None:
    response = client.post("/v1/records", json=BODY, headers={"X-Correlation-ID": "trace-42"})
    assert response.status_code == 202
    body = response.json()
    assert body["status"] == "queued"
    assert body["correlation_id"] == "trace-42"
    assert response.headers["X-Correlation-ID"] == "trace-42"
    assert len(publisher.messages) == 1
    published = publisher.messages[0]
    assert published.message_id == body["message_id"]
    assert published.payload == {"amount": 10, "currency": "USD"}
    assert published.source == "partner-a"


def test_repeated_external_id_keeps_the_same_message_id(client: TestClient) -> None:
    first = client.post("/v1/records", json=BODY)
    second = client.post("/v1/records", json=BODY)
    assert first.status_code == second.status_code == 202
    assert first.json()["message_id"] == second.json()["message_id"]


def test_invalid_correlation_id_is_not_echoed(client: TestClient) -> None:
    response = client.post("/v1/records", json=BODY, headers={"X-Correlation-ID": "not valid"})
    assert response.status_code == 202
    correlation_id = response.headers["X-Correlation-ID"]
    assert correlation_id != "not valid"
    uuid.UUID(correlation_id)


def test_invalid_payload_is_rejected(client: TestClient, publisher: FakePublisher) -> None:
    response = client.post("/v1/records", json={"source": "partner-a", "payload": []})
    assert response.status_code == 422
    assert publisher.messages == []
    assert response.headers["X-Correlation-ID"]


def test_api_key_is_required_only_when_configured(publisher: FakePublisher) -> None:
    with build_client(publisher, api_key="local-dev-key") as client:
        missing = client.post("/v1/records", json=BODY)
        wrong = client.post("/v1/records", json=BODY, headers={"X-Api-Key": "nope"})
        health = client.get("/health")
        accepted = client.post("/v1/records", json=BODY, headers={"X-Api-Key": "local-dev-key"})
    assert missing.status_code == 401
    assert wrong.status_code == 401
    assert missing.json()["detail"] == "unauthorized"
    assert health.status_code == 200
    assert accepted.status_code == 202


def test_broker_failure_is_a_generic_503(client: TestClient, publisher: FakePublisher) -> None:
    publisher.error = ServiceBusError(message="SharedAccessKey=super-secret")
    response = client.post("/v1/records", json=BODY)
    assert response.status_code == 503
    assert response.json()["detail"] == "queue is unavailable"
    assert "super-secret" not in response.text
    assert "SharedAccessKey" not in response.text


def test_enqueue_audit_omits_the_payload(client: TestClient, caplog: pytest.LogCaptureFixture) -> None:
    logger = logging.getLogger("ingestion-api")
    logger.addHandler(caplog.handler)
    try:
        response = client.post("/v1/records", json=BODY, headers={"X-Correlation-ID": "trace-42"})
    finally:
        logger.removeHandler(caplog.handler)
    assert response.status_code == 202
    matches = [record for record in caplog.records if record.message == "message_enqueued"]
    assert matches
    rendered = JsonFormatter("ingestion-api").format(matches[-1])
    assert "USD" not in rendered
    assert "ord_123" not in rendered
    payload = json.loads(rendered)
    assert payload["correlation_id"] == "trace-42"
    assert payload["source"] == "partner-a"
    assert "payload" not in payload


def test_content_length_limits() -> None:
    assert content_length_status("POST", "200000", 200_000) is None
    assert content_length_status("POST", "200001", 200_000) == 413
    assert content_length_status("POST", "nope", 200_000) == 400
    assert content_length_status("GET", "999999", 200_000) is None


def test_application_import_does_not_require_a_live_broker() -> None:
    from main import app

    assert app.title == "Ingestion API"
