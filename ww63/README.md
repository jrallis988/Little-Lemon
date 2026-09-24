# Weight Watchers 63 — 63 Years of You

Independent conceptual redesign: anniversary campaign + interactive product vision.

**Not affiliated with or commissioned by WeightWatchers.**

**Portfolio score target: 10** — thesis, guided product journey, craft polish, case study packaging, and a one-click static demo.

## Open the demo

| Mode | How |
| --- | --- |
| **From Artistic Fountain portfolio** | Open `ww63/dist/index.html` (or the WW 63 card on the home page) |
| **Local source** | `cd ww63 && npm install && npm run dev` |
| **Permanent URL** | Deploy `ww63/` to Vercel (Root Directory: `ww63`) |

## Role · Stack · Ownership

- **Role:** Product design, brand narrative, interaction design, front-end implementation
- **Stack:** Vite · React 18 · TypeScript · Tailwind · React Router
- **Owned:** Campaign homepage, guided Pathways → Life → Kitchen, onboarding + plan matrix, Find Your Year, case study, deploy config

## What’s inside

- Campaign narrative: needs first → history → present → future
- Guided journey with carried Pathway state
- Onboarding modal + concept plan matrix
- Interactive prototypes: WW Life, Pathways, Kitchen, Team, Life After GLP-1
- Case study: process, vs live WW, decisions, cuts, outcomes, annotated screens

## Scripts

```bash
npm install
npm run dev
npm run lint
npm run build              # standalone (Vercel root = ww63)
npm run build:portfolio    # embed at /ww63/dist for static portfolio serve
```

Rebuild the portfolio demo after source changes:

```bash
npm run build:portfolio
```

## Deploy

1. Vercel → Import repo → **Root Directory: `ww63`**
2. Env: `VITE_SITE_URL` = production URL
3. Or use `.github/workflows/deploy-ww63.yml` with Vercel secrets

## Thesis

63 years taught us something: there is no single way to get healthy. So we’re building the next Weight Watchers around you.
