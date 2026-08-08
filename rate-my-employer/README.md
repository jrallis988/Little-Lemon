# Rate My Employer

Cross-platform mobile app for crowdsourced workplace ratings — RateMyProfessors, for employers.

## Stack

| Layer | Choice |
| --- | --- |
| Frontend | React Native + Expo (TypeScript), Expo Router |
| Styling | Clean `StyleSheet` + shared theme tokens (minimalist, high-contrast) |
| Backend | Node.js / Express |
| Database | PostgreSQL (`server/db/schema.sql` — works with Supabase or local Postgres) |

## Project structure

```
rate-my-employer/
├── app/                      # Expo Router entry + screens
│   ├── (tabs)/               # Bottom tabs: Explore, Search, Contribute, Compare, Profile
│   ├── company/[id].tsx
│   ├── review/[id].tsx
│   └── auth.tsx
├── src/
│   ├── components/           # UI, company, review components
│   ├── context/              # Local session + reviews (dev fallback)
│   ├── data/                 # Seed data
│   ├── lib/
│   ├── navigation/           # Tab definitions
│   ├── services/             # API client + domain services
│   ├── theme/
│   └── types/                # User, Company, Review, Tag, Salary, EmployerResponse
└── server/                   # Express API + SQL schema
    ├── db/schema.sql
    └── src/
```

## Mobile app

```bash
cd rate-my-employer
npm install
npm run web          # browser preview
npm start            # Expo Go / simulators
```

Bottom tabs: **Explore · Search · Contribute (+) · Compare · Profile**

## API server

```bash
cd server
cp .env.example .env   # set DATABASE_URL
npm install
npm run db:migrate     # requires psql + DATABASE_URL
npm run dev            # http://localhost:4000
```

Core tables: `users`, `companies`, `reviews`, `tags`, `review_tags`, `salaries`, `employer_responses`.

The mobile `services/` layer calls the API when available and falls back to local seed data for offline/dev browsing.
