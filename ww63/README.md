# Weight Watchers 63 — 63 Years of You

Independent conceptual redesign: anniversary campaign site + interactive product vision prototypes.

**Not affiliated with or commissioned by WeightWatchers.**

Lives in this monorepo under `ww63/` as an Artistic Fountain portfolio case study (alongside `nh-dmv/`).

## Quick start

```bash
cd ww63
npm install
npm run dev
```

```bash
npm run lint
npm run build
npm run preview
```

## Routes

| Route | Description |
|-------|-------------|
| `/` | Campaign homepage (hero, plan matrix, guided journey, chapters) |
| `/find-your-year` | Interactive year quiz + share card |
| `/whats-next` | Flagship product prototypes + guided Pathways → Life → Kitchen |
| `/case-study` | Portfolio case study with annotated screens |
| `/programs` `/stories` `/innovation` `/research` `/about` | Supporting pages |
| `/63` | Alias to homepage |

## Role · Stack · Ownership

- **Role:** Product design, brand narrative, interaction design, front-end implementation
- **Stack:** Vite · React 18 · TypeScript · Tailwind · React Router
- **Owned:** Campaign homepage, guided journey, onboarding + plan matrix, Find Your Year, case study packaging, deploy config

## Deploy (permanent public URL)

### Vercel

1. Import this repository in [Vercel](https://vercel.com)
2. Set **Root Directory** to `ww63`
3. Framework: Vite (or use included `vercel.json`)
4. Env: `VITE_SITE_URL` = your production URL (e.g. `https://ww63.vercel.app`)
5. Deploy

### Netlify

1. Import repo in [Netlify](https://netlify.com)
2. Base directory: `ww63`
3. Build: `npm run build` · Publish: `dist`
4. Set `VITE_SITE_URL` in site env vars

### After deploy

- Confirm refresh works on `/whats-next`, `/find-your-year`, `/case-study`
- Paste the live URL into the portfolio card on `weight-watchers-63.html` if you want a one-click demo

## Thesis

63 years taught us something: there is no single way to get healthy. So we’re building the next Weight Watchers around you.
