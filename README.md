# Marshalls

A production-oriented Marshalls off-price retail storefront built with React, TypeScript, Vite, Tailwind CSS, shadcn-style primitives, and Zustand.

Inspired by [Marshalls.com](https://www.marshalls.com/) — brand names for less, treasure-hunt shopping, and compare-at value pricing.

## Stack

- **React 18 + TypeScript** — modular component architecture
- **Vite** — fast local dev and production builds
- **Tailwind CSS** — Marshalls brand tokens (blue `#003DA5`)
- **Zustand + localStorage** — persistent bag and filter state
- **React Router** — home, catalog, PDP, and shell navigation

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm run preview
```

## Deploy (stakeholder URL)

This is a static SPA. Build output is `dist/`. SPA rewrites are configured for Vercel and Netlify so deep links (`/catalog`, `/product/...`) work.

### Vercel

1. Import the GitHub repo in [Vercel](https://vercel.com/new)
2. Framework preset: **Vite** (uses `vercel.json`)
3. Deploy — production builds hide `/design-system` by default

```bash
npx vercel --prod
```

### Netlify

1. Import the repo in [Netlify](https://app.netlify.com/)
2. Build command: `npm run build` · Publish directory: `dist`
3. `public/_redirects` + `netlify.toml` handle SPA routing

```bash
npx netlify deploy --prod --dir=dist
```

### Any static host

```bash
npm run build
# upload the contents of dist/
```

Serve `index.html` for unknown paths (SPA fallback).

## Stakeholder demo

Production builds hide `/design-system` and its nav links. To expose the contact sheet in a built preview:

```bash
VITE_SHOW_DESIGN_SYSTEM=1 npm run build
```

Local `npm run dev` always includes the design system.

## Brand direction

- **Primary:** Marshalls Blue (`#003DA5`) for logo, promo accents, and CTAs
- **Typography:** Libre Baskerville (wordmark) + Source Sans 3 (UI)
- **Voice:** Brand names for less · Never the same store twice · Thrill of the find

## Surfaces

- Homepage with department tiles, wow deals, and just-in finds
- Catalog with faceted filters, sort, skeletons, empty state, and quick view
- Product detail with thumbnails, size/color, store stock hint, sticky add-to-bag
- Slide-over bag with promo codes (`FIND20`, `HAPPY10`) and savings metrics
- Dedicated merch landings: `/designer-shop`, `/under-50`, `/clearance`
- Store finder with preferred-store persistence, account, bag, and guest checkout
