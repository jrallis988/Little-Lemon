# Rate My Employer (RME)

Portfolio demo — **RateMyProfessors for workplaces**. Employer → workplace/location hierarchy, reviews, interviews, and salary signals.

This is **not a live product**. It is meant to be cloned, run locally, and walked through in a recruiter conversation.

## Product

- Discover employers and drill into specific workplaces
- Read and write **work reviews**, **interviews**, and **salary signals**
- Save employers, manage posts, report content, reset password
- Tabs: **Home · Search · Write(+) · Activity · Profile**

## Demo account

On the auth screen tap **Try demo account**, or sign in with:

- Email: `demo@ratemyemployer.app`
- Password: `demo123`

That account owns the seeded Home Depot Portsmouth review, so Profile → My Reviews is populated.

Apple / Google buttons are **simulated** and enter the same demo session.

## Stack

| Layer | Tech |
| --- | --- |
| App | React Native + Expo (TypeScript), Expo Router |
| UI | StyleSheet theme (navy `#0B2C5F` / blue `#1E6BFF`, DM Sans) |
| Local data | AsyncStorage + seed catalog (default happy path) |
| API | Express (`server/`), in-memory by default |

Postgres, SMTP, and Google ID-token verify exist as **optional architecture samples**, not requirements to demo the app.

## Run the app

```bash
cd rate-my-employer
npm install
npm run web          # or: npm start / npm run ios / npm run android
npm run typecheck
```

## Optional API

```bash
cd rate-my-employer
npm run server:install
npm run server:dev          # http://localhost:4000 (memory mode)
npm run server:test
```

Auth endpoints (memory demo user included):

- `POST /api/auth/sign-up`
- `POST /api/auth/sign-in`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password`
- `GET /api/auth/me`

## Write wizard

Type → Employer → Workplace → Role → Rate → Write → Preview → Success

Interview posts include difficulty, offer result, and process length.
