import type {
  AgeRange,
  Book,
  Genre,
  Interest,
  ReadingLevel,
  StoryTone,
} from "@/types/book";

export type QuizInterest =
  | "Adventure"
  | "Mystery"
  | "Fantasy"
  | "Funny Stories"
  | "Science"
  | "Friendship"
  | "History";

export interface QuizAnswers {
  age: AgeRange;
  readingLevel: ReadingLevel;
  interest: QuizInterest;
  tone: StoryTone;
}

export interface BookRecommendation {
  book: Book;
  score: number;
  reasons: string[];
}

const INTEREST_TO_GENRE: Record<QuizInterest, Genre[]> = {
  Adventure: ["Adventure"],
  Mystery: ["Mystery"],
  Fantasy: ["Fantasy"],
  "Funny Stories": ["Humor"],
  Science: ["STEM"],
  Friendship: ["Contemporary"],
  History: ["Historical"],
};

const INTEREST_TO_TAGS: Record<QuizInterest, Interest[]> = {
  Adventure: ["Action", "Discovery", "Imagination"],
  Mystery: ["Spooky", "Discovery", "Imagination"],
  Fantasy: ["Imagination", "Discovery", "Emotional"],
  "Funny Stories": ["Funny", "Friendship"],
  Science: ["Discovery", "Action", "Imagination"],
  Friendship: ["Friendship", "Emotional"],
  History: ["Emotional", "Discovery", "Friendship"],
};

const AGE_NEIGHBORS: Record<AgeRange, AgeRange[]> = {
  "7-9": ["7-9", "9-12"],
  "9-12": ["9-12", "7-9", "12-14"],
  "12-14": ["12-14", "9-12"],
};

function scoreBook(book: Book, answers: QuizAnswers): BookRecommendation {
  let score = 0;
  const reasons: string[] = [];

  if (book.ageRange === answers.age) {
    score += 40;
    reasons.push(`Recommended for ages ${book.ageRange}`);
  } else if (AGE_NEIGHBORS[answers.age].includes(book.ageRange)) {
    score += 18;
    reasons.push(`Accessible for ages ${answers.age} readers`);
  }

  if (book.readingLevel === answers.readingLevel) {
    score += 30;
    reasons.push(`Matches a ${answers.readingLevel.toLowerCase()} reading level`);
  } else {
    const levels: ReadingLevel[] = ["Developing", "Comfortable", "Advanced"];
    const distance = Math.abs(
      levels.indexOf(book.readingLevel) - levels.indexOf(answers.readingLevel)
    );
    if (distance === 1) score += 10;
  }

  const genreMatch = INTEREST_TO_GENRE[answers.interest];
  if (genreMatch.includes(book.genre)) {
    score += 35;
    reasons.push(`Strong ${book.genre.toLowerCase()} storytelling`);
  }

  const interestTags = INTEREST_TO_TAGS[answers.interest];
  const overlapping = book.interests.filter((i) => interestTags.includes(i));
  if (overlapping.length > 0) {
    score += overlapping.length * 8;
    reasons.push(`Touches on ${overlapping.slice(0, 2).join(" & ").toLowerCase()}`);
  }

  if (book.storyTones.includes(answers.tone)) {
    score += 25;
    reasons.unshift(
      `Delivers a ${answers.tone.toLowerCase()} reading experience`
    );
  }

  if (reasons.length === 0) {
    reasons.push(`A standout title from the Fall 2026 collection`);
  }

  return { book, score, reasons: reasons.slice(0, 4) };
}

export function recommendBooks(
  books: Book[],
  answers: QuizAnswers,
  limit = 3
): BookRecommendation[] {
  return books
    .map((book) => scoreBook(book, answers))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

export const QUIZ_AGES: { value: AgeRange; label: string; hint: string }[] = [
  { value: "7-9", label: "Ages 7–9", hint: "Early chapter books & lively stories" },
  { value: "9-12", label: "Ages 9–12", hint: "Classic middle-grade territory" },
  { value: "12-14", label: "Ages 12–14", hint: "Upper middle-grade & deeper themes" },
];

export const QUIZ_LEVELS: {
  value: ReadingLevel;
  label: string;
  hint: string;
}[] = [
  {
    value: "Developing",
    label: "Developing",
    hint: "Building confidence; shorter chapters help",
  },
  {
    value: "Comfortable",
    label: "Comfortable",
    hint: "Reads independently with ease",
  },
  {
    value: "Advanced",
    label: "Advanced",
    hint: "Ready for richer language and complexity",
  },
];

export const QUIZ_INTERESTS: {
  value: QuizInterest;
  label: string;
}[] = [
  { value: "Adventure", label: "Adventure" },
  { value: "Mystery", label: "Mystery" },
  { value: "Fantasy", label: "Fantasy" },
  { value: "Funny Stories", label: "Funny Stories" },
  { value: "Science", label: "Science" },
  { value: "Friendship", label: "Friendship" },
  { value: "History", label: "History" },
];

export const QUIZ_TONES: { value: StoryTone; label: string }[] = [
  { value: "Exciting", label: "Exciting" },
  { value: "Funny", label: "Funny" },
  { value: "Spooky", label: "Spooky" },
  { value: "Heartwarming", label: "Heartwarming" },
  { value: "Thought-provoking", label: "Thought-provoking" },
];
