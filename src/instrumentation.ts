export async function register() {
  // Reserved for OpenTelemetry / Sentry Node init when SDKs are installed.
  // Runtime capture uses src/lib/observability.ts + SENTRY_DSN.
  if (process.env.SENTRY_DSN) {
    const { logger } = await import("@/lib/logger");
    logger.info("observability_ready", { sentry: true });
  }
}
