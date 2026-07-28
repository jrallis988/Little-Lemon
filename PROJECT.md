# StaticVolume — Project Context

Cursor (and humans) should treat this file as the source of truth for product vision.

## Concept

We are building a **modern spiritual successor to PureVolume** — the early-2000s indie music discovery portal — plus a **Letterboxd-for-music** social layer.

PureVolume (launched Thanksgiving Eve **2003** by Unborn Media / UMass founders) was a magazine-with-sound: editorial mosaic homepage, artist profiles, downloads, community, human curation (**PurePicks**), no algorithmic feed bloat. It helped surface acts that labels then signed (e.g. Gym Class Heroes → Fueled by Ramen). Acquired by SpinMedia (**2010**), sold to Hive Media (**2016**), music service shut down (**2018**).

**StaticVolume** picks up that portal DNA for the present: discover unsigned / brand-new bands *and* look up contemporary catalog artists, then **log · rate · review · list** them socially.

## What we are NOT

- **Not a music player / streaming app.** No sticky Now Playing bar, no waveform transport, no Expo AV queue, no Spotify-green chrome.
- Engagement for artists is **Downloads + Reposts**. Play counts stay private.
- No likes-on-tracks algorithmic vanity. No verified-badge arms race.

## Aesthetic

- **PureVolume portal structure:** black header chrome, light gray/white body (`#F0F0F0` / white), blue links (`#1A6DB5`), featured mosaic, segmented toolbar, bordered dossier boxes, A–Z directory.
- **Type:** Barlow / Barlow Condensed — clean portal sans (not Space Mono / CRT amber unless explicitly revived).
- **Layout:** structured early-2000s web utility — clear section dividers, grid/mosaic, high-information rows. Avoid modern “AI SaaS” purple gradients, glassmorphism, and dashboard clutter in the hero.

## Product pillars

1. **Find** — unsigned / brand-new friend-group bands (stumble-upon energy).
2. **Catalog search** — artist · song · genre; coverage target ≈ Spotify-scale contemporary (~2010–present) plus living catalog acts; demo seed now, Spotify sync later.
3. **Artists A–Z** — directory + search hybrid (type when you know the name; letters when browsing).
4. **Letterboxd layer** — diary log, ratings, reviews, lists, chronological activity feed.
5. **History / Timeline** — interactive page documenting PureVolume’s founding era → operational shifts → shutdown → StaticVolume present. This is first-class product chrome, not a footer footnote.

## Timeline feature (required)

Include a dedicated **History** timeline that maps:

- Prehistory / Unborn Media
- 2003 beta launch & PurePicks editorial culture
- Mid-2000s discovery era (emo / pop-punk / indie breakouts)
- 2010 SpinMedia acquisition
- 2016 Hive Media sale
- 2018 shutdown
- StaticVolume revival: portal + taste logging + unsigned finds + catalog lookup

UI: vertical portal timeline with year markers, bordered era cards, clear dividers — tactile archive, not a minimalist scroll joke.

## Tech stack

Expo SDK 57 · Expo Router · TypeScript · Supabase · Zustand · TanStack Query.

## Demo vs production

Scaffold uses rich demo data. Supabase auth is wired. Spotify catalog sync is stubbed (`lib/spotify.ts`). Prefer extending existing patterns over inventing parallel design systems.


## Artwork & leaving demo stage

### Legal image sources we use
- **Catalog artists/songs:** album artwork via **iTunes Search API** (Apple CDN) and **Cover Art Archive** / MusicBrainz (e.g. Brat, Flower Boy, Currents).
- **Emerging / fictional unsigned acts:** **Unsplash** atmospheric music photos as placeholders — not claimed as press photos of those bands.
- **Do not** scrape Google Images, Spotify without API terms, or fan-site rips.

### Path off demo stage
1. **Artist uploads** — Supabase Storage for unsigned press photos + track art (source of truth for Find lane).
2. **Spotify / MusicBrainz sync** — pull `images` + album art for catalog coverage (~2010–present).
3. **Persist URLs** on `artists.avatar_url` / `tracks.artwork_url` in Postgres (stop hardcoding seeds).
4. Wire real **download / repost / log** writes so the UI isn’t demo-only.

Until (1)+(2) ship, seeded CDN artwork is the bridge out of letter-monogram placeholders.
