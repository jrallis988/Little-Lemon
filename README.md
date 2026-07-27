# StaticVolume

Mobile-native artist discovery and social taste logging — a genre-agnostic spiritual successor to PureVolume, shaped like **Letterboxd for music**.

Built with **Expo (SDK 57)**, **Expo Router**, **Supabase**, **Zustand**, and **TanStack Query**.

StaticVolume is **not a music player**. It’s where you **find unsigned bands and brand-new musicians** *and* look up **contemporary catalog artists** (Olivia Rodrigo, Black Veil Brides, Weird Al, …) — the Spotify-era coverage target (~2010–present). Then log tracks, write reviews, keep lists. Artists get downloads and reposts.

## Catalog + search

| Surface | What it does |
| --- | --- |
| **Search** (header) | Facets: All · Artist · Song · Genre |
| **Artists** | A–Z directory + quick filter; link to full search |
| **Find** | Brand-new / unsigned stumble-upon lane |
| **Spotify sync** (stub) | `lib/spotify.ts` + `EXPO_PUBLIC_SPOTIFY_CLIENT_ID` for full catalog ingest |

Demo seed includes emerging friend-group acts **and** a slice of recognizable contemporary catalog. Full Spotify-scale sync is the backend follow-up.

## Product model

| Letterboxd / PureVolume | StaticVolume |
| --- | --- |
| Stumble on a new film / unsigned band | **Find** — brand-new & unsigned artists by scene + place |
| Log a film | Log a track |
| Stars + review | Stars + review |
| Lists | Ranked / unranked track lists |
| Activity / following | Chronological diary activity feed |
| Films catalog | Artists A–Z + scene/geography discovery |
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
├── (main)/          # home, artists, find, activity, profile
├── artist/[id].tsx  # artist archive / EPK
└── track/[id].tsx   # log · rate · review · download · repost
components/
├── discovery/       # just-found / unsigned find cards
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

- **Find unsigned / brand-new bands** — friend groups and independent acts, filterable by scene + place.
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
