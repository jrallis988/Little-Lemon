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
- [x] Motion sequence demo + AE reel drop-in slot
- [x] Absolute OG URL support via `COURTSIDE_SITE_URL` at build time
- [ ] Merge PR and deploy host
- [ ] Set `COURTSIDE_SITE_URL` to your live case-study URL, rebuild, redeploy
- [ ] Smoke-test live: photos, compare tool, motion sequence, mobile nav
- [ ] Optional: drop `public/assets/motion/courtside-reel.mp4` (AE → Premiere export)
- [ ] Optional: replace generated photos / logo with Photoshop + Illustrator exports

### Absolute share URLs

```bash
# example
COURTSIDE_SITE_URL=https://yourdomain.com/courtside/dist npm run build
```

See `.env.example`.

## Replaceable assets

| Role | Path |
| --- | --- |
| Photography / Photoshop thumbs | `public/assets/photos/` |
| Brand marks (Illustrator) | `public/assets/brand/` |
| Motion reel (AE → Premiere) | `public/assets/motion/courtside-reel.mp4` |
| Share image | `public/og-image.jpg` |
| Content + series copy | `src/data/brand.ts` |
| Motion timings (AE reference) | `src/components/MotionPreview.tsx` |

Swap image files and update paths in `src/data/brand.ts` — no component rebuild required beyond refresh / rebuild.

## Stack

- React + TypeScript + Vite
- GSAP for motion prototypes
- CSS design tokens (`src/styles/tokens.css`)
