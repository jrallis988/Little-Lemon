#!/usr/bin/env bash
# Boot os-image.bin under QEMU: banner, heap, uptime, echo, exception demo.
set -euo pipefail

cd "$(dirname "$0")"
IMG=os-image.bin
EXPECT_BANNER="KERNEL WITH EXCEPTIONS + HEAP"
EXPECT_HEAP="kmalloc demo"
EXPECT_ADDR="0x00010000"
EXPECT_UPTIME="uptime:"
EXPECT_ECHO="hello"
EXPECT_EXC="EXCEPTION"
EXPECT_FAULT="Invalid Opcode"
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

python3 - "$SOCK" "$EXPECT_BANNER" "$EXPECT_HEAP" "$EXPECT_ADDR" "$EXPECT_UPTIME" "$EXPECT_ECHO" "$EXPECT_EXC" "$EXPECT_FAULT" <<'PY'
import json, re, socket, sys, time

(sock_path, expect_banner, expect_heap, expect_addr, expect_uptime,
 expect_echo, expect_exc, expect_fault) = sys.argv[1:9]

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
            if "event" in obj:
                continue
            return obj

def qmp(sock, cmd):
    sock.sendall((json.dumps(cmd) + "\n").encode())
    return recv_obj(sock)

def vga_text(sock, nbytes=4000):
    resp = qmp(sock, {
        "execute": "human-monitor-command",
        "arguments": {"command-line": f"xp /{nbytes}bx 0xb8000"},
    })
    dump = resp.get("return", "")
    bytes_out = [int(tok, 16) for tok in re.findall(r"\b0x([0-9a-f]{1,2})\b", dump, re.I)]
    chars = []
    for i in range(0, len(bytes_out) - 1, 2):
        ch = bytes_out[i]
        chars.append(chr(ch) if 32 <= ch < 127 else " ")
    return "".join(chars)

def rows(text, n=25):
    return [text[i:i + 80].rstrip() for i in range(0, min(len(text), 80 * n), 80)]

def sendkeys(sock, keys):
    for key in keys:
        qmp(sock, {
            "execute": "human-monitor-command",
            "arguments": {"command-line": f"sendkey {key}"},
        })
        time.sleep(0.08)

time.sleep(1.5)

sock = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)
sock.connect(sock_path)
banner = recv_obj(sock)
assert "QMP" in banner, banner
qmp(sock, {"execute": "qmp_capabilities"})

got = vga_text(sock)
print("VGA rows:")
for row in rows(got):
    if row.strip():
        print(f"  {row!r}")

if expect_banner not in got:
    print("VERIFY FAILED: boot banner not found", file=sys.stderr)
    sys.exit(1)

if expect_heap not in got or expect_addr not in got:
    print("VERIFY FAILED: kmalloc demo / heap address not found", file=sys.stderr)
    sys.exit(1)

if expect_uptime not in got:
    print("VERIFY FAILED: uptime status bar not found", file=sys.stderr)
    sys.exit(1)

m = re.search(r"uptime:\s*(\d+)s", got)
if not m or int(m.group(1)) < 1:
    print("VERIFY FAILED: expected uptime >= 1s", file=sys.stderr)
    sys.exit(1)
print(f"Uptime OK: {m.group(0)}")

sendkeys(sock, list(expect_echo) + ["ret"])
time.sleep(0.4)
got = vga_text(sock)
if expect_echo not in got:
    print("VERIFY FAILED: keyboard echo not found", file=sys.stderr)
    sys.exit(1)

# Fault demo last — handler paints a panic banner and halts.
sendkeys(sock, ["f", "ret"])
time.sleep(0.4)
got = vga_text(sock)
print("After fault:")
for row in rows(got)[:6]:
    if row.strip():
        print(f"  {row!r}")
if expect_exc not in got or expect_fault not in got:
    print("VERIFY FAILED: exception panic banner not found", file=sys.stderr)
    sys.exit(1)
print("Exception handler OK")

qmp(sock, {"execute": "quit"})
sock.close()
print("VERIFY OK")
PY

wait "$QEMU_PID" 2>/dev/null || true
QEMU_PID=
