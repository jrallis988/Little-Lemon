import { PRODUCTS, SEARCH_SUGGESTIONS, CLINICAL_SERVICES } from "@/lib/data/catalog";
import type { Product, SearchIntent, SearchSuggestion } from "@/lib/types";

export interface SearchPageResults {
  query: string;
  retail: Product[];
  curated: SearchSuggestion[];
  clinical: SearchSuggestion[];
  pharmacy: SearchSuggestion[];
  didYouMean?: string;
}

const SPELLING_HINTS: Record<string, string> = {
  moisturiser: "moisturizer",
  vitamn: "vitamin",
  vitamines: "vitamins",
  flushot: "flu shot",
  refil: "refill",
  asprin: "aspirin",
  allegra: "allergy",
};

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

export function resolveSearchQuery(raw: string): {
  query: string;
  didYouMean?: string;
} {
  const query = normalize(raw);
  if (!query) return { query: "" };
  const hint = SPELLING_HINTS[query.replace(/\s+/g, "")];
  if (hint && hint !== query) {
    return { query: hint, didYouMean: hint };
  }
  // also check spaced versions
  const spaced = SPELLING_HINTS[query];
  if (spaced && spaced !== query) {
    return { query: spaced, didYouMean: spaced };
  }
  return { query };
}

export function buildSearchResults(rawQuery: string): SearchPageResults {
  const { query, didYouMean } = resolveSearchQuery(rawQuery);
  if (!query) {
    return {
      query: "",
      retail: [],
      curated: SEARCH_SUGGESTIONS.slice(0, 6),
      clinical: SEARCH_SUGGESTIONS.filter((item) => item.intent === "clinical"),
      pharmacy: SEARCH_SUGGESTIONS.filter((item) => item.intent === "pharmacy"),
    };
  }

  const retail = PRODUCTS.filter((product) => {
    const haystack =
      `${product.name} ${product.brand} ${product.tags.join(" ")} ${product.categoryId}`.toLowerCase();
    return haystack.includes(query);
  }).slice(0, 12);

  const curated = SEARCH_SUGGESTIONS.filter(
    (item) =>
      item.label.toLowerCase().includes(query) ||
      item.query.toLowerCase().includes(query) ||
      item.meta?.toLowerCase().includes(query),
  );

  // Surface clinical services by name when query matches
  const clinicalFromServices: SearchSuggestion[] = CLINICAL_SERVICES.filter(
    (service) =>
      service.name.toLowerCase().includes(query) ||
      service.description.toLowerCase().includes(query),
  ).map((service) => ({
    id: `clinical-${service.id}`,
    query,
    label: service.name,
    intent: "clinical" as const,
    href: service.href,
    meta: service.availableToday
      ? "Available today · book a slot"
      : "Call to confirm availability",
  }));

  const clinical = uniqueSuggestions([
    ...curated.filter((item) => item.intent === "clinical"),
    ...clinicalFromServices,
  ]);
  const pharmacy = curated.filter((item) => item.intent === "pharmacy");

  return {
    query,
    didYouMean,
    retail,
    curated,
    clinical,
    pharmacy,
  };
}

function uniqueSuggestions(items: SearchSuggestion[]): SearchSuggestion[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}

export function intentSectionTitle(intent: SearchIntent): string {
  switch (intent) {
    case "clinical":
      return "Clinical services";
    case "pharmacy":
      return "Pharmacy";
    case "retail":
      return "Products";
    default:
      return "Results";
  }
}
