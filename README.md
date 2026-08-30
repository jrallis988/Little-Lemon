# OJ — Only Jokes

**Unfiltered stand-up, raw road work, and animated comedy without corporate censorship.**

Creator-subscription comedy platform for stand-ups, comedy animators, and fans. Chronological discovery. Direct tips. Locked supporter tiers for full specials, writing-lab audio, and exclusive shorts.

## Stack

- TanStack Start + Vite
- Cloudflare Workers
- Tailwind CSS v4
- Drizzle schema (core + OJ monetization tables)
- Demo auth + membership on-device until `DATABASE_URL` / Stripe are connected

## Core views

| Route | Purpose |
|-------|---------|
| `/` | Brand landing |
| `/onboarding` | Product tour → fan/creator signup |
| `/auth` | Demo sign up / sign in |
| `/discover` | Chronological public discovery feed |
| `/creators` | Creator directory |
| `/c/$username` | Creator profile (public + locked tiles) |
| `/messages` | Backstage inbox |
| `/settings` | Account, role switch, tier pricing |

## Local develop

```bash
npm install
npm run dev
```

Without `DATABASE_URL`, the UI uses demo auth and local membership (localStorage). Unlocking a tier or sending a tip persists on-device and opens locked posts.

## Production wiring

1. Postgres (`DATABASE_URL`) + migrate Drizzle schema (`oj_*` tables)
2. Better Auth secrets
3. Stripe Checkout / Connect for live unlock + tips
4. R2 for real media uploads (SVG posters are temporary)
5. `npx wrangler deploy` with a permanent Cloudflare account

## Deploy (Cloudflare)

```bash
npm run build && npx wrangler deploy --temporary
# or permanent:
npm run deploy
```
