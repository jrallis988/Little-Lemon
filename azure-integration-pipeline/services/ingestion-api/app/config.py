"""Environment-backed settings for the ingestion API."""

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

    service_name: str = "ingestion-api"
    environment: str = "local"
    log_level: str = "INFO"
    servicebus_connection_string: str | None = None
    servicebus_fully_qualified_namespace: str | None = None
    servicebus_queue_name: str = Field(default="ingestion-queue", min_length=1, max_length=260)
    ingestion_api_key: str | None = None
    max_body_bytes: int = Field(default=200_000, gt=0, le=256_000)

    @field_validator(
        "servicebus_connection_string",
        "ingestion_api_key",
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

    @model_validator(mode="after")
    def require_service_bus_target(self) -> Self:
        if not self.servicebus_connection_string and not self.servicebus_fully_qualified_namespace:
            raise ValueError(
                "Set SERVICEBUS_CONNECTION_STRING or SERVICEBUS_FULLY_QUALIFIED_NAMESPACE"
            )
        return self
