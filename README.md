# GateLedger · Little Lemon transactional security

Runnable foundation for anti-fraud ticketing controls:

1. **Cryptographic event-driven ledger** — hash-chained append-only log for issuance, scan, transfer, and invalidation, with in-process pub/sub fan-out (Redis/Kafka-shaped API). Gate scans revoke barcode validity for every subscriber so PDF/screenshot clones fail.
2. **Secure identity handshakes** — WebAuthn/FIDO2 scaffolding, device-bound session tokens, OAuth/OIDC+PKCE stubs, and out-of-band biometric confirmation for high-value transfers.
3. **Checkout TDD** — inventory locking, idempotency, currency/price tamper checks, plus Vitest suites covering concurrent flash-sale races.

## Stack

- Vite + React 19 + TypeScript
- Vitest for unit/concurrency tests
- PostgreSQL reference schema in `schemas/postgres_ledger.sql`

## Scripts

```bash
npm install
npm run dev      # interactive demo
npm test         # ledger, identity, checkout suites
npm run build
```

## Module map

| Path | Role |
|------|------|
| `src/lib/ledger/` | Event ledger, hash chain, pub/sub |
| `src/lib/identity/` | WebAuthn, sessions, transfer MFA, OIDC |
| `src/lib/checkout/` | Inventory locks + checkout orchestration |
| `schemas/postgres_ledger.sql` | Durable schema for tickets, ledger, holds |
