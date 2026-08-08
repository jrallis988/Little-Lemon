# Rate My Employer

Mobile app for rating workplaces — the RateMyProfessors idea, applied to employers.

Built with **Expo (React Native)** so one codebase targets iOS, Android, and web.

## MVP features

- Search employers by name, industry, or city
- Company pages with overall score, category bars, and written reviews
- Email/password accounts (stored locally on device for this MVP)
- Submit one review per employer; manage/delete your reviews from Profile

## Run locally

```bash
cd rate-my-employer
npm install
npm run web      # browser preview
# npm start     # Expo Go / simulator
```

## Project layout

```
rate-my-employer/
├── app/                 # Expo Router screens
├── src/
│   ├── components/
│   ├── context/         # Auth + reviews (AsyncStorage)
│   ├── data/seed.ts     # Seed companies & reviews
│   └── theme.ts
└── package.json
```

## Notes

- This folder is intentionally separate from the Artistic Fountain marketing site in the parent repo.
- Data is local-first (AsyncStorage). A shared backend can replace the context layer later without rewriting the screens.
- Intended to move into its own GitHub repository when ready.
