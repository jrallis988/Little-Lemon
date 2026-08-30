# Artistic Fountain — Architecture

**Product:** Artistic Fountain — a social utility for comedians  
**Feel:** digital green room + toolkit, not an influencer feed  
**Stack:** TanStack Start · Vite · Cloudflare Workers · Drizzle · Postgres · Better Auth · TanStack Query

## Philosophy encoded in the product

| We refuse | We build |
|-----------|----------|
| Engagement algorithms | Pure chronological feeds |
| Vanity metrics (followers, likes, views) | Craft surfaces + logistics |
| Sponsored / suggested rage-bait | Local scene discovery |
| Blue-check clout | Identity / venue / booker safety only |
| Performative polish | Fast, lo-fi, functional UI |

## Core domains

1. **Profiles** — digital green rooms (archive, schedule, scene, collab tags)
2. **Posts** — clips, premises, flyers, Material Lab memos
3. **Events** — open mics, showcases, indie rooms (geo board)
4. **Communities** — regional Green Room chats for logistics
5. **Messages** — DMs for spot swaps, rides, coordination

## Feed ranking rule

```
ORDER BY created_at DESC
```

That is the entire ranking function. Filters may narrow by city / region / kind / connections, but never re-score by engagement.

## Directory map

```
docs/
  ARCHITECTURE.md          ← this file
  SCHEMA.md                ← table-by-table reference

src/
  db/
    index.ts               ← drizzle client
    schema/
      core.ts              ← Drizzle tables + enums
      index.ts
  domain/
    invariants.ts          ← product rules (chrono, banned metrics)
    types.ts               ← public DTO shapes (no vanity fields)
  server/
    feed.ts                ← chronological query helpers
    events.ts              ← upcoming mics / shows
  components/
    brand/ layout/ feed/ events/ profile/ lab/ communities/ ui/
  routes/
    index.tsx              ← landing
    feed/index.tsx         ← chronological lineup
    mics/index.tsx         ← open mic / show finder
    lab/index.tsx          ← Material Lab
    rooms/index.tsx        ← regional Green Rooms
    messages/index.tsx
    u/$username.tsx        ← green-room profile
    settings/index.tsx
    api/auth/$.ts          ← Better Auth handler
  lib/auth.ts              ← Better Auth config
  styles.css
```

## Data model snapshot

See `docs/SCHEMA.md` and `src/db/schema/core.ts`.

### Users & profiles
- `user` / `session` / `account` / `verification` — Better Auth
- `profiles` — stage name, home scene, collab tags, safety verification
- `connections` — follow graph **without public counts**

### Posts & Material Lab
- `posts` — `clip | premise | flyer | lab_memo`
- `lab_notes` — peer craft feedback (not likes)

### Shows & mics
- `venues` — rooms; optional verified venue claim
- `events` — timed board sorted by `starts_at`
- `event_signups` — slot claims

### Communities & messaging
- `communities` + `community_members` + `community_messages`
- `conversations` + `conversation_participants` + `direct_messages`

### Safety
- `blocks`, `reports`

## Local-first discovery

Every post/event/profile carries `city` + `region` (and optional lat/lng).  
UI defaults to the user’s home scene, with an explicit toggle for national / following — still chronological.

## Auth

Better Auth (email/password to start). Profiles are created on first sign-in / onboarding. Verification kinds: `identity | venue | booker` only.

## Next build slices

1. Onboarding → create `profiles` row (home scene + collab tags)
2. Feed read path wired to `listChronologicalFeed`
3. Event board + signup
4. Media upload pipeline (audio/video clips + lab voice memos)
5. Regional Green Room chat
6. Mobile PWA shell / later native wrapper
