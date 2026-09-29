/** Short family-facing privacy notice for Surf (local-first child learning app). */
export const PRIVACY_NOTICE_VERSION = "2026-09-29";

export const PRIVACY_NOTICE_TITLE = "How Surf handles kids’ learning data";

export const PRIVACY_NOTICE_POINTS = [
  "Surf is built for families and schools. Parents set the PIN, time limits, and allowlist before kids search.",
  "Profiles, history, projects, and Ask Milo chats stay on this device by default — Surf does not create a kid social feed or ad profile.",
  "Live search may contact trusted educational APIs (for example OpenAlex) and reader helpers to fetch page text. Surf filters content farms and non-approved sites.",
  "If you enable live Ask Milo, questions are sent to the AI provider you configure. Without a key, Milo stays in offline tutor mode.",
  "Parents can clear history, change the PIN, and adjust allowlists anytime in Parent Controls.",
] as const;

export const PRIVACY_CONSENT_LABEL =
  "I am a parent or guardian. I understand Surf stores learning data on this device and that I control the PIN, time limit, and allowed sites.";
