# OJ production wiring

## What works without secrets (demo)

- Chronological discover: Everyone / Following / Supporting
- Free follow graph (localStorage) + member unlocks
- Creator directory search + craft tags
- Library (supporter drops, tip/unlock receipts, revoke)
- Activity feed (unlocks, tips, publishes, replies, follows)
- Post deep links (`/p/$postId`) + share
- Demo auth / membership / publish / Backstage replies
- Creator earnings panel + Stripe Connect demo onboarding
- Checkout return applies unlock/tip from query params
- Demo media upload (metadata + placeholder URL; bytes not stored)
- Report + block · Terms / privacy drafts · PWA manifest
- `/api/status` feature flags + route map
- Stripe checkout / Connect / webhook + media upload APIs

## Connect to go live

| Secret / service | Purpose |
|------------------|---------|
| `DATABASE_URL` | Postgres. Neon URLs auto-use HTTP driver (Workers-safe) |
| `DATABASE_DRIVER` | Optional override: `neon-http` or `node-postgres` |
| `BETTER_AUTH_SECRET` + `BETTER_AUTH_URL` | Replace demo auth |
| `STRIPE_SECRET_KEY` | Checkout sessions + Connect Account Links |
| `STRIPE_WEBHOOK_SECRET` | `POST /api/stripe/webhook` → `oj_subscriptions` / `oj_tips` |
| `STRIPE_CONNECT_CLIENT_ID` | Optional Connect flag in `/api/status` |
| R2 (`R2_*` + wrangler `r2_buckets`) | Persist `/api/media/upload` bytes |
| Permanent Cloudflare account | Replace temporary Workers previews |

## Migrate + seed

```bash
# with DATABASE_URL set
npm run db:migrate
# then seed demo creators/posts:
psql "$DATABASE_URL" -f drizzle/0002_oj_seed.sql
```

SQL files:

- `drizzle/0000_sticky_satana.sql` — core + Better Auth
- `drizzle/0001_oj_monetization.sql` — `oj_*` tables
- `drizzle/0002_oj_seed.sql` — Maya / Frame / Devon bootstrap

## Access rule

`canAccessPost` in `src/lib/oj/access.ts` — public always; supporters only when creator id is unlocked (demo membership today, `oj_subscriptions` when DB + Stripe webhooks are live).

Checkout return (`?checkout=success&creatorId=&kind=&amount=&label=`) applies on-device membership as a bridge until webhooks own sync.

## Data path

`src/server/oj.ts` (via `createServerFn` in `oj-fns.ts`) loads feed/creators from Postgres when available, otherwise `src/lib/oj/catalog.ts`.
