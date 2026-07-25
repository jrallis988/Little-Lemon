# StaticVolume

Mobile-native artist discovery and direct-to-fan distribution — a genre-agnostic spiritual successor to PureVolume.

Built with **Expo (SDK 57)**, **Expo Router**, **Supabase**, **Zustand**, and **TanStack Query**.

## Stack

| Layer | Choice |
| --- | --- |
| Platform | iOS & Android via Expo |
| Language | TypeScript (strict) |
| Routing | Expo Router (file-based) |
| Audio | Expo AV (background + lockscreen ready) |
| Motion | React Native Reanimated |
| Backend | Supabase (Auth, Postgres, Storage, Realtime, Edge Functions) |
| Client state | Zustand |
| Server state | TanStack Query |

## Project structure

```
app/
├── (auth)/          # login, signup (artist | listener)
├── (main)/          # editorial, explore, following, profile + tab shell
├── artist/[id].tsx  # EPK profile
└── track/[id].tsx   # waveform + timestamped comments
components/
├── audio/           # GlobalAudioBar, WaveformPlayer
└── ui/              # StaticBackground, BandCard
store/               # useAudioStore, useUserStore
lib/                 # supabase client, demo data
constants/theme.ts   # warm off-black palette + SpaceMono type
```

## Social model (MVP rules)

- **No likes / hearts** — engagement is Downloads and Reposts; play counts stay private to artists.
- **Comments**: public, waveform-timestamped, artist-moderated.
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

Warm off-black canvases, CRT phosphor amber accents, Space Mono typography, grain/scanline overlays, and analog-style waveforms — never Spotify green or glassmorphism.
