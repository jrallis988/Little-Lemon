# StaticVolume

Mobile-native artist discovery and direct-to-fan distribution — a genre-agnostic spiritual successor to PureVolume.

Built with **Expo (SDK 57)**, **Expo Router**, **Supabase**, **Zustand**, and **TanStack Query**.

StaticVolume is **not a music player**. Discovery, downloads, and reposts are the product surface — no sticky player, waveforms, or in-app streaming UI.

## Stack

| Layer | Choice |
| --- | --- |
| Platform | iOS & Android via Expo |
| Language | TypeScript (strict) |
| Routing | Expo Router (file-based) |
| Backend | Supabase (Auth, Postgres, Storage, Realtime, Edge Functions) |
| Client state | Zustand |
| Server state | TanStack Query |

## Project structure

```
app/
├── (auth)/          # login, signup (artist | listener)
├── (main)/          # editorial home, artists, scene, following, profile
├── artist/[id].tsx  # artist archive / EPK
└── track/[id].tsx   # download + repost detail, comments
components/
├── editorial/       # portal header, mosaic, charts
├── directory/       # A–Z artist directory
├── tracks/          # discovery track listings
└── ui/              # StaticBackground, BandCard
store/               # useUserStore
lib/                 # supabase client, demo data
constants/theme.ts   # PureVolume light portal palette + Barlow
```

## Social model (MVP rules)

- **No likes / hearts** — engagement is Downloads and Reposts; play counts stay private to artists.
- **No in-app music player** — tracks link to download/repost pages, not a streaming queue.
- **Comments**: public, artist-moderated.
- **DMs**: artist ↔ fan only, unlocked after download or repost.
- **Feeds**: chronological following + human-curated editorial home (no algorithmic feed).
- **Discovery**: scene + geography filters. No global rankings or verified badges.

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

Light PureVolume-style portal: white / `#F0F0F0` surfaces, black header, blue links, Barlow / Barlow Condensed — editorial discovery, not a streaming app chrome.
