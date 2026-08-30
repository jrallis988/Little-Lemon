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

### Browser preview

```bash
npm run dev          # http://localhost:1420
npm run build && npm run preview   # production build at :4173
```

Browser mode persists cellar counts, closings, chat, and restock approvals to local storage. On first visit, Thomas seeds a believable house night so Home notices and Restock have real signals. On first close, you'll set your own four-digit sign-off code.

**Thomas for Business (this phase):** Home notices from live counts/closes → Cellar Check → Restock (approve/export, never auto-order) → Close the Night → The Record. Personal mode is parked.

### Reset demo house

In the browser console:

```js
localStorage.removeItem("thomas-house-data");
location.reload();
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

## Ollama Setup (Live chat)

Browser and Tauri chat use **Ollama** when it's running locally. Without it, Thomas falls back to offline rule-based replies.

```bash
# Install (once): https://ollama.com
ollama pull llama3.2:1b    # fast default; or: ollama pull llama3

# Terminal 1 — model server
ollama serve

# Terminal 2 — Thomas (Vite proxies /api/ollama → localhost:11434)
cd thomas-assistant
npm run dev          # or: npm run build && npm run preview
```

Chat shows **● Live AI** when Ollama is reachable. Override model:

```bash
VITE_OLLAMA_MODEL=llama3 npm run dev
```

For `npm run tauri dev`, Ollama is called from Rust (`src-tauri/src/ai.rs`, default model `llama3`).
