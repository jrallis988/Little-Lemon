#!/bin/sh
# Wait for optional local dependencies, then replace this shell with the service.
set -eu

python - <<'PY'
import os
import socket
import sys
import time


def wait(host_var: str, port_var: str, default_port: int) -> None:
    host = os.environ.get(host_var, "").strip()
    if not host:
        return
    port = int(os.environ.get(port_var, str(default_port)))
    for _attempt in range(60):
        try:
            with socket.create_connection((host, port), timeout=2):
                print(f"{host}:{port} is reachable", flush=True)
                return
        except OSError:
            time.sleep(2)
    print(f"timed out waiting for {host}:{port}", file=sys.stderr)
    sys.exit(1)


wait("SERVICEBUS_WAIT_HOST", "SERVICEBUS_WAIT_PORT", 5672)
wait("STORAGE_WAIT_HOST", "STORAGE_WAIT_PORT", 10000)
PY

exec "$@"
