/**
 * Lightweight monitoring boundary.
 * When SENTRY_DSN is set, errors are POSTed to Sentry's envelope endpoint
 * using the public DSN. Without a DSN this is a structured console fallback.
 */

type MonitorContext = Record<string, string | number | boolean | undefined>;

function parseDsn(dsn: string) {
  try {
    const url = new URL(dsn);
    const publicKey = url.username;
    const projectId = url.pathname.replace(/^\//, "");
    const ingest = `${url.protocol}//${url.host}/api/${projectId}/store/`;
    return { publicKey, ingest };
  } catch {
    return null;
  }
}

export function captureException(error: unknown, context: MonitorContext = {}) {
  const message =
    error instanceof Error ? error.message : String(error || "Unknown error");
  const stack = error instanceof Error ? error.stack : undefined;

  if (!process.env.SENTRY_DSN) {
    if (process.env.NODE_ENV !== "test") {
      console.error("[monitor]", message, context, stack);
    }
    return;
  }

  const parsed = parseDsn(process.env.SENTRY_DSN);
  if (!parsed) return;

  const payload = {
    message,
    level: "error",
    platform: "javascript",
    timestamp: Date.now() / 1000,
    tags: context,
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
  };

  // Fire-and-forget; never block the request path on monitoring failures.
  void fetch(parsed.ingest, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Sentry-Auth": `Sentry sentry_version=7, sentry_client=bch-platform/1.0, sentry_key=${parsed.publicKey}`,
    },
    body: JSON.stringify(payload),
  }).catch(() => undefined);
}

export function trackMetric(name: string, value = 1, tags: MonitorContext = {}) {
  if (process.env.NODE_ENV !== "test") {
    console.info("[metric]", name, value, tags);
  }
}
