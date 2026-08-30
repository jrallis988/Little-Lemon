/**
 * Runtime flags for staging vs production behavior.
 */

export function isProductionRuntime() {
  return process.env.NODE_ENV === "production";
}

/** Show internal screen IDs in member chrome (opt-in for staging). */
export function showScreenChrome() {
  if (isProductionRuntime()) return false;
  return process.env.NEXT_PUBLIC_SHOW_SCREEN_IDS === "true";
}
