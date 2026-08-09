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
 * Always-on reader: Tauri native fetch → Jina reader proxy → structured fallback.
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
      return decorate(
        {
          url: raw.url || input.url,
          title: raw.title || input.title,
          source: raw.source || extractDomain(input.url),
          contentHtml: raw.contentHtml ?? raw.content_html ?? "",
          estimatedMinutes:
            raw.estimatedMinutes ?? raw.estimated_minutes ?? 4,
          fetchedLive: true,
        },
        input,
      );
    }
  }

  const jina = await fetchViaJina(input.url, input.title);
  if (jina) return decorate(jina, input);

  return decorate(buildStructuredReader(input), input);
}

async function fetchViaJina(
  url: string,
  fallbackTitle: string,
): Promise<SanitizedArticle | null> {
  try {
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 12000);
    const response = await fetch(`https://r.jina.ai/${url}`, {
      headers: { Accept: "text/plain" },
      signal: controller.signal,
    });
    window.clearTimeout(timer);
    if (!response.ok) return null;
    const markdown = (await response.text()).trim();
    if (markdown.length < 80) return null;

    const titleMatch = markdown.match(/^Title:\s*(.+)$/m);
    const title = titleMatch?.[1]?.trim() || fallbackTitle;
    const body = markdown
      .replace(/^Title:.*$/m, "")
      .replace(/^URL Source:.*$/m, "")
      .replace(/^Published Time:.*$/m, "")
      .replace(/^Markdown Content:\s*/m, "")
      .trim();

    const paragraphs = body
      .split(/\n{2,}/)
      .map((part) => part.trim())
      .filter((part) => part.length > 40)
      .slice(0, 20)
      .map((part) => `<p>${escapeHtml(part.replace(/\n/g, " "))}</p>`)
      .join("");

    if (!paragraphs) return null;

    const contentHtml = `
    <article class="surf-reader">
      <header>
        <p class="source">${escapeHtml(extractDomain(url))}</p>
        <h1>${escapeHtml(title)}</h1>
      </header>
      ${paragraphs}
      <p class="calm-note">Fetched live through Surf reader mode. Ads and side chrome were removed.</p>
    </article>`;

    return {
      url,
      title,
      source: extractDomain(url),
      contentHtml,
      estimatedMinutes: Math.min(
        20,
        Math.max(2, Math.ceil(body.split(/\s+/).length / 160)),
      ),
      fetchedLive: true,
    };
  } catch {
    return null;
  }
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

  const contentHtml = base.contentHtml.replace(
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

function decorate(
  article: SanitizedArticle,
  input: {
    citation?: string;
    vocabulary?: string[];
  },
): SanitizedArticle {
  return {
    ...article,
    citation: article.citation ?? input.citation,
    vocabulary: article.vocabulary ?? input.vocabulary,
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
