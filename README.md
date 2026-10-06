# StaticVolume

Mobile-native artist discovery and social taste logging — a genre-agnostic spiritual successor to PureVolume, shaped like **Letterboxd for music**.

**Portfolio piece** — designed to be shown in a case study, not operated as a live website or store app. `npx expo start --web` with seed data is the intended reviewer path. Supabase migrations document how a real backend would attach; they are optional.

Built with **Expo (SDK 57)**, **Expo Router**, **Supabase**, **Zustand**, and **TanStack Query**.

StaticVolume is **not a music player**. It’s where you **find unsigned bands and brand-new musicians** *and* look up **contemporary catalog artists** (Olivia Rodrigo, Black Veil Brides, Weird Al, …) — the Spotify-era coverage target (~2010–present). Then log tracks, write reviews, keep lists. Artists get downloads and reposts.

## Persistent context

- **`PROJECT.md`** — full product vision, PureVolume history, aesthetic, pillars
- **`.cursorrules`** — hard rules for Cursor (no player, portal UI, timeline required)

Read those before changing layout or product surfaces.

## Catalog + search

| Surface | What it does |
| --- | --- |
| **Search** (header) | Facets: All · Artist · Song · Genre |
| **Artists** | A–Z directory + quick filter; link to full search |
| **Find** | Brand-new / unsigned stumble-upon lane |
| **Open on Spotify** | Catalog artist/track pages hand listening to Spotify (deep links). Add to Spotify = in-Spotify save hand-off until OAuth. |
| **Artist Studio** | Phase 2 upload UI (`/(main)/studio`) — audio, artwork, bio, releases → Supabase Storage + Postgres (after migration). |
| **Spotify sync** (later) | Metadata ingest via `EXPO_PUBLIC_SPOTIFY_CLIENT_ID` + backend token route — no Spotify audio. |

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
npx expo start --web
```

Env keys in `.env.example` are **optional**. Without them, seed catalog + local taste state still tell the full product story. Fill `EXPO_PUBLIC_SUPABASE_*` only if you want to exercise the wired auth/upload/persistence path.

## Auth notes

Signup stores `display_name` and `role` (`artist` | `listener`) in Supabase Auth user metadata. The Phase 2 migration also creates a `profiles` row via trigger. Session persistence uses SecureStore on native and AsyncStorage on web.

## Artist uploads (Phase 2) — optional live path

Schema + Studio UI are in the repo to show ownership, Storage, and copyright confirmation. For the portfolio demo, Studio still presents the upload IA without a live bucket.

If you do wire Supabase: apply `supabase/migrations/20260328000000_phase2_artist_uploads.sql`, sign in as **artist**, open **You → Open artist studio**.

Limits: audio ≤ 50MB; images ≤ 5–8MB. Artists can only mutate their own Storage paths (`{userId}/…`) and rows (RLS).

## Taste persistence (Phase 3) — optional live path

Log / rate / review / follow / download / repost work in-session via Zustand. The SQL + `lib/tasteApi.ts` show how those actions persist when Supabase is configured.

If you do wire it: apply `supabase/migrations/20260328120000_phase3_taste_persistence.sql` after Phase 2.

## Visual identity

Light PureVolume-style portal: white / `#F0F0F0` surfaces, black header, blue links, Barlow / Barlow Condensed — editorial discovery with Letterboxd-style social taste, not streaming-app chrome.
