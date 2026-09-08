# AMPLIFY — Instagram Campaign Case Study

Fictional portfolio project: Instagram-native campaign system for **AMPLIFY**, a contemporary three-day music festival. Campaign concept: **TURN IT UP.**

## Stack

React · TypeScript · Vite · GSAP (motion prototypes) · Semantic HTML · Modern CSS

## Develop

```bash
cd amplify
npm install
npm run dev
```

## Build

```bash
cd amplify
npm run build
```

Built files land in `amplify/dist/` and are linked from the portfolio at `/amplify/dist/`.

## Replacing placeholder artwork

Editorial SVG stand-ins ship in `public/assets/`. Drop finished exports with the **same filenames** (JPG/PNG preferred for photography) and update the extension in `src/components/PhotoSlot.tsx` helpers if needed — or keep `.svg` and overwrite the files.

```
public/assets/
  photography/     # artist-echo, artist-nova, crowd-wide, crowd-night, …
  graphics/        # logo-wordmark, campaign-wordmark, festival-map
  textures/        # hatch, frequency-bars
  motion/          # AE stills / Lottie (optional)
```

`photoSlot` values in `src/data/campaign.ts` map 1:1 to photography filenames.

### Export checklist (Photoshop / Illustrator / Figma / AE)

**Feed (9)** — 1080×1080 and 1080×1350  
1. Festival announcement · 2. TURN IT UP. · 3. Artist · 4. Headliner · 5. Lineup · 6. Tickets · 7. Info · 8. Countdown · 9. Finale  

**Artist system** — Headliner / Featured / Emerging frames for each performer  

**Carousels** — 8 lineup + 8 info (4:5) · map → `festival-map`  

**Stories** — 8 concepts at 1080×1920 (safe-area aware)  

**Motion** — 15s Reel + LOUD/LIVE/TOGETHER type sequence in AE/Premiere  

## Note

AMPLIFY is a self-initiated fictional portfolio project — not a real client or festival.
