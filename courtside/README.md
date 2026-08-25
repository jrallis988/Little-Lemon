# COURTSIDE

Fictional basketball media brand — YouTube sports content & graphic design system.

Interactive case-study presentation built with React, TypeScript, modern CSS, and GSAP.

## Concept

**EVERY POSSESSION HAS A STORY.**

## Develop

```bash
cd courtside
npm install
npm run dev
```

Open the local Vite URL (default `http://localhost:5173/courtside/`).

## Build

```bash
cd courtside
npm run build
```

Static output lands in `courtside/dist/`. From the repo root:

```bash
npm start
```

Then visit `/courtside/dist/`.

## Replaceable assets

| Role | Path |
| --- | --- |
| Photography / Photoshop thumbs | `public/assets/photos/` |
| Brand marks (Illustrator) | `public/assets/brand/` |
| Content + series copy | `src/data/brand.ts` |
| Motion timings (AE reference) | `src/components/MotionPreview.tsx` |

Swap image files and update paths in `src/data/brand.ts` — no rebuild of components required beyond a refresh.

## Stack

- React + TypeScript + Vite
- GSAP for motion prototypes
- CSS design tokens (`src/styles/tokens.css`)
