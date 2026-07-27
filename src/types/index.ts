/** Shared domain types for Surf */

export type TabKind =
  | "newtab"
  | "search"
  | "web"
  | "blocked"
  | "explore"
  | "profile"
  | "parent"
  | "projects"
  | "settings";

export type BrowserTab = {
  id: string;
  kind: TabKind;
  title: string;
  url: string;
  favicon?: string;
  pinned?: boolean;
  canGoBack?: boolean;
  canGoForward?: boolean;
  isLoading?: boolean;
  nativeAttached?: boolean;
  blockedReason?: string;
  blockedDomain?: string;
};

export type EducationalSearchResult = {
  id: string;
  title: string;
  url: string;
  domain: string;
  description: string;
  favicon_url: string;
  source: string;
  category: string;
  result_type: "article" | "video" | "image" | "reference" | "document" | string;
  trust_score: number;
  reading_level: string;
  estimated_minutes: number;
};

export type Bookmark = {
  id: string;
  title: string;
  url: string;
  domain: string;
  favicon?: string;
  createdAt: string;
};

export type DownloadItem = {
  id: string;
  fileName: string;
  url: string;
  status: "queued" | "downloading" | "complete" | "failed";
  progress: number;
  createdAt: string;
};

export type Highlight = {
  id: string;
  pageUrl: string;
  pageTitle: string;
  text: string;
  note?: string;
  color?: string;
  createdAt: string;
};

export type Citation = {
  id: string;
  title: string;
  url: string;
  siteName?: string;
  author?: string;
  accessedAt: string;
};

export type ProjectPage = {
  id: string;
  title: string;
  url: string;
  addedAt: string;
};

export type ProjectNote = {
  id: string;
  text: string;
  createdAt: string;
};

export type Project = {
  id: string;
  title: string;
  description?: string;
  pages: ProjectPage[];
  notes: ProjectNote[];
  highlights: Highlight[];
  citations: Citation[];
  createdAt: string;
  updatedAt: string;
};

export type AiActionKind = "summarize" | "define" | "quiz" | "citations";

export type AiAction = {
  id: AiActionKind;
  label: string;
  description: string;
};

export type AiActionResult = {
  status: "success" | "unavailable" | "error";
  title: string;
  message: string;
};

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

/** Legacy prototype result shape retained only for old curated explore metadata. */
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
  | { kind: "parent" }
  | { kind: "projects" }
  | { kind: "settings" };

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
