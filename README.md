# BioCross

Cross-platform consumer supplement-safety app for iPhone and Android.

**Check before you take it.**

BioCross helps people understand whether a vitamin, mineral, herb, or dietary supplement may conflict with their individual health profile — medications, conditions, allergies, existing supplements, procedures, relevant labs, and other medically relevant information — and connects findings to credible scientific sources.

## Stack

- **React Native + Expo** (SDK 57) + **TypeScript**
- **Expo Router** for navigation
- **Typed API client** with mock server (default) or remote backend via env
- **expo-secure-store** for auth tokens; **expo-camera** for live barcode scanning
- Design-system components shared across all screens

## API & authentication

By default the app runs against an **in-process mock API** (`EXPO_PUBLIC_API_MODE=mock`) that mirrors the production contract. Demo sign-in:

- Email: `demo@biocross.app`
- Password: `demo1234`

To connect a real backend:

```bash
EXPO_PUBLIC_API_MODE=remote
EXPO_PUBLIC_API_URL=https://api.your-backend.com
```

Copy `.env.example` to `.env` for local overrides.

## Device builds (EAS)

```bash
npm install -g eas-cli
eas login
eas build:configure   # first time — links EAS project
eas build --profile preview --platform ios
eas build --profile preview --platform android
```

Profiles in `eas.json`:

| Profile | Use |
|---------|-----|
| `development` | Dev client + simulator |
| `preview` | Internal TestFlight / APK |
| `production` | Store release (requires remote API URL) |

## E2E (Maestro)

```bash
# Install Maestro, then:
maestro test .maestro/onboarding-auth-check.yaml
```

## Product navigation

After onboarding:

**Home | History | Scan / Check | Updates | Profile**

Scan / Check is the primary center action. Scanning is a core app function (not an onboarding step).

## Architecture

```
app/                     # Expo Router screens
  onboarding/            # Guided health-profile setup + document review
  (tabs)/                # Home, History, Check, Updates, Profile
  check/                 # Search, manual barcode, confirm, analyzing
  result/                # Reusable risk-result screen + evidence detail
src/
  api/                   # HTTP client, auth storage, mock server
  design-system/         # Tokens + reusable UI components
  domain/                # Models, fixtures, analysis, repositories
  features/scan/         # Live barcode scanner (expo-camera)
  state/                 # BioCrossProvider + AuthProvider
```

### Domain entities

`User`, `HealthProfile`, `HealthProfileItem`, `Medication`, `Condition`, `Allergy`, `Procedure`, `Supplement`, `Ingredient`, `UploadedDocument`, `ExtractedHealthItem`, `SupplementCheck`, `SafetyFinding`, `EvidenceSource`, `SafetyAlert`

### Safety analysis shape

Findings retain structured reasoning:

`supplement → ingredient → potential issue → health-profile item → evidence/source → severity → explanation`

Risk communication always pairs **color + icon + text**. Absolute guarantees such as “This supplement is safe for you” are intentionally avoided.

Result screen states (one reusable screen):

- Low concern / no known conflicts
- Use caution
- High risk / potential conflict
- Unable to determine / more information needed

### Medical record upload

`Upload → Process → Extract → Review → Confirm → Add to Health Profile`

Extracted items never auto-confirm into the health profile. Provenance (source document + timestamps) is retained.

## Design system components

`BioCrossButton`, `HealthCard`, `RiskBadge`, `RiskResultCard`, `FindingCard`, `ProfileStatus`, `InfoCallout`, `EvidenceCard`, `SupplementCard`, `HealthRecordCard`, `EmptyState`, `LoadingState`, `ErrorState`, `BottomNavigation`

## Privacy

- Demo fixtures use fictional personas only — never real patient health information
- Secure storage hooks via `expo-secure-store` / AsyncStorage abstraction ready for production backends
- Clear separation of BioCross educational insights from professional medical advice

## Develop

```bash
npm install
npm start          # Expo dev server
npm run ios        # iOS
npm run android    # Android
npm run web        # Web preview
npm run typecheck
npm test
```

## Accessibility

Targets WCAG 2.2 AA principles for mobile: Dynamic Type-friendly typography sizing, screen-reader labels, contrast, large touch targets, non-color risk indicators, and reduced-motion-friendly patterns where animation is used.
