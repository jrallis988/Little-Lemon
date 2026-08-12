/** Shared motion preference helpers — respects site a11y `data-motion` + OS setting. */

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || typeof document === "undefined") return true;

  const pref = document.documentElement.dataset.motion;
  if (pref === "reduce") return true;
  if (pref === "no-preference") return false;

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
