/** Public site URL for canonical/OG tags. Set VITE_SITE_URL in production (e.g. https://ww63.vercel.app). */
export const SITE_URL =
  (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, "") ||
  (typeof window !== "undefined" ? window.location.origin : "");

export const SITE_NAME = "Weight Watchers 63 — 63 Years of You";
