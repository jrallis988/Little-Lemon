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
  /** Exact student grade 1–12; drives default academic filtering */
  grade: number;
  accessibility: AccessibilitySettings;
  createdAt: string;
};

export type TrustedSourceBadge =
  | "Nat Geo Kids"
  | "Smithsonian"
  | "PBS Kids"
  | "NASA Kids"
  | "Library of Congress"
  | "USGS"
  | "NOAA"
  | "Britannica"
  | "AMNH"
  | "CK-12"
  | "OpenAlex"
  | "Curated";

export type AcademicContentTier =
  | "peer_reviewed_journal"
  | "authoritative_research"
  | "educational_magazine"
  | "verified_reference";

export type GradeBandId =
  | "grades_1_2"
  | "grades_3_5"
  | "grades_6_8"
  | "high_school";

export type AcademicSearchHit = {
  id: string;
  title: string;
  url: string;
  domain: string;
  publisher: string;
  contentTier: AcademicContentTier;
  contentTierLabel: string;
  gradeMin: number;
  gradeMax: number;
  recommendedGrades: string;
  abstractText: string;
  vocabulary: string[];
  citation: string;
  legitimacyScore: number;
  matchScore: number;
  readingMinutes: number;
};

export type AcademicSearchResponse = {
  query: string;
  abstractSummary: string;
  keyVocabulary: string[];
  recommendedGradeLevels: string[];
  availableTiers: string[];
  filteredOutFarms: number;
  results: AcademicSearchHit[];
  /** Where results came from for transparency */
  sourcesUsed?: Array<"curated" | "openalex" | "live">;
};

export type AcademicSearchOptions = {
  grade?: number;
  gradeBand?: GradeBandId | string;
  tiers?: AcademicContentTier[];
  limit?: number;
};

export type SearchResult = {
  id: string;
  title: string;
  url: string;
  domain: string;
  sourceBadge: TrustedSourceBadge;
  description: string;
  readingMinutes?: number;
  contentTier?: AcademicContentTier;
  contentTierLabel?: string;
  gradeMin?: number;
  gradeMax?: number;
  recommendedGrades?: string;
  vocabulary?: string[];
  citation?: string;
  legitimacyScore?: number;
  publisher?: string;
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
  /** Extra domains parents blocked explicitly */
  blocklist: string[];
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
  | { kind: "project"; projectId: string };

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
  citation?: string;
  vocabulary?: string[];
  fetchedLive?: boolean;
};

export type CitationStyle = "mla" | "apa";

export type ResearchSource = {
  id: string;
  title: string;
  url: string;
  domain: string;
  publisher?: string;
  abstractText: string;
  citation: string;
  vocabulary: string[];
  contentTier?: AcademicContentTier;
  addedAt: string;
};

export type ResearchNote = {
  id: string;
  body: string;
  createdAt: string;
  sourceId?: string;
};

export type ResearchProject = {
  id: string;
  profileId: string;
  title: string;
  topic: string;
  createdAt: string;
  updatedAt: string;
  sources: ResearchSource[];
  notes: ResearchNote[];
  citationStyle: CitationStyle;
};
