# Planet Fitness Stratham — Club Acquisition + Member Utility

Concept product for **Planet Fitness Stratham, NH**: a local acquisition website and a focused member app. Independent exploration — **not affiliated with or endorsed by Planet Fitness Franchising, LLC**.

## Problem

National gym sites optimize for brand reach. A local franchise needs a clearer path: find the Stratham club, compare Classic vs Black Card with transparent fees, join online, then use a small set of member tools (check-in, keytag, crowd, billing).

## Surfaces

| Surface | Owns | Root |
|---------|------|------|
| **Web** | Discovery, pricing, Summer Pass, join | `/` |
| **App** | Auth, check-in, keytag, Crowd Meter, billing, account | `/app` |

Product map (core vs roadmap): `/screens` · Product case study: `/product` · Status / scorecard: `/status`

## Stack

- Next.js App Router + TypeScript + Tailwind
- Optional Stripe Checkout / Elements + webhooks
- Local JSON store under `.data/` (in-memory on Cloudflare Workers)
- OpenNext + Wrangler for Cloudflare Workers deploy
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
| `USE_MEMORY_STORE=true` | In-memory data (auto on Cloudflare Workers) |

## Deploy on Cloudflare

Two paths — pick one.

### A) Cloudflare dashboard (Connect to Git)

1. [Workers & Pages → Create → Connect to Git](https://dash.cloudflare.com/?to=/:account/workers-and-pages/create)
2. Repository: `https://github.com/jrallis988/Little-Lemon`
3. Production branch: `cursor/planet-fitness-club-pricing-2f73`
4. Build settings:

| Setting | Value |
|---------|-------|
| Build command | `npx opennextjs-cloudflare build` |
| Deploy command | `npx opennextjs-cloudflare deploy` |
| Preview command | `npx opennextjs-cloudflare preview` |

5. **Runtime** Variables & Secrets (Worker → Settings):

| Name | Type |
|------|------|
| `AUTH_SECRET` | Secret |
| `ACCESS_CONTROL_SECRET` | Secret |
| `NEXT_PUBLIC_SITE_URL` | Text (your workers.dev URL after first deploy) |

6. **Durable store (launch 9 → 10):** after the Worker is in your account:

```bash
npx wrangler login
bash scripts/setup-kv.sh
# paste kv_namespaces into wrangler.jsonc, remove USE_MEMORY_STORE
npm run deploy
```

7. Redeploy. Live URL shape:  
   `https://planet-fitness-stratham.<your-subdomain>.workers.dev`

Checklist UI: `/status`

### B) GitHub Actions (manual)

Add these **GitHub repo secrets**, then run **Actions → deploy-cloudflare → Run workflow**:

| Secret | Purpose |
|--------|---------|
| `CLOUDFLARE_API_TOKEN` | Token with Workers Scripts Edit |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare account id |
| `AUTH_SECRET` | Session signing |
| `ACCESS_CONTROL_SECRET` | Door / keytag HMAC |
| `NEXT_PUBLIC_SITE_URL` | Optional until first URL is known |

### Local CLI

```bash
cp .dev.vars.example .dev.vars
npx wrangler login
npm run deploy
```

Worker name: `planet-fitness-stratham`

## Launch posture

**Core (ship first):** STRONG hero → Explore Clubs → Memberships → Summer Pass → Join → confirmation → member sign-in / check-in / keytag / crowd / billing.

**Roadmap:** remaining `/screens` entries (perks, spa booking, health sync, etc.).

## Case study framing

- **Audience:** Seacoast NH prospects + Stratham members  
- **Constraint:** Unofficial brand exploration; pricing and legal must be franchise-confirmed before commercial use  
- **Decision:** Prefer depth on the join funnel over 85 equally polished utility screens  

## License / brand

Planet Fitness names, marks, and campaign lines are used for conceptual product design only. Obtain franchise or corporate approval before any public commercial deployment.
