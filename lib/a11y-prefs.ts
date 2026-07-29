export type ThemeMode = "light" | "dark" | "system";
export type TextScale = "100" | "125" | "150";
export type SpacingScale = "normal" | "relaxed" | "loose";
export type MotionPref = "system" | "reduce" | "no-preference";

export type A11yPrefs = {
  theme: ThemeMode;
  highContrast: boolean;
  textScale: TextScale;
  motion: MotionPref;
  dyslexiaFont: boolean;
  lineSpacing: SpacingScale;
  letterSpacing: SpacingScale;
  underlineLinks: boolean;
  bigTargets: boolean;
};

export const A11Y_STORAGE_KEY = "varga-a11y-prefs";

export const defaultA11yPrefs: A11yPrefs = {
  theme: "light",
  highContrast: false,
  textScale: "100",
  motion: "system",
  dyslexiaFont: false,
  lineSpacing: "normal",
  letterSpacing: "normal",
  underlineLinks: false,
  bigTargets: false,
};

export function loadA11yPrefs(): A11yPrefs {
  if (typeof window === "undefined") return defaultA11yPrefs;
  try {
    const raw = window.localStorage.getItem(A11Y_STORAGE_KEY);
    if (!raw) return defaultA11yPrefs;
    return { ...defaultA11yPrefs, ...JSON.parse(raw) };
  } catch {
    return defaultA11yPrefs;
  }
}

export function saveA11yPrefs(prefs: A11yPrefs) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(A11Y_STORAGE_KEY, JSON.stringify(prefs));
}

export function applyA11yPrefs(prefs: A11yPrefs, root: HTMLElement = document.documentElement) {
  root.dataset.theme = prefs.theme;
  root.dataset.contrast = prefs.highContrast ? "high" : "default";
  root.dataset.textScale = prefs.textScale;
  root.dataset.motion = prefs.motion;
  root.dataset.font = prefs.dyslexiaFont ? "dyslexia" : "default";
  root.dataset.lineSpacing = prefs.lineSpacing;
  root.dataset.letterSpacing = prefs.letterSpacing;
  root.dataset.underlineLinks = prefs.underlineLinks ? "true" : "false";
  root.dataset.bigTargets = prefs.bigTargets ? "true" : "false";
}
