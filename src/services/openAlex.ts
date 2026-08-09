import type { AcademicContentTier, AcademicSearchHit } from "@/types";

type OpenAlexWork = {
  id?: string;
  display_name?: string;
  title?: string;
  publication_year?: number;
  doi?: string | null;
  abstract_inverted_index?: Record<string, number[]> | null;
  primary_location?: {
    source?: { display_name?: string; host_organization_name?: string | null };
    landing_page_url?: string | null;
    pdf_url?: string | null;
  } | null;
  authorships?: Array<{
    author?: { display_name?: string };
  }>;
  concepts?: Array<{ display_name?: string; score?: number }>;
  type?: string;
  cited_by_count?: number;
};

type OpenAlexResponse = {
  results?: OpenAlexWork[];
};

const OPENALEX_API = "https://api.openalex.org/works";

/**
 * Live academic works from OpenAlex (no API key required).
 * Mapped into Surf’s AcademicSearchHit shape and treated as peer-reviewed /
 * research tiers. Content farms never come from this API.
 */
export async function fetchOpenAlexHits(
  query: string,
  limit = 8,
): Promise<AcademicSearchHit[]> {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const url = new URL(OPENALEX_API);
  url.searchParams.set("search", trimmed);
  url.searchParams.set(
    "per_page",
    String(Math.min(25, Math.max(3, limit))),
  );
  url.searchParams.set(
    "filter",
    "type:article|type:review|type:book-chapter,language:en",
  );
  url.searchParams.set("mailto", "surf-edu@example.com");

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 9000);

  try {
    const response = await fetch(url.toString(), {
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });
    if (!response.ok) return [];
    const data = (await response.json()) as OpenAlexResponse;
    return (data.results ?? [])
      .map((work, index) => mapWork(work, trimmed, index))
      .filter((hit): hit is AcademicSearchHit => Boolean(hit))
      .slice(0, limit);
  } catch {
    return [];
  } finally {
    clearTimeout(timer);
  }
}

function mapWork(
  work: OpenAlexWork,
  query: string,
  index: number,
): AcademicSearchHit | null {
  const title = (work.display_name || work.title || "").trim();
  if (!title) return null;

  const landing =
    work.primary_location?.landing_page_url ||
    (work.doi ? `https://doi.org/${work.doi.replace(/^https?:\/\/doi.org\//, "")}` : null) ||
    work.id ||
    "";
  if (!landing) return null;

  let domain = "openalex.org";
  try {
    domain = new URL(landing).hostname.replace(/^www\./, "");
  } catch {
    /* keep openalex.org */
  }

  const publisher =
    work.primary_location?.source?.display_name ||
    work.primary_location?.source?.host_organization_name ||
    "OpenAlex";
  const abstractText =
    reconstructAbstract(work.abstract_inverted_index) ||
    `Peer-reviewed research related to “${query}” indexed by OpenAlex.`;
  const authors = (work.authorships ?? [])
    .slice(0, 3)
    .map((item) => item.author?.display_name)
    .filter(Boolean)
    .join(", ");
  const year = work.publication_year ?? new Date().getFullYear();
  const citation = authors
    ? `${authors}. "${title}." ${publisher}, ${year}. ${landing}`
    : `"${title}." ${publisher}, ${year}. ${landing}`;

  const vocabulary = (work.concepts ?? [])
    .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
    .map((concept) => concept.display_name)
    .filter((name): name is string => Boolean(name))
    .slice(0, 6);

  const contentTier: AcademicContentTier =
    work.type === "review" || (work.cited_by_count ?? 0) > 50
      ? "peer_reviewed_journal"
      : "authoritative_research";

  const legitimacyScore = Math.min(
    99,
    82 + Math.min(15, Math.floor((work.cited_by_count ?? 0) / 40)),
  );

  return {
    id: `openalex-${work.id?.split("/").pop() ?? index}`,
    title,
    url: landing,
    domain,
    publisher,
    contentTier,
    contentTierLabel:
      contentTier === "peer_reviewed_journal"
        ? "Academic Journals"
        : "Research Papers",
    gradeMin: 9,
    gradeMax: 12,
    recommendedGrades: "High School",
    abstractText: abstractText.slice(0, 600),
    vocabulary,
    citation,
    legitimacyScore,
    matchScore: Math.max(0.45, 1.2 - index * 0.05),
    readingMinutes: Math.min(
      12,
      Math.max(3, Math.ceil(abstractText.split(/\s+/).length / 140)),
    ),
  };
}

function reconstructAbstract(
  index: Record<string, number[]> | null | undefined,
): string {
  if (!index) return "";
  const slots: Array<{ word: string; pos: number }> = [];
  for (const [word, positions] of Object.entries(index)) {
    for (const pos of positions) slots.push({ word, pos });
  }
  slots.sort((a, b) => a.pos - b.pos);
  return slots
    .map((slot) => slot.word)
    .join(" ")
    .replace(/\s+([.,;:!?])/g, "$1");
}
