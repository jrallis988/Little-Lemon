# OJ production wiring

## What works without secrets (demo)

- Chronological discover + creator profiles
- Demo auth / membership / publish / Backstage replies (localStorage)
- Report + block
- Terms / privacy drafts
- SVG posters + play sheet

## Connect to go live

| Secret / service | Purpose |
|------------------|---------|
| `DATABASE_URL` | Postgres (Neon/Hyperdrive). Run `drizzle/` migrations including `0001_oj_monetization.sql` |
| `BETTER_AUTH_SECRET` + `BETTER_AUTH_URL` | Replace demo auth |
| `STRIPE_SECRET_KEY` + `STRIPE_WEBHOOK_SECRET` | Live unlock + tips; webhook at `/api/stripe/webhook` |
| R2 credentials | Real media uploads into `oj_posts.media_url` |
| Permanent Cloudflare account | Replace temporary Workers previews |

## Migrate

```bash
# with DATABASE_URL set
npm run db:migrate
# or apply SQL manually:
# drizzle/0000_sticky_satana.sql
# drizzle/0001_oj_monetization.sql
```

## Access rule

`canAccessPost` in `src/lib/oj/access.ts` — public always; supporters only when creator id is in the active unlock set (demo membership today, `oj_subscriptions` when DB is live).
