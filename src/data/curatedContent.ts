import type { ExploreCategory, SearchResult, TrustedSourceBadge } from "@/types";
import { createId } from "@/lib/utils";
import { MAX_SEARCH_RESULTS } from "@/lib/constants";

export const EXPLORE_CATEGORIES: ExploreCategory[] = [
  {
    id: "animals",
    title: "Animals & Habitats",
    description: "Meet creatures from coral reefs to arctic tundra.",
    searchPrompt: "animal habitats for kids",
    accent: "#288CC1",
  },
  {
    id: "space",
    title: "Space & Planets",
    description: "Orbit the solar system with calm, curated facts.",
    searchPrompt: "solar system for kids",
    accent: "#234197",
  },
  {
    id: "history",
    title: "History Mysteries",
    description: "Gentle timelines and museum-quality stories.",
    searchPrompt: "history museums for kids",
    accent: "#8C6DE6",
  },
  {
    id: "earth",
    title: "Earth Science",
    description: "Weather, oceans, and how our planet works.",
    searchPrompt: "earth science for kids",
    accent: "#5F9ED1",
  },
  {
    id: "inventors",
    title: "Inventors & Ideas",
    description: "Curious minds and the tools they built.",
    searchPrompt: "famous inventors for kids",
    accent: "#F7921E",
  },
  {
    id: "reading",
    title: "Reading Corner",
    description: "Short articles chosen for focused reading time.",
    searchPrompt: "short educational articles for kids",
    accent: "#F25C1D",
  },
];

const SOURCE_POOL: Array<{
  badge: TrustedSourceBadge;
  domain: string;
  base: string;
}> = [
  {
    badge: "Nat Geo Kids",
    domain: "kids.nationalgeographic.com",
    base: "https://kids.nationalgeographic.com",
  },
  {
    badge: "Smithsonian",
    domain: "www.si.edu",
    base: "https://www.si.edu/kids",
  },
  {
    badge: "PBS Kids",
    domain: "pbskids.org",
    base: "https://pbskids.org",
  },
  {
    badge: "NASA Kids",
    domain: "spaceplace.nasa.gov",
    base: "https://spaceplace.nasa.gov",
  },
  {
    badge: "Library of Congress",
    domain: "www.loc.gov",
    base: "https://www.loc.gov/education",
  },
];

/**
 * Curated search stub — production would call a filtered search API.
 * Keeps results calm, capped, and badge-attributed.
 */
export function runCuratedSearch(query: string): SearchResult[] {
  const q = query.trim();
  if (!q) return [];

  return SOURCE_POOL.slice(0, MAX_SEARCH_RESULTS).map((source, index) => ({
    id: createId("result"),
    title: `${capitalize(q)} — ${topicTitle(index)}`,
    url: `${source.base}/?q=${encodeURIComponent(q)}`,
    domain: source.domain,
    sourceBadge: source.badge,
    description: buildDescription(q, source.badge, index),
    readingMinutes: 3 + (index % 4),
  }));
}

function topicTitle(index: number): string {
  const titles = [
    "A calm starter guide",
    "Facts you can trust",
    "Explore with curiosity",
    "Museum-quality overview",
    "Kid-friendly deep dive",
    "Short reading adventure",
    "Classroom-ready explainer",
    "Wonder walkthrough",
  ];
  return titles[index % titles.length]!;
}

function buildDescription(
  query: string,
  badge: TrustedSourceBadge,
  index: number,
): string {
  return `${badge} shares a clear, age-appropriate look at “${query}”. This curated result keeps ads and clutter away so learning stays focused. Tip ${index + 1}: follow one question at a time and write down one new thing you discovered.`;
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function getCategoryById(id: string): ExploreCategory | undefined {
  return EXPLORE_CATEGORIES.find((category) => category.id === id);
}
