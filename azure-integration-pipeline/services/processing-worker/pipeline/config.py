"""Environment-backed settings for the processing worker."""

from typing import Self

from pydantic import Field, field_validator, model_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Runtime configuration. Connection strings are for local emulators only."""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    service_name: str = "processing-worker"
    environment: str = "local"
    log_level: str = "INFO"
    servicebus_connection_string: str | None = None
    servicebus_fully_qualified_namespace: str | None = None
    servicebus_queue_name: str = Field(default="ingestion-queue", min_length=1, max_length=260)
    storage_connection_string: str | None = None
    storage_account_url: str | None = None
    storage_container: str = Field(default="processed-records", min_length=3, max_length=63)
    prefetch_count: int = Field(default=10, ge=0, le=100)
    batch_size: int = Field(default=10, ge=1, le=100)
    receive_wait_seconds: int = Field(default=5, ge=1, le=60)

    @field_validator(
        "servicebus_connection_string",
        "storage_connection_string",
        mode="before",
    )
    @classmethod
    def blank_to_none(cls, value: object) -> object:
        if isinstance(value, str) and value.strip() == "":
            return None
        return value

    @field_validator("servicebus_fully_qualified_namespace", mode="before")
    @classmethod
    def normalize_namespace(cls, value: object) -> object:
        if not isinstance(value, str):
            return value
        cleaned = value.strip().removeprefix("sb://").strip("/")
        return cleaned or None

    @field_validator("storage_account_url", mode="before")
    @classmethod
    def normalize_account_url(cls, value: object) -> object:
        if not isinstance(value, str):
            return value
        cleaned = value.strip().rstrip("/")
        return cleaned or None

    @model_validator(mode="after")
    def require_targets(self) -> Self:
        if not self.servicebus_connection_string and not self.servicebus_fully_qualified_namespace:
            raise ValueError(
                "Set SERVICEBUS_CONNECTION_STRING or SERVICEBUS_FULLY_QUALIFIED_NAMESPACE"
            )
        if not self.storage_connection_string and not self.storage_account_url:
            raise ValueError("Set STORAGE_CONNECTION_STRING or STORAGE_ACCOUNT_URL")
        if self.storage_account_url and not self.storage_account_url.startswith("https://"):
            raise ValueError("STORAGE_ACCOUNT_URL must use https")
        return self
