# Thomas — Local-First Retail Assistant

Thomas is an on-premise retail operations copilot for back-room inventory tracking, shift reconciliation, and audit logging. Built with **Tauri + SvelteKit + SQLite**, it runs entirely locally with zero cloud dependency.

## Architecture

```
thomas-assistant/
├── src-tauri/             # Rust backend & local SQLite
│   ├── src/
│   │   ├── db.rs          # SQLite connection & migrations
│   │   ├── commands.rs    # Tauri commands for inventory/shifts
│   │   └── ai.rs          # Local Ollama wrapper/bridge
│   └── Cargo.toml
├── src/                   # SvelteKit frontend
│   ├── lib/
│   │   ├── components/    # Scan, Reconcile, Audit, Chat
│   │   └── stores/        # Local state management
│   └── routes/            # Split-screen app layout
└── package.json
```

## Database Schema

| Table | Columns |
|-------|---------|
| `inventory_scans` | id, sku, expected_qty, actual_qty, variance, timestamp |
| `shift_logs` | id, register_id, cash_expected, cash_actual, variance, user_id, timestamp |
| `audit_trails` | id, action_type, details, user_id, timestamp |

## Features

- **Inventory scanning** — color-coded variance thresholds (green/yellow/red)
- **3-step shift close** — cash count → back-room check → PIN sign-off
- **Immutable audit trail** — one-click CSV/JSON export
- **Assistant chat** — connects to local Ollama (falls back to offline mode)

## Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [Rust](https://www.rust-lang.org/tools/install)
- [Tauri prerequisites](https://tauri.app/start/prerequisites/) for your OS
- (Optional) [Ollama](https://ollama.com/) with `llama3` or similar model

## Development

```bash
cd thomas-assistant
npm install
npm run tauri dev
```

### Browser preview (cloud demo)

```bash
npm run dev          # http://localhost:1420
npm run build && npm run preview   # production build at :4173
```

### Deploy to Cloudflare Pages

```bash
# One-time: wrangler login (or set CLOUDFLARE_API_TOKEN + CLOUDFLARE_ACCOUNT_ID)
npm run deploy:cf
```

For a quick public tunnel during development:

```bash
npm run build && npm run preview -- --host 0.0.0.0 --port 4173
cloudflared tunnel --url http://localhost:4173
```

## Build

```bash
npm run tauri build
```

## Ollama Setup (Optional)

```bash
ollama pull llama3
ollama serve   # runs on localhost:11434 by default
```

Without Ollama, Thomas runs in offline mode with rule-based assistant responses.

## Demo Credentials

- Operator ID: `operator-1` (hardcoded for demo)
- Manager PIN for shift sign-off: `1234`
