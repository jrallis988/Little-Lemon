# StaticVolume

Mobile-native artist discovery and social taste logging — a genre-agnostic spiritual successor to PureVolume, shaped like **Letterboxd for music**.

Built with **Expo (SDK 57)**, **Expo Router**, **Supabase**, **Zustand**, and **TanStack Query**.

StaticVolume is **not a music player**. You log tracks, write reviews, keep lists, and follow people’s taste. Artists still get downloads and reposts.

## Product model

| Letterboxd | StaticVolume |
| --- | --- |
| Log a film | Log a track |
| Stars + review | Stars + review |
| Lists | Ranked / unranked track lists |
| Activity / following | Chronological diary activity feed |
| Films catalog | Artists + scene/geography discovery |
| — | Downloads + reposts (artist D2F signal) |

No in-app streaming queue, waveforms, or sticky player.

## Stack

| Layer | Choice |
| --- | --- |
| Platform | iOS & Android via Expo |
| Language | TypeScript (strict) |
| Routing | Expo Router (file-based) |
| Backend | Supabase (Auth, Postgres, Storage, Realtime, Edge Functions) |
| Client state | Zustand (`useUserStore`, `useTasteStore`) |
| Server state | TanStack Query |

## Project structure

```
app/
├── (auth)/          # login, signup (artist | listener)
├── (main)/          # home, artists, scene, activity, profile
├── artist/[id].tsx  # artist archive / EPK
└── track/[id].tsx   # log · rate · review · download · repost
components/
├── editorial/       # portal header, mosaic, charts
├── directory/       # A–Z artist directory
├── social/          # activity, reviews, lists, ratings
├── tracks/          # discovery track listings
└── ui/
store/               # useUserStore, useTasteStore
lib/                 # supabase client, demo data
constants/theme.ts   # PureVolume light portal palette + Barlow
```

## Social model (MVP rules)

- **Log / rate / review / list** — listener taste (Letterboxd layer).
- **Download / repost** — public support for artists (PureVolume layer).
- **No likes on tracks** — review likes are social only; play counts stay private.
- **No in-app music player**.
- **Feeds**: chronological activity + human-curated editorial home (no algorithmic feed).
- **Discovery**: scene + geography filters. No global verified badges.

## Getting started

```bash
npm install
cp .env.example .env
# fill EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY
npx expo start
```

## Auth notes

Signup stores `display_name` and `role` (`artist` | `listener`) in Supabase Auth user metadata. Session persistence uses SecureStore on native and AsyncStorage on web.

## Visual identity

Light PureVolume-style portal: white / `#F0F0F0` surfaces, black header, blue links, Barlow / Barlow Condensed — editorial discovery with Letterboxd-style social taste, not streaming-app chrome.
