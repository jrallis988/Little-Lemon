# Rate My Employer (RME)

Crowdsourced workplace ratings — **Employer → Workplace/location** hierarchy.
Think RateMyProfessors for jobs, stores, campuses, and offices.

## Product

- Discover employers and drill into specific workplaces
- Read and write **work reviews**, **interviews**, and **salary signals**
- Save employers, manage your posts, report content, reset password
- Tabs: **Home · Search · Write(+) · Activity · Profile**

## Stack

| Layer | Tech |
| --- | --- |
| App | React Native + Expo (TypeScript), Expo Router |
| UI | StyleSheet theme (navy `#0B2C5F` / blue `#1E6BFF`, DM Sans) |
| Local data | AsyncStorage + seed catalog |
| API | Express (`server/`), memory mode by default, Postgres-ready schema |

## Run the app

```bash
cd rate-my-employer
npm install
npm run web          # or: npm start / npm run ios / npm run android
npm run typecheck
```

## Run the API

```bash
cd rate-my-employer
npm run server:install
npm run server:dev          # http://localhost:4000 (memory mode)
npm run server:test
```

Auth endpoints:

- `POST /api/auth/sign-up`
- `POST /api/auth/sign-in`
- `POST /api/auth/forgot-password` (returns `resetToken` in memory/dev)
- `POST /api/auth/reset-password`
- `GET /api/auth/me`

Set `DATABASE_URL` and run `server/db/schema.sql` (+ optional `seed.sql`) for Postgres.

## Architecture notes

- Mobile prefers the API for auth when reachable, then falls back to local accounts.
- Submissions persist locally and best-effort dual-write to the API.
- Settings shows live API online/offline status.

## Write wizard

Type → Employer → Workplace → Role → Rate → Write → Preview → Success

Interview posts include difficulty, offer result, and process length.

## Still not production

- Dedicated GitHub repo (currently nested under another project)
- Postgres as sole source of truth
- Real OAuth + emailed password resets
- App Store / Play device QA + E2E in CI
