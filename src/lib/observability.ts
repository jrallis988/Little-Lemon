import { logger } from "@/lib/logger";

/**
 * Lightweight observability bridge.
 * When SENTRY_DSN is set, events are POSTed to Sentry's envelope-less
 * store endpoint via the public DSN auth — no SDK required for boot.
 * Prefer installing @sentry/nextjs in production for full tracing.
 */
export function captureException(
  error: unknown,
  context?: Record<string, unknown>
) {
  const message =
    error instanceof Error ? error.message : String(error ?? "unknown_error");
  const stack = error instanceof Error ? error.stack : undefined;

  logger.error("exception", { message, stack, ...context });

  const dsn = process.env.SENTRY_DSN;
  if (!dsn) return;

  try {
    const match = dsn.match(
      /^https:\/\/([^@]+)@([^/]+)\/(\d+)$/
    );
    if (!match) return;
    const [, key, host, project] = match;
    const url = `https://${host}/api/${project}/store/?sentry_key=${key}&sentry_version=7`;
    void fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_id: crypto.randomUUID().replace(/-/g, ""),
        timestamp: new Date().toISOString(),
        platform: "javascript",
        level: "error",
        server_name: "trump-rx",
        message,
        exception: stack
          ? {
              values: [
                {
                  type: error instanceof Error ? error.name : "Error",
                  value: message,
                  stacktrace: { frames: [{ filename: "app", function: stack }] },
                },
              ],
            }
          : undefined,
        tags: context,
        environment: process.env.NODE_ENV ?? "development",
      }),
      // fire-and-forget; never block request path
    }).catch(() => undefined);
  } catch {
    /* ignore sentry transport failures */
  }
}
