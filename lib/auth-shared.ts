/** Shared auth constants safe for client + server. */

export const SESSION_COOKIE = "pf_session";

/** Demo password for local / staging member app sign-in. */
export const DEMO_MEMBER_PASSWORD = "pfmember";

export function verifyDemoPassword(password: string) {
  return password === DEMO_MEMBER_PASSWORD;
}
