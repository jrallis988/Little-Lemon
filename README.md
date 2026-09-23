# GateLedger · Little Lemon transactional security

Runnable foundation for anti-fraud ticketing controls:

1. **Cryptographic event-driven ledger** — hash-chained append-only log, SSE pub/sub, and **15s rotating QR tokens** so screenshots expire.
2. **Secure identity handshakes** — WebAuthn/FIDO2 scaffolding + device-bound sessions persisted in SQLite.
3. **Checkout TDD** — inventory locking, race tests, and **Stripe-shaped PaymentIntents** (demo HMAC webhooks; set `STRIPE_SECRET_KEY` / `STRIPE_WEBHOOK_SECRET` for live keys).

## Stack

- Vite + React 19 + TypeScript (UI)
- Hono API on Node (`server/`) with SQLite (`data/gateledger.sqlite`)
- Vitest for domain + persistence + payment tests
- PostgreSQL reference schema in `schemas/postgres_ledger.sql`
- GitHub Actions CI

## Scripts

```bash
npm install
npm run dev:all   # API :8787 + Vite :5173 (proxies /api)
npm test
npm run build
```

## Env (optional)

| Variable | Purpose |
|----------|---------|
| `STRIPE_SECRET_KEY` | When set, payments mode reports `stripe` (wire REST next) |
| `STRIPE_WEBHOOK_SECRET` | HMAC secret for `POST /api/payments/webhook` (default demo secret) |
| `PORT` | API port (default `8787`) |

## Notable API routes

- `GET /api/ledger/tickets/:id/code` — current rotating QR
- `POST /api/ledger/scan` — `{ presentedToken }` or `{ staleSteps }` for screenshot demos
- `POST /api/checkout/intent` → `POST /api/checkout/confirm`
- `POST /api/payments/webhook` — signed `payment_intent.succeeded`
