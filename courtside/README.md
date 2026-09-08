# COURTSIDE

Fictional basketball / sports media brand — YouTube sports content & graphic design system.

Interactive case-study presentation built with React, TypeScript, modern CSS, and GSAP.

## Concept

**EVERY POSSESSION HAS A STORY.**

## Develop

```bash
cd courtside
npm install
npm run dev
```

## Build

```bash
# from repo root
npm run build:courtside
```

Static output: `courtside/dist/`. Serve the repo and open `/courtside/dist/`.

## Pre-launch checklist

- [x] Compress photography assets for web
- [x] Open Graph + Twitter meta tags (`og-image.jpg`)
- [x] Remove unused legacy section files
- [ ] Merge PR and deploy host
- [ ] Set absolute `og:image` URL for your live domain (social crawlers need absolute URLs)
- [ ] Smoke-test live: photos, compare tool, motion replay, mobile nav
- [ ] Optional: replace generated photos / logo with Photoshop + Illustrator exports
- [ ] Optional: embed a short After Effects motion reel

## Replaceable assets

| Role | Path |
| --- | --- |
| Photography / Photoshop thumbs | `public/assets/photos/` |
| Brand marks (Illustrator) | `public/assets/brand/` |
| Share image | `public/og-image.jpg` |
| Content + series copy | `src/data/brand.ts` |
| Motion timings (AE reference) | `src/components/MotionPreview.tsx` |

Swap image files and update paths in `src/data/brand.ts` — no component rebuild required beyond refresh / rebuild.

## Stack

- React + TypeScript + Vite
- GSAP for motion prototypes
- CSS design tokens (`src/styles/tokens.css`)
