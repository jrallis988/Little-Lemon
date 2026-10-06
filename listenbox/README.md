# Listenbox

**Portfolio concept** — Letterboxd for music. Log albums, rate them, write short reviews, and follow what friends are spinning.

This is a design/engineering case study, not a live production app. Demo auth, seed social data, and local persistence exist to make the product feel real in a portfolio walkthrough.

Lives in this folder inside the Artistic Fountain repo.

## Stack

- **TypeScript** + **Expo** (SDK 57) + **Expo Router**
- Local demo auth via AsyncStorage (no production backend)
- Seed social feed + MusicBrainz catalog search for the demo

## Run

```bash
cd listenbox
npm install
npm run web      # browser
# npm start    # Expo Dev Tools / device
npm run typecheck
npm run smoke:web   # Playwright end-to-end against localhost:8081
```

## What's in this scaffold

| Area | Status |
| --- | --- |
| Auth shell | Sign in with display name + email; session persisted locally |
| Domain models | `User`, `Album`, `AlbumLog`, `FeedItem` in `types/models.ts` |
| Social feed | Seed listens from friends on the Feed tab |
| Catalog search | MusicBrainz release-group search + Cover Art Archive images |
| Log a listen | Search or pick suggestion → rate → review → like → save |
| Local persistence | Auth, user logs, and searched albums via AsyncStorage |
| Profile | Your stats, diary, clear local listens, sign out |

## Next up

- Real auth (Clerk / Supabase)
- Spotify listen history import
- Follow graph + activity API
- Sync persistence to a real backend
