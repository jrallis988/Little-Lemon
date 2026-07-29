# Surf

Child-safe, minimalist, **search-first** educational web browser for families and schools.

Surf is not a content feed, launcher, or game hub. Kids search, open curated educational sources, and read in a calm distraction-free environment — while parents keep the guardrails.

## Brand

- **Logo:** orange surfboard mark + lowercase `surf` wordmark
- **Palette:** deep blue `#234197`, ocean `#288CC1`, sky `#5F9ED1`, violet glow `#8C6DE6`, board orange `#F7921E` → `#F25C1D`, foam `#F3EFE6`
- **Tagline:** Search first. Learn safely. Ride curiosity.

## Stack

- **Desktop:** Tauri v2 (native OS webview + Rust backend)
- **Frontend:** React 18 + TypeScript + Vite
- **UI:** Tailwind CSS + shadcn-style primitives
- **State:** Zustand + LocalStorage persistence

## Core screens

1. Home — search-only
2. Search Results — curated 6–8 results
3. Article / Reader Mode
4. Explore
5. Explore Drill-Down (`/explore/:categoryId`)
6. Learning Mode Overlay
7. Blocked Site
8. Break / Time Limit
9. Profile + accessibility
10. Parent Control Dashboard (PIN-gated)

## Supporting systems

- Academic search index + EBSCO-style tier filtering (`src-tauri/src/academic` + `src/services/academicSearch.ts`)
- Ask Milo learning aide (`src/components/learning/AskMiloPanel.tsx`) — explains topics, vocabulary, and citations
- URL interceptor / whitelist middleware (`src/services/urlFilter.ts` + Rust `check_url`)
- Background session timer worker (`src/services/sessionTimer.ts`)
- Cryptographic parent gate (PBKDF2 PIN hashing)
- Navigation history stack + Tauri IPC bridge

## Develop (web)

```bash
npm install
npm run dev
```

## Develop (desktop)

Requires Rust toolchain + platform Tauri dependencies.

```bash
npm install
npm run tauri:dev
```

## Default parent PIN

`0000` (change immediately in Parent Dashboard)

## Project map

```
src/
  brand/          Logo palette + biography + Ask Milo identity
  components/     UI + shell + Learning Mode + Ask Milo panel
  data/           Explore categories
  hooks/          Session timer, URL interceptor, a11y
  routes/         React Router wiring for all 10 screens
  screens/        One module per core screen
  services/       Academic search, filter, timer, PIN, sanitizer, Tauri bridge
  stores/         Zustand: profile, parent, session, nav, safety
  types/          Shared domain types (including academic search schema)
src-tauri/
  src/academic/   EBSCO-style index, allowlist, grade/tier filters, search API
  src/commands/   Tauri IPC (academic_search, check_url, PIN, store, window)
```
