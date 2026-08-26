# APEX Hockey — RELEASE FASTER.

Self-initiated fictional sports marketing case study for Artistic Fountain.

APEX Hockey is not a real client. Do not imply real campaign performance or brand affiliation.

## Stack

React · TypeScript · Vite · modern CSS · GSAP (motion prototypes only)

## Develop

```bash
npm run dev:apex
# or
cd apex-hockey && npm run dev
```

## Build

```bash
npm run build:apex
```

Static output lands in `apex-hockey/site/` and is linked from the portfolio home.

## Replacing artwork

1. Drop final photography / logo / posters into `apex-hockey/public/assets/`
2. Update paths in `src/data/content.ts`
3. Rebuild — section structure does not need to change

CSS color tokens live in `src/styles/tokens.css` for palette swaps from Illustrator/Figma.
