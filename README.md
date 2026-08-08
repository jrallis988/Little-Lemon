# Working Intelligence

AI workforce platform for collaborating with specialized AI employees across HR, marketing, social, content, engineering, legal, sales, and operations.

## Stack

- **Frontend:** React 19, Vite, TypeScript (strict), Tailwind CSS v4, React Router, Framer Motion, Zustand, TanStack Query/Table, React Virtuoso
- **Backend:** Node.js + Express streaming API with interchangeable AI providers
- **Data/Auth:** Supabase (PostgreSQL, Auth, Storage, Realtime, RLS) — demo mode works without credentials
- **Testing:** Vitest, React Testing Library, Playwright

## Quick start

```bash
npm install
cd server && npm install && cd ..
cp .env.example .env
npm run dev
```

- Web: [http://localhost:5173](http://localhost:5173)
- API: [http://localhost:8787/api/health](http://localhost:8787/api/health)

Demo mode is enabled by default. Open **Enter workspace** to collaborate with Calvin, Holly, Sonny, Penny, Walter, Linda, Stan, and Rachel.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start Vite + Express |
| `npm run build` | Typecheck and build the web app |
| `npm run test` | Run unit tests |
| `npm run test:e2e` | Run Playwright tests |
| `npm run lint` | ESLint |

## Architecture

```
src/
  components/   reusable UI
  data/         employee catalog + seed data
  features/     sidebar, chat, tabs, command palette
  hooks/        theme + keyboard shortcuts
  layouts/      authenticated workspace shell
  lib/          Supabase client
  pages/        route-level screens
  services/     AI streaming + auth
  store/        Zustand UI/workspace state
  types/        shared domain types
server/
  src/providers interchangeable OpenAI, Anthropic, Gemini, Grok, Ollama, demo
supabase/
  schema.sql    production Postgres + RLS baseline
```

### Adding an AI employee

1. Add a record to `src/data/employees.ts` with profession, prompts, tools, memory seeds, and avatar.
2. Seed-related tasks/files/notes optionally in `src/data/seed.ts`.
3. No core shell changes required — routing, sidebar, and tabs are data-driven.

### AI providers

Set one or more keys in `.env`:

- `OPENAI_API_KEY`
- `ANTHROPIC_API_KEY`
- `GOOGLE_AI_API_KEY`
- `XAI_API_KEY`
- `OLLAMA_BASE_URL`

The API route `POST /api/chat/stream` selects a provider per employee and falls back to the demo streamer.

### Supabase

1. Create a project and apply `supabase/schema.sql`.
2. Enable Email + Google + Azure + GitHub auth providers.
3. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.

Without Supabase credentials, auth and persistence run in local demo mode (Zustand + localStorage).

## Product surface

- Three-column responsive workspace
- Employee chat with markdown, streaming, reactions, regenerate, export
- Files / Tasks / Notes / Calendar / Posts / Guidelines tabs
- Favorites, departments, recent chats, notifications
- Command palette (`⌘/Ctrl + K`), light/dark/system themes
- Multi-workspace + role-aware settings foundation

## License

Private — all rights reserved.
