# Listenbox

Letterboxd for music — log albums, rate them, write short reviews, and follow what friends are spinning.

Scaffold lives in this folder inside the Artistic Fountain repo.

## Stack

- **TypeScript** + **Expo** (SDK 57) + **Expo Router**
- Local scaffold auth via AsyncStorage (no backend yet)
- In-memory album catalog + seed social feed

## Run

```bash
cd listenbox
npm install
npm run web      # browser
# npm start    # Expo Dev Tools / device
```

## What's in this scaffold

| Area | Status |
| --- | --- |
| Auth shell | Sign in with display name + email; session persisted locally |
| Domain models | `User`, `Album`, `AlbumLog`, `FeedItem` in `types/models.ts` |
| Social feed | Seed listens from friends on the Feed tab |
| Log a listen | Pick album → rate → review → like → save to feed + diary |
| Profile | Your stats, diary, sign out |

## Next up

- Real auth (Clerk / Supabase)
- MusicBrainz / Discogs catalog search
- Spotify listen history import
- Follow graph + activity API
