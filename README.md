# Weight Watchers 63 — 63 Years of You

Independent conceptual redesign: anniversary campaign site + interactive product vision prototypes.

**Not affiliated with or commissioned by WeightWatchers.**

## Routes

| Route | Description |
|-------|-------------|
| `/` | Campaign homepage (hero, plan matrix, guided journey, chapters) |
| `/find-your-year` | Interactive year quiz + share card |
| `/whats-next` | Flagship product prototypes + guided Pathways → Life → Kitchen |
| `/case-study` | Portfolio case study with annotated screens |
| `/programs` `/stories` `/innovation` `/research` `/about` | Supporting pages |
| `/63` | Alias to homepage |

## Stack

Vite · React 18 · TypeScript · React Router · Tailwind CSS

## Local development

```bash
npm install
npm run dev
```

```bash
npm run lint
npm run build
npm run preview
```

## Key components

- `src/components/onboarding/OnboardingModal.tsx` — 5-step onboarding (Pathway → plan match)
- `src/components/pricing/PlanMatrix.tsx` — concept plan comparison table
- `src/components/future/GuidedWalkthrough.tsx` — Pathways → WW Life → Kitchen demo
- `src/context/OnboardingProvider.tsx` — global modal state (`useOnboarding()`)

## Deploy (Vercel or Netlify)

### Vercel

1. Import this repository in [Vercel](https://vercel.com).
2. Framework preset: **Vite** (or use included `vercel.json`).
3. Add environment variable: `VITE_SITE_URL` = your production URL (e.g. `https://ww63.vercel.app`).
4. Deploy. SPA routing is handled via `vercel.json` rewrites.

### Netlify

1. Import repo in [Netlify](https://netlify.com).
2. Build command: `npm run build` · Publish directory: `dist` (see `netlify.toml`).
3. Set `VITE_SITE_URL` in site environment variables.
4. SPA fallback is configured in `netlify.toml` and `public/_redirects`.

### After deploy

- Confirm `/whats-next`, `/find-your-year`, and `/case-study` load on refresh.
- Share a link and verify Open Graph preview (title, description, hero image).

## Campaign thesis

63 years taught us something: there is no single way to get healthy. So we’re building the next Weight Watchers around you.
