# Thomas

Local-first virtual assistant for retail back-room accounting, inventory reconciliation, shipment processing, and shift audits.

Thomas is built for ruggedized mobile terminals and back-office desktops: high-contrast text UI, large touch targets, keyboard shortcuts, and explicit confirmation before money-related writes. Store metrics never leave the machine.

## Layout

```text
thomas-assistant/
├── core/
│   ├── ingestion.py       # Shipment manifest and SKU parsing
│   ├── audit.py           # Shift reconciliation and register balancing
│   └── logger.py          # Local-first encrypted ledger storage
├── ui/
│   ├── terminal.py        # Distraction-free command interface
│   └── components.py      # High-contrast tactile UI helpers
├── config/
│   └── store_profile.json # Store number, SKU maps, tier defaults
├── samples/               # Example manifests and order sheets
├── tests/
└── main.py                # Application entry point
```

## Setup

```bash
cd thomas-assistant
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

`cryptography` enables Fernet encryption for the ledger. Without it, Thomas still runs with a local XOR+HMAC envelope — data remains on disk and off the network.

## Run

Interactive session:

```bash
python3 main.py
```

Demo against sample shipment data:

```bash
python3 main.py --demo
```

One-shot commands:

```bash
python3 main.py -c status -c "ingest samples/inbound_manifest.csv samples/order_sheet.csv" -c discrepancies
```

## Core workflows

| Module | What it does |
|--------|----------------|
| **Manifest ingestion** | Parse CSV / JSON / truck logs; reconcile to order sheets |
| **Discrepancy flagging** | Highlight missing SKUs, shortages, overages, damaged freight |
| **Back-room log** | Track unboxed qty, staging zone, associate, process time |
| **Register / safe balance** | Denomination counts with float + deposit math |
| **Expense tracking** | Store-use supplies (tape, tags, labels) |
| **Shift briefing** | Short exception notes for incoming management |
| **Encrypted ledger** | Append-only local audit trail (`data/ledger.enc`) |

## Tests

```bash
python3 -m unittest discover -s tests -v
```

## Privacy

- Ledger and key files live under `data/` (created on first run).
- No network calls are made by Thomas.
- Exporting plaintext requires an explicit `LocalLedger.export_plain()` call.
