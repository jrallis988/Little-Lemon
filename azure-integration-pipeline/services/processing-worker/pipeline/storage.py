"""Blob storage writer. Connection strings are for Azurite; Azure uses identity."""

from datetime import datetime, timezone

from azure.core.exceptions import (
    ClientAuthenticationError,
    HttpResponseError,
    ResourceExistsError,
    ServiceRequestError,
)
from azure.identity import DefaultAzureCredential
from azure.storage.blob import BlobServiceClient, ContentSettings

from pipeline.config import Settings
from pipeline.errors import PermanentStorageError, TransientStorageError
from pipeline.models import StoredRecord

_TRANSIENT_STATUS = {408, 429, 500, 502, 503, 504}


def blob_name_for(message_id: str, processed_at: datetime) -> str:
    """Return a date-partitioned blob name. message_id is already constrained."""
    stamp = processed_at.astimezone(timezone.utc)
    return f"{stamp:%Y/%m/%d}/{message_id}.json"


class AzureBlobStore:
    """Write one JSON document per processed message."""

    def __init__(self, settings: Settings) -> None:
        self._container_name = settings.storage_container
        self._credential: DefaultAzureCredential | None = None
        if settings.storage_connection_string:
            self._service = BlobServiceClient.from_connection_string(
                settings.storage_connection_string
            )
        else:
            account_url = settings.storage_account_url
            if account_url is None:
                raise PermanentStorageError("storage account url is not configured")
            self._credential = DefaultAzureCredential()
            self._service = BlobServiceClient(account_url=account_url, credential=self._credential)

    def close(self) -> None:
        self._service.close()
        if self._credential is not None:
            self._credential.close()

    def ensure_container(self) -> None:
        try:
            self._service.create_container(self._container_name)
        except ResourceExistsError:
            return
        except ClientAuthenticationError as exc:
            raise PermanentStorageError("storage authentication failed") from exc
        except ServiceRequestError as exc:
            raise TransientStorageError("storage is unreachable") from exc
        except HttpResponseError as exc:
            self._raise_http(exc)

    def write_record(self, record: StoredRecord) -> str:
        blob_name = blob_name_for(record.message_id, record.processed_at)
        blob = self._service.get_blob_client(container=self._container_name, blob=blob_name)
        try:
            blob.upload_blob(
                record.model_dump_json().encode("utf-8"),
                overwrite=True,
                content_settings=ContentSettings(content_type="application/json"),
                metadata={
                    "source": record.source,
                    "event_type": record.event_type,
                    "correlation_id": record.correlation_id,
                    "message_id": record.message_id,
                },
            )
        except ClientAuthenticationError as exc:
            raise PermanentStorageError("storage authentication failed") from exc
        except ServiceRequestError as exc:
            raise TransientStorageError("storage is unreachable") from exc
        except HttpResponseError as exc:
            self._raise_http(exc)
        return blob_name

    @staticmethod
    def _raise_http(exc: HttpResponseError) -> None:
        if exc.status_code in {401, 403, 404}:
            raise PermanentStorageError("storage rejected the write") from exc
        if exc.status_code in _TRANSIENT_STATUS or exc.status_code is None:
            raise TransientStorageError("storage is unavailable") from exc
        raise TransientStorageError("storage write failed") from exc
