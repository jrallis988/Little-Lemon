/** Lightweight request validation helpers (no extra deps). */

export function normalizeEmail(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const email = value.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;
  return email;
}

export function normalizePhone(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const digits = value.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 15) return null;
  return value.trim();
}

export function requireNonEmpty(value: unknown, max = 120): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > max) return null;
  return trimmed;
}

export function isMembershipTier(value: unknown): value is "classic" | "black-card" {
  return value === "classic" || value === "black-card";
}

export function parseClubId(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const id = value.trim();
  if (!/^pf-[a-z0-9-]+$/i.test(id)) return null;
  return id;
}
