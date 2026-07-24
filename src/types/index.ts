/** Shared domain types for Surf */

export type AccessibilitySettings = {
  highContrast: boolean;
  largeText: boolean;
};

export type ProfileAvatar = {
  shape: "circle" | "rounded-square" | "hex" | "soft-blob";
  primary: string;
  secondary: string;
};

export type UserProfile = {
  id: string;
  displayName: string;
  avatar: ProfileAvatar;
  accessibility: AccessibilitySettings;
  createdAt: string;
};

export type TrustedSourceBadge =
  | "Nat Geo Kids"
  | "Smithsonian"
  | "PBS Kids"
  | "NASA Kids"
  | "Library of Congress"
  | "Curated";

export type SearchResult = {
  id: string;
  title: string;
  url: string;
  domain: string;
  sourceBadge: TrustedSourceBadge;
  description: string;
  readingMinutes?: number;
};

export type ExploreCategory = {
  id: string;
  title: string;
  description: string;
  searchPrompt: string;
  accent: string;
};

export type HistoryEntry = {
  id: string;
  profileId: string;
  title: string;
  url: string;
  domain: string;
  visitedAt: string;
  blocked?: boolean;
};

export type UsageDay = {
  date: string;
  minutes: number;
  searches: number;
  blockedAttempts: number;
};

export type ParentControls = {
  pinHash: string;
  pinSalt: string;
  dailyLimitMinutes: number;
  whitelist: string[];
  learningModeEnabled: boolean;
  allowlistOnly: boolean;
};

export type SessionSnapshot = {
  profileId: string | null;
  startedAt: string | null;
  elapsedSeconds: number;
  isPaused: boolean;
  limitReached: boolean;
  learningModeVisible: boolean;
  learningModeSettled: boolean;
};

export type NavigationIntent =
  | { kind: "home" }
  | { kind: "search"; query: string }
  | { kind: "article"; url: string; title?: string }
  | { kind: "explore" }
  | { kind: "explore-category"; categoryId: string }
  | { kind: "blocked"; url: string; reason: string }
  | { kind: "break" }
  | { kind: "profile" }
  | { kind: "parent" };

export type UrlCheckResult = {
  allowed: boolean;
  url: string;
  domain: string;
  reason?: string;
};

export type SanitizedArticle = {
  url: string;
  title: string;
  source: string;
  contentHtml: string;
  estimatedMinutes: number;
};
