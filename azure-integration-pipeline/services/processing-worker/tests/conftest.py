"""Make the worker and shared packages importable."""

import sys
from pathlib import Path

SERVICE_ROOT = Path(__file__).resolve().parents[1]
PIPELINE_ROOT = Path(__file__).resolve().parents[3]
sys.path.insert(0, str(PIPELINE_ROOT))
sys.path.insert(0, str(SERVICE_ROOT))

CONTRACT_PATH = PIPELINE_ROOT / "contracts" / "example-message.json"
