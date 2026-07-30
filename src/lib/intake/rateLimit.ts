type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

/**
 * Simple in-memory rate limiter (per server instance).
 * Good enough for staging / single-region; swap for Redis in multi-instance prod.
 */
export function rateLimit(
  key: string,
  {
    limit = 8,
    windowMs = 60_000,
  }: { limit?: number; windowMs?: number } = {},
): { ok: true } | { ok: false; retryAfterSec: number } {
  const now = Date.now();
  const current = buckets.get(key);

  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true };
  }

  if (current.count >= limit) {
    return {
      ok: false,
      retryAfterSec: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
    };
  }

  current.count += 1;
  buckets.set(key, current);
  return { ok: true };
}

export function clientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "unknown";
  return ip;
}

/** Honeypot: bots often fill hidden "website" / "companyUrl" fields. */
export function isHoneypotTriggered(body: Record<string, unknown>) {
  const traps = ["website", "companyUrl", "faxNumber"];
  return traps.some((field) => {
    const value = body[field];
    return typeof value === "string" && value.trim().length > 0;
  });
}
