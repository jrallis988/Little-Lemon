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
| API | Express (`server/`), memory mode by default, Postgres when `DATABASE_URL` is set |

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

### Postgres (source of truth)

```bash
cd rate-my-employer/server
cp .env.example .env        # set DATABASE_URL + JWT_SECRET
npm run db:up               # docker compose Postgres 16
# schema + seed load on first boot via docker-entrypoint
# for existing DBs:
#   npm run db:migrate && npm run db:seed
npm run dev
```

Auth endpoints:

- `POST /api/auth/sign-up`
- `POST /api/auth/sign-in`
- `POST /api/auth/forgot-password` (emails when SMTP/Resend configured; returns `resetToken` in dev)
- `POST /api/auth/reset-password`
- `POST /api/auth/oauth/google` `{ idToken }` (requires `GOOGLE_CLIENT_ID`)
- `GET /api/auth/providers`
- `GET /api/auth/me`

## Architecture notes

- When `DATABASE_URL` is set, **users, resets, companies, workplaces, reviews, and interviews** prefer Postgres.
- Mobile prefers the API for auth when reachable, then falls back to local accounts.
- Submissions persist locally and best-effort dual-write to the API.
- Settings / `/health` show API mode plus Google + email-reset readiness.

## Write wizard

Type → Employer → Workplace → Role → Rate → Write → Preview → Success

Interview posts include difficulty, offer result, and process length.

## Path to 10/10 launch

| Done in this tree | Still outside / ops |
| --- | --- |
| Postgres-backed auth + catalog + reviews | Dedicated GitHub repo (not nested) |
| SMTP / Resend password reset | Production domain + DNS + secrets |
| Google ID-token verify endpoint | Expo AuthSession native Google UX |
| Docker Compose for local Postgres | App Store / Play device QA + E2E in CI |
| Health reports launch readiness | Split deploy (API + mobile) |

Score today: strong **MVP → near-launch** (~9/10 offline-first). True **10/10** needs the ops column above.
