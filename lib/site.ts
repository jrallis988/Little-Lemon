/**
 * Canonical public origin for metadata, sitemap, and structured data.
 * Set SITE_URL on the host (e.g. https://vargaforsenate.com).
 */
export function getSiteUrl(): string {
  const fromEnv =
    process.env.SITE_URL?.trim() ||
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "");
  if (fromEnv) {
    return fromEnv.replace(/\/$/, "");
  }
  return "https://nickvarga.com";
}
