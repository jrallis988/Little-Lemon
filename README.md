# Planet Fitness Stratham — Club Acquisition + Member Utility

Concept product for **Planet Fitness Stratham, NH**: a local acquisition website and a focused member app. Independent exploration — **not affiliated with or endorsed by Planet Fitness Franchising, LLC**.

## Problem

National gym sites optimize for brand reach. A local franchise needs a clearer path: find the Stratham club, compare Classic vs Black Card with transparent fees, join online, then use a small set of member tools (check-in, keytag, crowd, billing).

## Surfaces

| Surface | Owns | Root |
|---------|------|------|
| **Web** | Discovery, pricing, Summer Pass, join | `/` |
| **App** | Auth, check-in, keytag, Crowd Meter, billing, account | `/app` |

Product map (core vs roadmap): `/screens` · Product case study: `/product`

## Stack

- Next.js App Router + TypeScript + Tailwind
- Optional Stripe Checkout / Elements + webhooks
- Durable local store under `.data/` (swap for Postgres before multi-instance deploy)
- Vitest unit tests + GitHub Actions CI (`npm run typecheck` / `lint` / `test` / `build`)
- Health probe: `GET /api/health`

## Setup

```bash
npm install
cp .env.example .env.local
# Required for production: AUTH_SECRET, ACCESS_CONTROL_SECRET, NEXT_PUBLIC_SITE_URL
npm run dev
```

- Website: http://localhost:3000  
- Member app: http://localhost:3000/app  

### Environment notes

| Variable | Purpose |
|----------|---------|
| `AUTH_SECRET` | Session signing (**required in production**) |
| `ACCESS_CONTROL_SECRET` | Door / keytag HMAC |
| `STRIPE_*` | Live/test payments; without keys, join uses local test authorization |
| `CLUBS_API_URL` | Remote club inventory; otherwise Seacoast seed clubs |
| `ALLOW_DEMO_AUTH=true` | Local QA only — **never on in production** |
| `NEXT_PUBLIC_SHOW_SCREEN_IDS=true` | Show internal screen chrome in staging |

## Launch posture

**Core (ship first):** STRONG hero → Explore Clubs → Memberships → Summer Pass → Join → confirmation → member sign-in / check-in / keytag / crowd / billing.

**Roadmap:** remaining `/screens` entries (perks, spa booking, health sync, etc.).

## Case study framing

- **Audience:** Seacoast NH prospects + Stratham members  
- **Constraint:** Unofficial brand exploration; pricing and legal must be franchise-confirmed before commercial use  
- **Decision:** Prefer depth on the join funnel over 85 equally polished utility screens  

## License / brand

Planet Fitness names, marks, and campaign lines are used for conceptual product design only. Obtain franchise or corporate approval before any public commercial deployment.
