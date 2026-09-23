# OJ production wiring

## What works without secrets (demo)

- Chronological discover + Supporting filter (unlocked creators)
- Creator directory search + craft tags
- Library (supporter drops, tip/unlock receipts, revoke)
- Activity feed (unlocks, tips, publishes, replies)
- Demo auth / membership / publish / Backstage replies (localStorage)
- Report + block
- Share (Web Share API or clipboard)
- Checkout return banner (`?checkout=success|cancel`)
- PWA manifest + theme meta
- Terms / privacy drafts
- SVG posters + play sheet
- `/api/status` feature flags + route map
- Stripe checkout + media upload API stubs (503 until keys)

## Connect to go live

| Secret / service | Purpose |
|------------------|---------|
| `DATABASE_URL` | Postgres. Neon URLs auto-use HTTP driver (Workers-safe) |
| `DATABASE_DRIVER` | Optional override: `neon-http` or `node-postgres` |
| `BETTER_AUTH_SECRET` + `BETTER_AUTH_URL` | Replace demo auth |
| `STRIPE_SECRET_KEY` | `POST /api/stripe/checkout` → hosted Checkout |
| `STRIPE_WEBHOOK_SECRET` | `POST /api/stripe/webhook` |
| R2 (`R2_*` + wrangler `r2_buckets`) | `POST /api/media/upload` |
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

## Data path

`src/server/oj.ts` loads feed/creators from Postgres when available, otherwise `src/lib/oj/catalog.ts`.
