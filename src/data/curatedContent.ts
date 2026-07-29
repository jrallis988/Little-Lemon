import type { ExploreCategory } from "@/types";

export const EXPLORE_CATEGORIES: ExploreCategory[] = [
  {
    id: "animals",
    title: "Animals & Habitats",
    description: "Meet creatures from coral reefs to arctic tundra.",
    searchPrompt: "coral reefs",
    accent: "#288CC1",
  },
  {
    id: "space",
    title: "Space & Planets",
    description: "Orbit the solar system with calm, curated facts.",
    searchPrompt: "solar system",
    accent: "#234197",
  },
  {
    id: "history",
    title: "History Mysteries",
    description: "Gentle timelines and museum-quality stories.",
    searchPrompt: "Library of Congress",
    accent: "#8C6DE6",
  },
  {
    id: "earth",
    title: "Earth Science",
    description: "Weather, oceans, and how our planet works.",
    searchPrompt: "Plate Tectonics",
    accent: "#5F9ED1",
  },
  {
    id: "inventors",
    title: "Inventors & Ideas",
    description: "Curious minds and the tools they built.",
    searchPrompt: "NASA Science",
    accent: "#F7921E",
  },
  {
    id: "reading",
    title: "Reading Corner",
    description: "Short articles chosen for focused reading time.",
    searchPrompt: "coral reefs",
    accent: "#F25C1D",
  },
];

export function getCategoryById(id: string): ExploreCategory | undefined {
  return EXPLORE_CATEGORIES.find((category) => category.id === id);
}
