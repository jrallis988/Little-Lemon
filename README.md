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

- Academic search: shared grades 1–8+ corpus + OpenAlex merge + EBSCO Refine Results
- Classroom topic packs on Explore (weather, fractions, civil rights, reefs, etc.)
- Ask Milo with conversation memory + tutor quick actions
- Always-on reader: Tauri fetch → Jina live reader → structured fallback
- Research projects: compare sources, outline builder, export bibliography
- Grade-aware student profiles (1–12)
- Family/school ops: class codes, roster join, printable child reports
- Browser tab strip scaffolding (toward native tabs)
- URL interceptor: allowlist + blocklist + expanded content-farm blocking
- Parent dashboard + session timer + PBKDF2 PIN gate

## Ask Milo setup

**Desktop (preferred):** set a process env var before launching Surf so the Rust
backend can call the model — the key never enters the Vite bundle:

```bash
export SURF_AI_API_KEY=sk-...
# optional: SURF_AI_PROVIDER=anthropic|openai
npm run tauri:dev
```

**Web/dev fallback only:** copy `.env.example` to `.env` and set
`VITE_SURF_AI_API_KEY` for Vite-only previews. Prefer the desktop env path for
family installs.

Without a key, Milo still runs in offline tutor mode.

## First-run parent setup

Surf blocks the app until a parent creates a PIN (4–8 digits). Common defaults
like `0000` / `1234` are rejected. Legacy installs that still have the old demo
PIN are prompted to set a new one.

## Default parent PIN

None. Parents must create a PIN on first launch.

## Develop (web)

```bash
npm install
npm run dev
```

## Develop (desktop)

Requires Rust toolchain + platform Tauri dependencies.

```bash
npm install
export SURF_AI_API_KEY=sk-...   # optional live Milo
npm run tauri:dev
```

## Signing (family beta)

Packaged installs need platform code signing before wide distribution:

- **macOS:** Apple Developer ID + notarization (`APPLE_ID`, `APPLE_PASSWORD`, `APPLE_TEAM_ID`)
- **Windows:** Authenticode certificate via `tauri build` / signtool

Unsigned local builds are fine for internal pilots.

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
  src/commands/   Tauri IPC (academic_search, ask_milo, fetch_article, PIN, store)
```
