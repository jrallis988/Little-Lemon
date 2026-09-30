# MyChildren's prototype

A cross-platform pediatric portal in the spirit of a hospital parent app: one React Native codebase for iOS and Android, plus a browser build for review. The prototype has eleven core screens: a hospital welcome, sign-in, the patient dashboard, visits, scheduling, messages, test results, medications, billing, family chart switching, and settings.

This is a prototype. It is not the official Boston Children's Hospital app and it is not Epic MyChart. The sample family is fictional.

## Why this stack

React Native and TypeScript (Expo SDK 57) keep navigation, sign-in, and the chart UI in one project so iOS and Android stay in step. Biometrics go through the platform APIs: Face ID / Touch ID on iOS and the fingerprint or face prompt on Android, via `expo-local-authentication`. A separate SwiftUI and Kotlin pair would be the path for deeper device integration, at the cost of two codebases.

## Run

```bash
cd mychildrens
npm install
npm test
npm run web
```

`npm start` opens the Expo dev server. From there, press `i` or `a` for a simulator, or scan the QR code with the Expo Go app.

## Sample family

Open the app on the hospital welcome screen, continue, then choose **Continue with the sample family**. Jordan Hale looks after Maya (8) and Leo (2). The Family tab switches charts. Visits include eCheck-In and a video-visit card. Scheduling can match a concern (a breathing concern tells you to call 911) or book a clinic time. Messages, refill requests, and payments stay on the device. They are not sent to a clinic and they do not charge a card. Guest pay matches a statement number such as `MC-0912`. Settings includes notifications, a biometric lock, demographic fields, and English / Español. The language choice stays after sign-out.

## Hospital connection

Sign-in uses SMART on FHIR standalone launch with OAuth 2.0 and PKCE. The app reads the patient record, visits, observations, medicines, vaccines, allergies, conditions, messages, care team, and invoices when the server supports them. Scopes are read-only. The access token is used to load the chart and is not kept after that.

Boston Children's (or any Epic site) has to register the app and issue:

- the FHIR base URL
- a public client ID

Put them in `.env.local` (see `.env.example`) or type them on the sign-in screen:

```bash
EXPO_PUBLIC_FHIR_ISS=
EXPO_PUBLIC_FHIR_CLIENT_ID=
```

Register the redirect URI shown on the sign-in screen. Epic also expects the FHIR base URL as the `aud` parameter; the app sends that. A public sandbox such as `https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4` still needs a client ID from the Epic on FHIR registration. This repository does not include production credentials.

Sections the server refuses are listed in Settings. The rest of the chart still opens. Vaccines, growth, and allergies stay available from the Family tab.
