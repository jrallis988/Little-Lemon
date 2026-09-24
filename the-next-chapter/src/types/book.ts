export type AgeRange = "7-9" | "9-12" | "12-14";

export type Genre =
  | "Adventure"
  | "Mystery"
  | "Fantasy"
  | "Humor"
  | "Historical"
  | "Contemporary"
  | "STEM";

export type Interest =
  | "Funny"
  | "Spooky"
  | "Emotional"
  | "Action"
  | "Friendship"
  | "Discovery"
  | "Imagination";

export type ReadingLevel = "Developing" | "Comfortable" | "Advanced";

export type StoryTone =
  | "Exciting"
  | "Funny"
  | "Spooky"
  | "Heartwarming"
  | "Thought-provoking";

export interface EducatorResource {
  title: string;
  description: string;
  type: "discussion" | "activity" | "guide" | "worksheet";
}

export interface Author {
  name: string;
  bio: string;
  website?: string;
}

export interface BookCoverArt {
  background: string;
  accent: string;
  pattern: "compass" | "stars" | "leaves" | "circuits" | "letters" | "lunch" | "lantern" | "club";
}

export interface Book {
  slug: string;
  title: string;
  author: Author;
  hook: string;
  synopsis: string;
  ageRange: AgeRange;
  gradeRange: string;
  genre: Genre;
  readingLevel: ReadingLevel;
  readingLevelLabel: string;
  interests: Interest[];
  storyTones: StoryTone[];
  pageCount: number;
  publicationDate: string;
  isbn: string;
  formats: string[];
  themes: string[];
  excerpt: string;
  educatorResources: EducatorResource[];
  cover: BookCoverArt;
  featured?: boolean;
  authorSpotlight?: boolean;
}

export const AGE_RANGES: AgeRange[] = ["7-9", "9-12", "12-14"];

export const GENRES: Genre[] = [
  "Adventure",
  "Mystery",
  "Fantasy",
  "Humor",
  "Historical",
  "Contemporary",
  "STEM",
];

export const INTERESTS: Interest[] = [
  "Funny",
  "Spooky",
  "Emotional",
  "Action",
  "Friendship",
  "Discovery",
  "Imagination",
];
