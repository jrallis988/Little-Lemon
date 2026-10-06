"""Async Azure Service Bus publisher used by the ingestion API."""

from azure.identity.aio import DefaultAzureCredential
from azure.servicebus import ServiceBusMessage
from azure.servicebus.aio import ServiceBusClient

from app.config import Settings
from app.models import QueueMessage


class PublisherUnavailable(RuntimeError):
    """Raised when the process cannot publish because the client is closed."""


class AzureServiceBusPublisher:
    """Hold one queue sender for the life of the API process."""

    def __init__(self, settings: Settings) -> None:
        self._settings = settings
        self._client: ServiceBusClient | None = None
        self._sender = None
        self._credential: DefaultAzureCredential | None = None
        self.is_open = False

    async def open(self) -> None:
        if self._settings.servicebus_connection_string:
            self._client = ServiceBusClient.from_connection_string(
                self._settings.servicebus_connection_string
            )
        else:
            namespace = self._settings.servicebus_fully_qualified_namespace
            if namespace is None:
                raise PublisherUnavailable("service bus namespace is not configured")
            self._credential = DefaultAzureCredential()
            self._client = ServiceBusClient(
                fully_qualified_namespace=namespace,
                credential=self._credential,
            )
        self._sender = self._client.get_queue_sender(queue_name=self._settings.servicebus_queue_name)
        self.is_open = True

    async def close(self) -> None:
        if self._sender is not None:
            await self._sender.close()
            self._sender = None
        if self._client is not None:
            await self._client.close()
            self._client = None
        if self._credential is not None:
            await self._credential.close()
            self._credential = None
        self.is_open = False

    async def publish(self, message: QueueMessage) -> None:
        if self._sender is None:
            raise PublisherUnavailable("queue publisher is not open")
        outbound = ServiceBusMessage(
            message.model_dump_json(),
            message_id=message.message_id,
            correlation_id=message.correlation_id,
            content_type="application/json",
            subject=message.event_type,
            application_properties={
                "schema_version": message.schema_version,
                "source": message.source,
                "event_type": message.event_type,
                "correlation_id": message.correlation_id,
            },
        )
        await self._sender.send_messages(outbound)
