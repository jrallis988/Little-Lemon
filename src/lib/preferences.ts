/** Client-only preference keys persisted in localStorage. */

export const COOKIE_CONSENT_KEY = "bch-cookie-consent";
export const SITE_ANNOUNCEMENT_KEY = "bch-announcement-construction-2026";

export type CookieConsentValue = "accepted" | "declined";

export function readLocalPreference(key: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeLocalPreference(key: string, value: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Private mode / blocked storage — fail quietly.
  }
}
