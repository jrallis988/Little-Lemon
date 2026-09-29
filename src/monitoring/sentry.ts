/**
 * Mobile Sentry scaffolding.
 * Set EXPO_PUBLIC_SENTRY_DSN and install `@sentry/react-native` for production builds.
 * Until then, exceptions are logged in development only.
 */
const dsn = process.env.EXPO_PUBLIC_SENTRY_DSN?.trim();

export function initSentry(): void {
  if (!dsn) return;
  // After installing @sentry/react-native and adding the Expo plugin, replace with:
  // Sentry.init({ dsn, enableInExpoDevelopment: false });
  console.info(
    '[sentry] EXPO_PUBLIC_SENTRY_DSN is set. Install @sentry/react-native and wire Sentry.init for release builds.',
  );
}

export function captureException(error: unknown, context?: Record<string, unknown>): void {
  if (__DEV__) {
    console.warn('[sentry:dev]', error, context ?? '');
  }
}

export function captureMessage(message: string): void {
  if (__DEV__) {
    console.info('[sentry:dev]', message);
  }
}
