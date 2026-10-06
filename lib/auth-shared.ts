/** Shared auth constants safe for client + server. */

export const SESSION_COOKIE = "pf_session";

/**
 * Local-only QA password. Enabled only when ALLOW_DEMO_AUTH=true
 * (or NEXT_PUBLIC_ALLOW_DEMO_AUTH=true) and never in production builds.
 */
export const DEMO_MEMBER_PASSWORD = "pfmember";

export function isDemoAuthEnabled() {
  if (process.env.NODE_ENV === "production") return false;
  return (
    process.env.ALLOW_DEMO_AUTH === "true" ||
    process.env.NEXT_PUBLIC_ALLOW_DEMO_AUTH === "true"
  );
}

export function verifyDemoPassword(password: string) {
  return isDemoAuthEnabled() && password === DEMO_MEMBER_PASSWORD;
}
