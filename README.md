# Little Lemon — concept portfolio

A collection of **portfolio concept pieces** (product explorations and visual redesigns).  
These are **not** live production websites or apps, and they are **not** affiliated with or endorsed by the brands they reference.

## Pieces in this repo

| Piece | Kind | Location | How to view |
| --- | --- | --- | --- |
| **Planet Fitness Stratham** | Next.js acquisition + member-app concept | repo root (`app/`, `components/`, …) | `npm install && npm run dev` → http://localhost:3000 |
| **Artistic Fountain** | Static design-studio portfolio | `artistic-fountain/` | `npm run portfolio:fountain` → http://localhost:3001 |
| **NH DMV** | Static conceptual redesign | `nh-dmv/` | `npm run portfolio:dmv` → http://localhost:3002 |

## Planet Fitness Stratham (root Next app)

Local franchise acquisition site + focused member utility concept for Stratham, NH.

| Surface | Owns | Root |
| --- | --- | --- |
| **Web** | Discovery, pricing, Summer Pass, join | `/` |
| **App** | Auth, check-in, keytag, Crowd Meter, billing, account | `/app` |

Product map: `/screens` · Case study: `/product` · Status: `/status`

```bash
npm install
cp .env.example .env.local   # optional for local concept demos
npm run dev
```

Useful scripts: `npm run build`, `npm test`, `npm run typecheck`, `npm run lint`.

## Artistic Fountain

Independent design-venture portfolio (digital media, brand, services, blog). Static HTML/CSS in `artistic-fountain/`.

## NH DMV

Conceptual redesign of New Hampshire DMV surfaces. Static HTML/CSS/JS in `nh-dmv/`. See `nh-dmv/README.md`.

## Notes

- Treat every piece as a **demo / case study**, not a deploy target for real users.
- Brand names, logos, and product patterns appear for portfolio storytelling only.
- Optional Cloudflare / Stripe / KV wiring on the PF piece exists to show engineering depth — not for commercial go-live.
