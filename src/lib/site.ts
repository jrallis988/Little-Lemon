/** Canonical public origin (no trailing slash). Set via NEXT_PUBLIC_SITE_URL. */
export function getSiteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "http://localhost:3000"
  );
}
