/** Canonical public URL — used for OG tags on interior routes. */
export const siteUrl =
  (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, "") ||
  "https://jrallis988.github.io/Little-Lemon";

export function absoluteUrl(path: string) {
  const base = siteUrl.replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}
