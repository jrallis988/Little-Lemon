#!/usr/bin/env bash
# Boot os-image.bin under QEMU (no display) and confirm VGA text output.
set -euo pipefail

cd "$(dirname "$0")"
IMG=os-image.bin
EXPECT="CUSTOM KERNEL BOOTED SUCCESSFULLY!"
SOCK=$(mktemp -u /tmp/qemu-qmp.XXXXXX)
cleanup() {
  rm -f "$SOCK"
  if [[ -n "${QEMU_PID:-}" ]] && kill -0 "$QEMU_PID" 2>/dev/null; then
    kill "$QEMU_PID" 2>/dev/null || true
    wait "$QEMU_PID" 2>/dev/null || true
  fi
}
trap cleanup EXIT

if [[ ! -f "$IMG" ]]; then
  echo "error: $IMG not found; run 'make' first" >&2
  exit 1
fi

sig=$(od -An -tx1 -N2 -j510 "$IMG" | tr -d ' \n')
if [[ "$sig" != "55aa" ]]; then
  echo "error: bad boot signature (got $sig, expected 55aa)" >&2
  exit 1
fi

boot_size=$(wc -c < boot.bin | tr -d ' ')
if [[ "$boot_size" != "512" ]]; then
  echo "error: boot.bin must be 512 bytes (got $boot_size)" >&2
  exit 1
fi

qemu-system-i386 \
  -drive format=raw,file="$IMG",if=floppy \
  -boot a \
  -display none \
  -qmp "unix:${SOCK},server,nowait" \
  &
QEMU_PID=$!

for _ in $(seq 1 50); do
  [[ -S "$SOCK" ]] && break
  sleep 0.1
done

python3 - "$SOCK" "$EXPECT" <<'PY'
import json, re, socket, sys, time

sock_path, expect = sys.argv[1], sys.argv[2]

def recv_obj(sock):
    buf = b""
    while True:
        chunk = sock.recv(4096)
        if not chunk:
            raise RuntimeError("QMP connection closed")
        buf += chunk
        while b"\n" in buf:
            line, buf = buf.split(b"\n", 1)
            line = line.strip()
            if not line:
                continue
            obj = json.loads(line.decode())
            # Skip asynchronous events
            if "event" in obj:
                continue
            return obj

def qmp(sock, cmd):
    sock.sendall((json.dumps(cmd) + "\n").encode())
    return recv_obj(sock)

time.sleep(1.2)

sock = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)
sock.connect(sock_path)
banner = recv_obj(sock)
assert "QMP" in banner, banner
qmp(sock, {"execute": "qmp_capabilities"})

resp = qmp(sock, {
    "execute": "human-monitor-command",
    "arguments": {"command-line": "xp /128bx 0xb8000"},
})
qmp(sock, {"execute": "quit"})
sock.close()

dump = resp.get("return", "")
bytes_out = [int(tok, 16) for tok in re.findall(r"\b0x([0-9a-f]{1,2})\b", dump, re.I)]
chars = []
for i in range(0, len(bytes_out) - 1, 2):
    ch = bytes_out[i]
    if 32 <= ch < 127:
        chars.append(chr(ch))
    elif ch == 0:
        break
got = "".join(chars)
print(f"VGA text: {got!r}")
if expect not in got:
    print("VERIFY FAILED: expected message not found in VGA memory", file=sys.stderr)
    print(dump, file=sys.stderr)
    sys.exit(1)
print("VERIFY OK")
PY

wait "$QEMU_PID" 2>/dev/null || true
QEMU_PID=
