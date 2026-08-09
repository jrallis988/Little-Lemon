import type { SanitizedArticle, SearchResult } from "@/types";
import { extractDomain } from "@/lib/utils";
import { invokeCommand, isTauriRuntime } from "@/services/tauriBridge";
import { sanitizeArticleContent } from "@/services/contentSanitizer";

type FetchArticleResponse = {
  url: string;
  title: string;
  source: string;
  content_html?: string;
  contentHtml?: string;
  estimated_minutes?: number;
  estimatedMinutes?: number;
  fetched_live?: boolean;
  fetchedLive?: boolean;
};

/**
 * Build a reader-mode article: prefer live fetch of allowlisted pages (Tauri),
 * otherwise assemble a structured educational reader from search metadata.
 */
export async function loadReadableArticle(input: {
  url: string;
  title: string;
  description: string;
  sourceBadge: string;
  citation?: string;
  vocabulary?: string[];
}): Promise<SanitizedArticle> {
  if (await isTauriRuntime()) {
    const raw = await invokeCommand<FetchArticleResponse>("fetch_article", {
      url: input.url,
    });
    if (raw?.contentHtml || raw?.content_html) {
      return {
        url: raw.url || input.url,
        title: raw.title || input.title,
        source: raw.source || extractDomain(input.url),
        contentHtml: raw.contentHtml ?? raw.content_html ?? "",
        estimatedMinutes:
          raw.estimatedMinutes ?? raw.estimated_minutes ?? 4,
        citation: input.citation,
        vocabulary: input.vocabulary,
        fetchedLive: raw.fetchedLive ?? raw.fetched_live ?? true,
      };
    }
  }

  // Web / fallback: structured reader from trusted metadata (no CORS scrape).
  return buildStructuredReader(input);
}

export function buildStructuredReader(input: {
  url: string;
  title: string;
  description: string;
  sourceBadge: string;
  citation?: string;
  vocabulary?: string[];
}): SanitizedArticle {
  const base = sanitizeArticleContent({
    url: input.url,
    title: input.title,
    description: input.description,
    sourceBadge: input.sourceBadge,
  });

  const vocabBlock =
    input.vocabulary && input.vocabulary.length
      ? `<section class="vocab"><h2>Key vocabulary</h2><ul>${input.vocabulary
          .map((term) => `<li>${escapeHtml(term)}</li>`)
          .join("")}</ul></section>`
      : "";
  const citationBlock = input.citation
    ? `<p class="citation"><strong>Citation:</strong> ${escapeHtml(input.citation)}</p>`
    : "";
  const linkBlock = `<p class="source-link"><a href="${escapeHtml(input.url)}" rel="noreferrer">Open original source</a> (parent-approved domains only)</p>`;

  const contentHtml = base.contentHtml
    .replace(
      '<p class="calm-note">',
      `${vocabBlock}${citationBlock}${linkBlock}<p class="calm-note">`,
    );

  return {
    ...base,
    contentHtml,
    citation: input.citation,
    vocabulary: input.vocabulary,
    fetchedLive: false,
  };
}

export function searchResultToReaderInput(result: SearchResult) {
  return {
    url: result.url,
    title: result.title,
    description: result.description,
    sourceBadge: result.sourceBadge,
    citation: result.citation,
    vocabulary: result.vocabulary,
  };
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
