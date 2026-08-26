# BioCross API

Remote backend scaffold for the BioCross mobile app. Implements the initial auth + profile endpoints from `src/api/types.ts`.

## Quick start

```bash
cd apps/api
npm install
npm run dev
```

Server runs at `http://localhost:3001`.

## Connect the mobile app

```bash
EXPO_PUBLIC_API_MODE=remote
EXPO_PUBLIC_API_URL=http://localhost:3001
```

## Production notes

- Replace in-memory `store.ts` with Postgres
- Set `JWT_SECRET` environment variable
- Add remaining routes: checks, documents, alerts, supplements
- Deploy to Railway, Fly.io, or Render
