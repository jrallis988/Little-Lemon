# Artistic Fountain

Chronological social utility for comedians — digital green room + open-mic toolkit.

**Against:** algorithms, vanity metrics, ads, rage-bait.  
**For:** local scenes, craft feedback, logistics.

## Stack

- TanStack Start + Vite
- Drizzle ORM + PostgreSQL
- Better Auth
- TanStack Query
- Tailwind CSS v4

## Docs

- [Architecture](./docs/ARCHITECTURE.md)
- [Schema reference](./docs/SCHEMA.md)
- Drizzle source: `src/db/schema/core.ts`

## Quick start

```bash
npm install
cp .env.example .env.local
# set DATABASE_URL + BETTER_AUTH_SECRET
npm run db:push
npm run dev
```

App: [http://localhost:3000](http://localhost:3000)

## Routes

| Path | Purpose |
|------|---------|
| `/` | Landing |
| `/feed` | Chronological feed |
| `/mics` | Open mic / show board |
| `/lab` | Material Lab |
| `/rooms` | Regional Green Rooms |
| `/messages` | DMs |
| `/u/$username` | Digital green-room profile |
| `/settings` | Scene + safety settings |

## Product invariants

1. Feed sort is always `created_at DESC`
2. Public payloads never include follower/like/view counts
3. Verification is identity / venue / booker safety only
