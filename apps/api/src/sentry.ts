/**
 * Optional Sentry error reporting.
 * Set SENTRY_DSN and install `@sentry/node` to enable. Otherwise no-ops.
 */
type SentryLike = {
  init: (opts: { dsn: string; environment?: string; tracesSampleRate?: number }) => void;
  captureException: (error: unknown) => void;
};

let sentry: SentryLike | null = null;

function asSentryModule(mod: unknown): SentryLike | null {
  if (!mod || typeof mod !== 'object') return null;
  const record = mod as Record<string, unknown>;
  const candidate = (record.init ? record : record.default) as SentryLike | undefined;
  if (!candidate || typeof candidate.init !== 'function') return null;
  return candidate;
}

export async function initSentry(): Promise<void> {
  const dsn = process.env.SENTRY_DSN?.trim();
  if (!dsn) return;

  try {
    // Optional: npm i @sentry/node
    const loaded = await import(/* webpackIgnore: true */ '@sentry/node' as string);
    const client = asSentryModule(loaded);
    if (!client) throw new Error('invalid @sentry/node module shape');
    client.init({
      dsn,
      environment: process.env.SENTRY_ENVIRONMENT ?? process.env.NODE_ENV ?? 'development',
      tracesSampleRate: Number(process.env.SENTRY_TRACES_SAMPLE_RATE ?? 0.1),
    });
    sentry = client;
    console.info('[sentry] initialized');
  } catch {
    console.warn(
      '[sentry] SENTRY_DSN set but @sentry/node is not installed. Run: npm i @sentry/node',
    );
  }
}

export function captureException(error: unknown): void {
  if (sentry) {
    sentry.captureException(error);
    return;
  }
  if (process.env.NODE_ENV !== 'production') {
    console.warn('[sentry:dev]', error);
  }
}
