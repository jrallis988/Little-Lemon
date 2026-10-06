"""Make the service and shared packages importable, and provide a local broker setting."""

import os
import sys
from pathlib import Path

SERVICE_ROOT = Path(__file__).resolve().parents[1]
PIPELINE_ROOT = Path(__file__).resolve().parents[3]
sys.path.insert(0, str(PIPELINE_ROOT))
sys.path.insert(0, str(SERVICE_ROOT))

os.environ.setdefault(
    "SERVICEBUS_CONNECTION_STRING",
    "Endpoint=sb://localhost;SharedAccessKeyName=RootManageSharedAccessKey;"
    "SharedAccessKey=SAS_KEY_VALUE;UseDevelopmentEmulator=true;",
)
os.environ.setdefault("SERVICEBUS_QUEUE_NAME", "ingestion-queue")
os.environ.setdefault("ENVIRONMENT", "local")

CONTRACT_PATH = PIPELINE_ROOT / "contracts" / "example-message.json"
