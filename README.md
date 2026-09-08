# GateLedger · Little Lemon transactional security

Runnable foundation for anti-fraud ticketing controls:

1. **Cryptographic event-driven ledger** — hash-chained append-only log for issuance, scan, transfer, and invalidation, with SSE pub/sub fan-out. Gate scans revoke barcode validity for every subscriber so PDF/screenshot clones fail.
2. **Secure identity handshakes** — WebAuthn/FIDO2 scaffolding, device-bound session tokens, OAuth/OIDC+PKCE stubs, and out-of-band biometric confirmation for high-value transfers.
3. **Checkout TDD** — inventory locking, idempotency, currency/price tamper checks, plus Vitest suites covering concurrent flash-sale races.

## Stack

- Vite + React 19 + TypeScript (UI)
- Hono API on Node (`server/`) with SQLite persistence (`data/gateledger.sqlite`)
- Vitest for domain + persistence tests
- PostgreSQL reference schema in `schemas/postgres_ledger.sql` (production target)
- GitHub Actions CI (lint, test, build)

## Scripts

```bash
npm install
npm run dev:all   # API :8787 + Vite :5173 (proxies /api)
npm run dev:api   # API only
npm run dev       # UI only (needs API for live actions)
npm test
npm run build
```

## Module map

| Path | Role |
|------|------|
| `src/lib/ledger/` | Event ledger, hash chain, pub/sub |
| `src/lib/identity/` | WebAuthn, sessions, transfer MFA, OIDC |
| `src/lib/checkout/` | Inventory locks + checkout orchestration |
| `src/lib/apiClient.ts` | Browser client for REST + SSE |
| `server/` | Hono API, SQLite store, platform wiring |
| `schemas/postgres_ledger.sql` | Durable Postgres schema for tickets, ledger, holds |

## API surface

- `GET /api/health`, `GET /api/ledger/tickets|events|verify`
- `POST /api/ledger/issue`, `POST /api/ledger/scan`
- `GET /api/ledger/stream` (SSE)
- `POST /api/identity/passkey/register`, `session`, `transfer/start|approve`
- `GET /api/checkout/inventory`, `POST /api/checkout`, `POST /api/checkout/race`
