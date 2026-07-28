# Marshalls

A production-oriented Marshalls off-price retail storefront built with React, TypeScript, Vite, Tailwind CSS, shadcn-style primitives, and Zustand.

Inspired by [Marshalls.com](https://www.marshalls.com/) — brand names for less, treasure-hunt shopping, and compare-at value pricing.

## Stack

- **React 18 + TypeScript** — modular component architecture
- **Vite** — fast local dev and production builds
- **Tailwind CSS** — Marshalls brand tokens (red `#D71920`, blue `#003DA5`)
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

## Brand direction

- **Primary:** Marshalls Red (`#D71920`) for logo, promo bar, and CTAs
- **Accent:** Marshalls Blue (`#003DA5`) for secondary emphasis
- **Typography:** Montserrat (wordmark) + Source Sans 3 (UI)
- **Voice:** Brand names for less · Never the same store twice · Thrill of the find

## Surfaces

- Homepage with department tiles, wow deals, and just-in finds
- Catalog with faceted filters, sort, skeletons, empty state, and quick view
- Product detail with thumbnails, size/color, store stock hint, sticky add-to-bag
- Slide-over bag with promo codes (`FIND20`, `HAPPY10`) and savings metrics
