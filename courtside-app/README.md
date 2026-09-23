# COURTSIDE (source)

Vite + React source for the COURTSIDE case study.

**Published site:** `../courtside/` (served at `/courtside/`)

## Develop

```bash
# from repo root
npm run dev:courtside
```

## Build (publishes to /courtside/)

```bash
# from repo root
npm run build:courtside
```

### Absolute share URLs (after you know the live domain)

```bash
COURTSIDE_SITE_URL=https://jrallis988.github.io/Little-Lemon/courtside npm run build:courtside
```

Or copy `.env.example` → `.env` and set `COURTSIDE_SITE_URL`.

## Replaceable assets

| Role | Path |
| --- | --- |
| Photography | `public/assets/photos/` |
| Brand marks | `public/assets/brand/` |
| Motion reel | `public/assets/motion/courtside-reel.mp4` |
| Share image | `public/og-image.jpg` |
| Content data | `src/data/brand.ts` |
