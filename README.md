# MyPlace

A personality-driven social platform where every profile is a customizable place — themes, music, photos, blogs, featured friends, and status updates — inspired by the expressive spirit of early social networks, built as an original modern product.

Temporary platform name: **MyPlace** (easy to rename later via `NEXT_PUBLIC_APP_NAME`).

## Stack

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS
- Lucide icons
- Supabase-ready auth/storage/database (with local mock-data fallback)

## Quick start

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Demo login (mock mode)

Without Supabase credentials, the app runs entirely on local mock data:

| Field    | Value               |
|----------|---------------------|
| Email    | `jordan@example.com` |
| Password | `demo1234`          |

Any seeded demo user email works with password `demo1234`. New signups are stored in `localStorage`.

## Environment

Copy `.env.example` to `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_USE_MOCK_DATA=true
NEXT_PUBLIC_APP_NAME=MyPlace
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

- Leave Supabase unset (or keep `NEXT_PUBLIC_USE_MOCK_DATA=true`) to use the mock store.
- Set real Supabase values and `NEXT_PUBLIC_USE_MOCK_DATA=false` to connect a project.
- Apply `supabase/schema.sql` in the Supabase SQL editor (includes RLS recommendations).

## Scripts

```bash
npm run dev        # development server
npm run build      # production build
npm run start      # serve production build
npm run lint       # ESLint
npm run typecheck  # TypeScript
```

## Routes

| Path | Description |
|------|-------------|
| `/` | Public landing |
| `/login`, `/signup`, `/login/reset` | Auth |
| `/onboarding` | First-time profile setup |
| `/home` | Activity dashboard |
| `/profile/[username]` | Customizable profile page |
| `/profile/edit` | Profile + theme editor |
| `/friends` | Requests, list, featured friends |
| `/messages`, `/messages/[id]` | Private messaging |
| `/browse`, `/search` | Discovery |
| `/notifications` | Alerts |
| `/blog`, `/blog/[postId]` | Blog |
| `/settings` | Account, privacy, safety |

## Folder structure

```
app/                 # App Router pages + globals.css
components/
  auth/              # RequireAuth, AuthenticatedShell
  brand/             # Logo
  feed/              # Status + activity feed
  friends/
  layout/            # AppHeader, AppShell, MobileNavigation
  messaging/
  notifications/
  profile/           # Profile modules, music, photos, comments
  safety/            # Report dialog
  theme/             # ThemeEditor
  ui/                # Buttons, dialogs, inputs, states
lib/
  auth/              # AuthProvider
  mock/              # Seed data + client mock store
  supabase/          # Browser/server clients
  themes.ts          # Presets + sanitization
  types.ts           # Domain models
  utils.ts
supabase/schema.sql  # Tables, indexes, RLS notes
```

## Profile customization

Users customize colors, fonts, backgrounds, module order, music-player style, stickers, and more through a visual editor (no code required). Theme values are sanitized — no arbitrary JavaScript or unsafe CSS injection.

Presets: Classic Blue, Midnight, Bubblegum, Grunge, Pop Star, Indie, Goth, Y2K, Minimal, Custom.

## Sample profiles

Seven demo personalities ship with distinct themes, music, blogs, photos, and featured friends (`jordanspace`, `mirapixels`, `devonloops`, `skyenotes`, `riostatic`, `novawave`, `alexdrafts`).

## Accessibility

Semantic landmarks, skip link, labeled forms, keyboard-friendly dialogs/menus, focus styles, reduced-motion support, contrast warnings in the theme editor, and non-autoplaying audio until user interaction.
