# StaticVolume — Project Context

Cursor (and humans) should treat this file as the source of truth for product vision.

## Concept

We are building a **modern spiritual successor to PureVolume** — the early-2000s indie music discovery portal — plus a **Letterboxd-for-music** social layer.

PureVolume (launched Thanksgiving Eve **2003** by Unborn Media / UMass founders) was a magazine-with-sound: editorial mosaic homepage, artist profiles, downloads, community, human curation (**PurePicks**), no algorithmic feed bloat. It helped surface acts that labels then signed (e.g. Gym Class Heroes → Fueled by Ramen). Acquired by SpinMedia (**2010**), sold to Hive Media (**2016**), music service shut down (**2018**).

**StaticVolume** picks up that portal DNA for the present: discover unsigned / brand-new bands *and* look up contemporary catalog artists, then **log · rate · review · list** them socially.

## Product test

Every feature must help someone **discover an artist, understand an artist, support an artist, or express their own music taste.** If it mainly rebuilds a streaming service or engagement-driven social network, do not add it.

## What we are NOT

- **Not a music player / streaming app.** No sticky Now Playing bar, no waveform transport, no Expo AV queue, no embedded Spotify player, no playback chrome.
- Engagement for independent artists is **Downloads + Reposts**. No likes-on-tracks. Play counts stay private (artists may see their own analytics later).
- Catalog music = **metadata + discovery**; listening hands off to outbound services (Spotify).
- Featured / Just Found = **human editorial curation**, not engagement algorithms.
- Artist ↔ fan DMs only after meaningful support (download or repost) — enforce in the database when messaging ships.

## Aesthetic

- **PureVolume portal structure:** black header chrome, light gray/white body (`#F0F0F0` / white), blue links (`#1A6DB5`), featured mosaic, segmented toolbar, bordered dossier boxes, A–Z directory.
- **Type:** Barlow / Barlow Condensed — clean portal sans (not Space Mono / CRT amber unless explicitly revived).
- **Layout:** structured early-2000s web utility — clear section dividers, grid/mosaic, high-information rows. Avoid modern “AI SaaS” purple gradients, glassmorphism, and dashboard clutter in the hero.
- Spotify green is reserved for **outbound** Open/Add on Spotify CTAs only — never paint the whole product like Spotify.

## Product pillars

1. **Find** — unsigned / brand-new friend-group bands (stumble-upon energy).
2. **Catalog search** — artist · song · genre; coverage target ≈ Spotify-scale contemporary (~2010–present) plus living catalog acts.
3. **Artists A–Z** — directory + search hybrid (usable at hundreds/thousands of artists).
4. **Letterboxd layer** — diary log, ratings, reviews, lists, chronological Following activity (no ranking algorithm).
5. **History / Timeline** — PureVolume founding → StaticVolume present (first-class chrome).

## Development phases (priority order)

Do **not** build these in parallel. Ship in order:

| Phase | Focus |
| --- | --- |
| **1 — Spotify outbound** | Open on Spotify (+ Add to Spotify via supported hand-off / later OAuth). Catalog pages hand listening to Spotify. |
| **2 — Artist uploads** | Supabase Storage + DB for audio, artwork, bios, release metadata; ownership RLS; progress/errors/limits. |
| **3 — Persist taste** | Logs, ratings, reviews, lists, follows, downloads, reposts → Supabase (Zustand = temp UI only). |
| **4 — Catalog + search** | Spotify/MusicBrainz **metadata** ingest (no Spotify audio). DB-backed search across catalog + uploads. |
| **5 — Discovery** | Find filters (Unsigned / New / Recently Joined / Genre) + Featured / Just Found from real DB + editorial tools. |
| **6 — Profiles & activity** | Artist archive pages, listener profiles/diaries, chronological Following feed. |
| **7 — Trust & scale** | ToS, privacy, upload/copyright policies, reporting/takedown, admin disable without destroy, loading/empty/error states, large-catalog mobile UX. |

**Later (after core):** notifications, shows/gigs, artist wall (needs moderation).

## Tech stack

Expo SDK 57 · Expo Router · TypeScript · Supabase · Zustand · TanStack Query.

## Demo vs production

Scaffold still uses rich demo/seed data for Find + catalog. Supabase auth is wired. Phase 1 outbound Spotify deep links are live on catalog artist/track pages (`lib/spotify.ts`, `components/spotify/SpotifyOutboundActions.tsx`). Prefer extending existing patterns over inventing parallel design systems.

## Artwork & media sources

- **Catalog:** iTunes Search API / Cover Art Archive where terms permit; Spotify IDs for outbound links only.
- **Emerging:** artist uploads (Phase 2) or Unsplash placeholders — not claimed as press photos.
- **Do not** scrape Google Images, proxy/host Spotify audio, or rip fan sites.
