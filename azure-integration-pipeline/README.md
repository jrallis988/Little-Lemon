# Azure integration pipeline

A small, decoupled pipeline for incoming records and webhook payloads.

1. The **ingestion API** validates a JSON body with Pydantic and publishes it to an Azure Service Bus queue.
2. The **processing worker** pulls messages, validates them again, and writes one JSON document per record to blob storage.
3. Both services write **structured JSON logs** to stdout so every hop can be traced with a correlation id.

`202 Accepted` means the broker took the message. The worker stores the record afterward.

## Layout

```
azure-integration-pipeline/
├── .cursorrules
├── docker-compose.yml
├── contracts/example-message.json
├── infra/
│   ├── main.bicep
│   ├── parameters.json
│   └── servicebus-emulator/Config.json
├── shared/telemetry.py
└── services/
    ├── ingestion-api/
    └── processing-worker/
```

## Message contract

`POST /v1/records` accepts:

```json
{
  "source": "partner-a",
  "event_type": "order.created",
  "external_id": "ord_123",
  "occurred_at": "2026-10-06T19:54:00Z",
  "payload": {"amount": 10, "currency": "USD"}
}
```

`source`, `event_type`, and `external_id` are short tokens (`partner-a`, `order.created`). `occurred_at` must include a timezone. `payload` is a JSON object capped at 180 KB so the queue message stays under the Service Bus Standard 256 KB limit.

When `external_id` is present, the message id is a stable UUID derived from `source`, `event_type`, and `external_id`. Retries inside the queue's 10-minute duplicate-detection window collapse to one message, and the worker overwrites `YYYY/MM/DD/{message_id}.json`. Omit `external_id` when every call is a new record.

The queued document is version 1 of `contracts/example-message.json`. The stored blob adds `processed_at`.

## Configure

| Variable | Purpose |
| --- | --- |
| `SERVICEBUS_CONNECTION_STRING` | Local emulator only. In Azure, leave this unset. |
| `SERVICEBUS_FULLY_QUALIFIED_NAMESPACE` | `name.servicebus.windows.net`, used with managed identity. |
| `SERVICEBUS_QUEUE_NAME` | Defaults to `ingestion-queue`. |
| `STORAGE_CONNECTION_STRING` | Azurite only. In Azure, leave this unset. |
| `STORAGE_ACCOUNT_URL` | `https://account.blob.core.windows.net`. |
| `STORAGE_CONTAINER` | Defaults to `processed-records`. |
| `INGESTION_API_KEY` | When set, `POST /v1/records` requires `X-Api-Key`. |
| `AZURE_CLIENT_ID` | User-assigned identity client id for `DefaultAzureCredential`. |
| `ENVIRONMENT` | `production` logs a warning if a connection string is still set. |

A connection string wins over the Azure hostname so a local `.env` cannot accidentally target a real namespace.

## Test

```bash
cd azure-integration-pipeline
python3 -m venv .venv
. .venv/bin/activate
pip install -r services/ingestion-api/requirements.txt \
  -r services/ingestion-api/requirements-dev.txt \
  -r services/processing-worker/requirements.txt \
  -r services/processing-worker/requirements-dev.txt
pytest
```

Tests use fakes. They do not call Azure or start the emulator.

## Run locally

Docker Compose starts SQL Server (the emulator's dependency), the Service Bus emulator, Azurite, the API, and the worker. Copy the example environment first:

```bash
cp .env.example .env
docker compose up --build
```

`ACCEPT_EULA=Y` in `.env` accepts the [Service Bus emulator license](https://github.com/Azure/azure-service-bus-emulator-installer/blob/main/EMULATOR_EULA.txt) and the [SQL Server Linux license](https://go.microsoft.com/fwlink/?LinkId=746388). The emulator's namespace name is fixed as `sbemulatorns`. Its health endpoint is `http://localhost:5300/health`.

The queue in `.env.example` is reached at `servicebus-emulator` from other containers. The emulator's shared access key is the documented local constant `SAS_KEY_VALUE`, and Azurite uses its well-known development account.

```bash
curl -sS -D - http://localhost:8000/v1/records \
  -H 'content-type: application/json' \
  -H 'X-Api-Key: local-dev-key' \
  -H 'X-Correlation-ID: trace-42' \
  -d '{"source":"partner-a","event_type":"order.created","external_id":"ord_123","occurred_at":"2026-10-06T19:54:00Z","payload":{"amount":10,"currency":"USD"}}'
```

Liveness is `GET /health`. Readiness is `GET /ready`, which checks that the publisher is open. Invalid messages are dead-lettered. Storage timeouts are abandoned until the queue's delivery count is exhausted.

To run a service on the host against the published ports, point Service Bus at `localhost` and Azurite at `http://127.0.0.1:10000/devstoreaccount1`, then start uvicorn from `services/ingestion-api` or `python worker.py` from `services/processing-worker`.

## Deploy to Azure

`infra/main.bicep` creates a Log Analytics workspace, Application Insights, a Service Bus namespace with local authentication disabled, the `ingestion-queue` (duplicate detection, dead-lettering, 10 deliveries), a storage account with shared keys disabled and a private container, and two user-assigned identities:

- ingestion identity: Service Bus Data Sender
- worker identity: Service Bus Data Receiver and Storage Blob Data Contributor

The deployment identity needs permission to create role assignments.

```bash
az group create --name rg-integration-dev --location eastus
az deployment group create \
  --resource-group rg-integration-dev \
  --template-file infra/main.bicep \
  --parameters infra/parameters.json
```

Attach each identity to its compute, set `AZURE_CLIENT_ID` to that identity's client id, and set `SERVICEBUS_FULLY_QUALIFIED_NAMESPACE` and `STORAGE_ACCOUNT_URL` from the deployment outputs. Do not set connection strings in Azure. Ship stdout logs to the Log Analytics workspace; Service Bus operational logs are already diagnostic settings on the namespace.
