# Surf

Production-oriented **educational desktop browser** for students, parents, teachers, and schools.

Surf is search-first and education-first — not a content feed, launcher, or game hub.

## Brand

- Logo: orange surfboard + lowercase `surf`
- Palette: `#234197` · `#288CC1` · `#5F9ED1` · `#8C6DE6` · `#F7921E` → `#F25C1D` · `#F3EFE6`
- Tagline: Search first. Learn safely. Ride curiosity.

## Stack

- Desktop: **Tauri v2** (multiwebview + native URL interception)
- Frontend: React 18 + TypeScript + Vite + Tailwind
- State: Zustand (+ LocalStorage persistence)
- Search: live DuckDuckGo HTML parse + educational ranking (native)

## V1 status (this branch)

### Done / in progress
1. **Live browsing** — native content webviews, tabs, back/forward/reload
2. **Educational search** — real network search + trust scoring (desktop app required)
3. **Native URL protection** — `on_navigation` / `on_new_window` cancel before paint
4. **Browser chrome** — tabs (DnD), address bar, nav controls, menu, AI panel shell
5. **Projects + citations** — local persisted projects; APA/MLA/Chicago/Harvard/BibTeX formatters
6. **Analytics** — real counters only (no seeded charts)
7. **Parent controls** — PIN gate + whitelist sync into native filter state

### Still ahead
- Full AI reading assistant provider wiring (`SURF_AI_API_KEY`)
- Downloads manager, find-in-page, print polish, context menus
- Encrypted parent Stronghold/keychain migration hardening
- Accessibility CI + dyslexia/ruler/voice reading
- Signed Windows/macOS/Linux installers + auto-update
- Broader unit/integration/E2E coverage

## Develop

```bash
npm install
npm run dev          # chrome UI only; search requires desktop
npm run tauri:dev    # full browser (Rust toolchain required)
```

Initial parent PIN (change immediately): `0000`

## Verify

```bash
npm run typecheck
npm run build
cd src-tauri && cargo check
```
