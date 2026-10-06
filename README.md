# Marshalls — storefront redesign (portfolio)

Independent **portfolio concept** for an off-price Marshalls shopping experience. Not a live website, not affiliated with Marshalls or TJX Companies.

Inspired by [Marshalls.com](https://www.marshalls.com/) — brand names for less, treasure-hunt shopping, and compare-at value pricing.

**Review this piece:** [Case study](/case-study) · [Design system](/design-system) · [Home](/)

## What this demonstrates

- End-to-end storefront IA (21 mapped screens)
- Brand system: Marshalls blue `#003DA5`, Libre Baskerville wordmark, Source Sans 3
- Happy-path commerce UI: catalog filters, PDP, bag, guest checkout (mocked services)
- Mobile-first chrome: hamburger drawer, sticky CTAs, touch product cards

Auth, payments, inventory, and photography are simulated so the **design and interaction** can be reviewed without production infrastructure.

## Stack

- React 18 + TypeScript
- Vite + Tailwind CSS
- Zustand + localStorage
- React Router

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

## Deploy (optional host for the case study)

Static SPA. `dist/` plus SPA rewrites in `vercel.json` / `netlify.toml`.

```bash
npx vercel --prod
# or
npx netlify deploy --prod --dir=dist
```

## Brand direction

- **Primary:** Marshalls Blue (`#003DA5`)
- **Typography:** Libre Baskerville (wordmark) + Source Sans 3 (UI)
- **Voice:** Brand names for less · Never the same store twice · Thrill of the find
