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

Place final exports under `public/assets/` (copied to `dist/assets/` on build):

```
public/assets/
  photography/     # artist + atmosphere stills
  graphics/        # Illustrator / Photoshop social frames
  textures/        # grain, hatch, halftone
  motion/          # AE stills or Lottie if needed
```

Update paths in `src/data/campaign.ts` and wire `<img>` slots inside the post/artist components when ready. Template regions are labeled with `data-label` attributes for easy targeting.

## Note

AMPLIFY is a self-initiated fictional portfolio project — not a real client or festival.
