# GateLedger · Little Lemon transactional security

Anti-fraud ticketing foundation: cryptographic ledger, rotating QR codes, passkey
transfer MFA, inventory race locks, and Stripe PaymentIntents.

## Quick start (local)

```bash
npm install
npm run dev:all   # API :8787 + Vite :5173 (proxies /api)
```

## Production (single process)

```bash
npm run build
npm start         # serves API + dist/ on PORT (default 8787)
```

## Docker

```bash
docker compose up --build
# → http://localhost:8787
curl http://localhost:8787/api/ready
```

## Env

See `.env.example`.

| Variable | Purpose |
|----------|---------|
| `STRIPE_SECRET_KEY` | Enables live Stripe PaymentIntents via official SDK |
| `STRIPE_PUBLISHABLE_KEY` | Exposed at `GET /api/payments/config` for Stripe.js |
| `STRIPE_WEBHOOK_SECRET` | Webhook signing (`whsec_…`); demo HMAC if unset |
| `STRIPE_ALLOW_TEST_CONFIRM` | Server-side `pm_card_visa` confirm (off in `NODE_ENV=production`) |
| `PORT` | Listen port (default `8787`) |

## Features

1. **Ledger** — hash chain + SSE; **15s rotating QR**; scan revokes clones
2. **Identity** — WebAuthn scaffolding + device sessions in SQLite
3. **Checkout** — inventory locks, race TDD, PaymentIntent → confirm/webhook → ticket

## API highlights

- `GET /api/health`, `GET /api/ready`
- `GET /api/payments/config`
- `GET /api/ledger/tickets/:id/code`
- `POST /api/checkout/intent` → `POST /api/checkout/confirm`
- `POST /api/payments/webhook`

## Still before full production

- Stripe.js Elements in the UI (publishable key endpoint is ready)
- Real IdP + `@simplewebauthn/server`
- Postgres + Redis/Kafka (see `schemas/postgres_ledger.sql`)
- Merge draft PR and point a host at the Docker image
