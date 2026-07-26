# Vibe

A personality-driven social platform **for teens ages 13–17**, where every user gets a highly customizable profile page — themes, music, photos, blogs, Featured Friends, and more.

Temporary product name: **Vibe** (centralized in `src/lib/constants.ts` for easy renaming). Audience range: `AGE_MIN` / `AGE_MAX` (13–17).

## Stack

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS
- Lucide icons
- Supabase (auth, database, storage) with local mock-data fallback

## Folder structure

```
src/
  app/                 # Routes (landing, auth, home, profile, social pages)
  components/
    auth/              # Login, signup, onboarding forms
    blog/              # Blog cards
    feed/              # Status composer + activity feed
    friends/           # Friend requests + lists
    landing/           # Public marketing sections
    layout/            # AppHeader, MobileNavigation, AppShell
    messages/          # Conversations + threads
    notifications/     # Notification items
    profile/           # Profile page modules + ThemeEditor
    ui/                # Shared primitives
  lib/
    auth/              # AuthProvider (mock + Supabase-ready)
    constants.ts       # PLATFORM_NAME and shared limits
    mock/              # Demo users + client store (localStorage)
    supabase/          # Browser/server clients + config detection
    themes/            # Presets + sanitization (no unsafe CSS/JS)
    types/             # Database models
    utils/             # cn, contrast, date helpers
supabase/
  schema.sql           # Tables, enums, indexes
  rls-policies.sql     # Row Level Security recommendations
```

## Quick start (mock mode)

No Supabase credentials required.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Demo account

| Field    | Value             |
|----------|-------------------|
| Email    | `nova@example.com` |
| Password | `demo1234`         |

All sample users use password `demo1234`. Mock mode auto-signs in as Nova for smoother browsing; use Log out / Sign in to switch accounts.

## Supabase setup (optional)

1. Create a Supabase project.
2. Copy `.env.example` → `.env.local` and set:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. In the SQL editor, run:
   - `supabase/schema.sql`
   - `supabase/rls-policies.sql`
4. Create storage buckets: `avatars`, `headers`, `photos`, `audio` (public read + authenticated write recommended with path-scoped policies).
5. Restart `npm run dev`.

When credentials are present, `isSupabaseConfigured()` returns true. Wire auth/data calls through `src/lib/supabase/client.ts` while keeping the mock store as a development fallback.

## Scripts

```bash
npm run dev        # development server
npm run build      # production build
npm run start      # serve production build
npm run lint       # ESLint
npm run typecheck  # TypeScript
```

## Features

- Customizable profiles with preset themes (Classic Blue, Midnight, Bubblegum, Grunge, Pop Star, Indie, Goth, Y2K, Minimal, Custom)
- Live theme editor with contrast warnings and sanitized CSS variables (no arbitrary JS/HTML)
- Featured Friends (4 / 8 / 12 / 16) — not labeled “Top 8”
- Profile music player that never autoplays on first load
- Friends, messaging, browse/search, blog, notifications, settings & privacy
- Safety primitives: block, report, mute, moderation status, content warnings
- Accessibility: skip link, semantic HTML, focus states, form labels, reduced motion

## Notes

- Profile customization settings are sanitized in `src/lib/themes/sanitize.ts`.
- Public profile payloads never include email or passwords.
- Placeholder avatars use DiceBear; photos use Picsum; audio uses SoundHelix demo MP3s.
