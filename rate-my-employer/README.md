# Rate My Employer

Cross-platform mobile app for crowdsourced workplace ratings.

## Stack

- **Frontend:** React Native + Expo (TypeScript), Expo Router
- **Styling:** Clean StyleSheet + theme tokens
- **Backend:** Node.js / Express + PostgreSQL (`server/db/schema.sql`)

## Screen directory

### Onboarding & authentication
| Screen | Route |
| --- | --- |
| SplashScreen | `app/splash.tsx` |
| ValueCarouselScreen | `app/onboarding.tsx` |
| AuthScreen | `app/auth.tsx` |
| WorkVerificationScreen | `app/verify-work.tsx` |

### Bottom tabs
| Tab | Screen | Route |
| --- | --- | --- |
| Explore | ExploreScreen | `app/(tabs)/explore.tsx` |
| Search | SearchDirectoryScreen | `app/(tabs)/search.tsx` |
| Contribute (+) | ContributeScreen (5-step wizard) | `app/(tabs)/contribute.tsx` |
| Compare | CompareScreen | `app/(tabs)/compare.tsx` |
| Profile | ProfileScreen | `app/(tabs)/profile.tsx` |

### Stack / modals
| Screen | Route |
| --- | --- |
| CompanyDetailScreen | `app/company/[id].tsx` |
| ReviewDetailScreen | `app/review/[id].tsx` |
| SubmitSalaryScreen | `app/salary/submit.tsx` |
| SettingsScreen | `app/settings.tsx` |

Contribute wizard steps: SelectCompany → Ratings → WrittenFeedback → Tagging → SalaryOptional.

## Run

```bash
cd rate-my-employer
npm install
npm run web

cd server
npm install
npm run dev
```
