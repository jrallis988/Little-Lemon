# OJ — Only Jokes

**Unfiltered stand-up, raw road work, and animated comedy without corporate censorship.**

Creator-subscription comedy platform for stand-ups, comedy animators, and fans. Chronological discovery. Direct tips. Locked supporter tiers for full specials, writing-lab audio, and exclusive shorts.

## Stack

- TanStack Start + Vite
- Cloudflare Workers
- Tailwind CSS v4
- Drizzle schema retained for later persistence
- Mock creator/monetization data for UI shell

## Core views

| Route | Purpose |
|-------|---------|
| `/` | Brand landing |
| `/discover` | Chronological public discovery feed |
| `/c/$username` | Creator profile (public + locked tiles) |
| `/messages` | Backstage DMs (stub) |
| `/settings` | Account / creator settings (stub) |

## Component map

```
src/components/
  brand/Logo.tsx
  layout/AppShell.tsx          # header + mobile bottom nav
  feed/DiscoveryFeed.tsx
  feed/ContentTile.tsx         # feed + grid variants
  media/MediaStage.tsx         # video/audio/animation stage + frost lock
  monetization/TipBar.tsx
  monetization/UnlockSheet.tsx # subscribe + tip bottom sheet
  profile/CreatorProfile.tsx
  ui/Avatar.tsx
```

## Aesthetic

Brand palette from the OJ mark: vibrant sky blue (`#00AFF0`), pastel tint (`#BEE1F9`), and crisp white (`#FFFFFF`). Bebas Neue display + Space Grotesk UI.

## Develop

```bash
npm install
npm run dev
```

## Deploy (Cloudflare)

```bash
npm run deploy
# or temporary preview:
npm run build && npx wrangler deploy --temporary
```
