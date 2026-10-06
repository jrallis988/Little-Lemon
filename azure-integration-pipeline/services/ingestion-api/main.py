"""ASGI entrypoint for the ingestion API."""

from app.factory import create_app

app = create_app()
