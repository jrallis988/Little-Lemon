import type { ArticleReadability, SanitizedArticle, SearchResult } from "@/types";
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

const ERROR_TITLE_MARKERS = [
  "404",
  "page not found",
  "not found",
  "access denied",
  "forbidden",
  "unavailable",
  "just a moment",
  "attention required",
];

const ERROR_BODY_MARKERS = [
  "page not found",
  "404 page",
  "we can't find that page",
  "this page does not exist",
  "http 404",
  "error 404",
  "access denied",
  "enable javascript",
  "checking your browser",
  "verify you are human",
];

/**
 * Always-on reader: Tauri native fetch → Jina reader proxy (URL variants) →
 * rich structured research card. Never dumps raw 404 HTML into reader mode.
 */
export async function loadReadableArticle(input: {
  url: string;
  title: string;
  description: string;
  sourceBadge: string;
  citation?: string;
  vocabulary?: string[];
}): Promise<SanitizedArticle> {
  const candidates = urlCandidates(input.url);

  if (await isTauriRuntime()) {
    for (const candidate of candidates) {
      const raw = await invokeCommand<FetchArticleResponse>("fetch_article", {
        url: candidate,
      });
      const html = raw?.contentHtml ?? raw?.content_html ?? "";
      if (raw && html && !looksUnreadable(raw.title || input.title, html)) {
        return decorate(
          {
            url: raw.url || candidate,
            title: raw.title || input.title,
            source: raw.source || extractDomain(candidate),
            contentHtml: html,
            estimatedMinutes:
              raw.estimatedMinutes ?? raw.estimated_minutes ?? 4,
            fetchedLive: true,
            readability: "live",
          },
          input,
        );
      }
    }
  }

  for (const candidate of candidates) {
    const jina = await fetchViaJina(candidate, input.title);
    if (jina && jina.readability === "live") {
      return decorate(jina, input);
    }
  }

  const structured = decorate(buildStructuredReader(input), input);
  return {
    ...structured,
    readability: "structured",
    readabilityNote:
      "Surf couldn’t open a clean live copy of this page, so you’re seeing a structured research card from search metadata instead. Try another verified source from your results.",
    fetchedLive: false,
  };
}

/** Prefer https, www/non-www, and trailing-slash variants. */
export function urlCandidates(rawUrl: string): string[] {
  let normalized = rawUrl.trim();
  if (!/^https?:\/\//i.test(normalized)) {
    normalized = `https://${normalized}`;
  }
  let parsed: URL;
  try {
    parsed = new URL(normalized);
  } catch {
    return [normalized];
  }
  parsed.protocol = "https:";
  const host = parsed.hostname.replace(/^www\./i, "");
  const path = parsed.pathname.replace(/\/$/, "") || "/";
  const search = parsed.search;

  const out: string[] = [];
  const push = (value: string) => {
    if (!out.includes(value)) out.push(value);
  };
  push(`https://${host}${path === "/" ? "/" : path}${search}`);
  push(`https://www.${host}${path === "/" ? "/" : path}${search}`);
  if (path !== "/") {
    push(`https://${host}${path}/${search}`);
    push(`https://www.${host}${path}/${search}`);
  }
  // Keep the original form first if it differs
  return [normalized, ...out.filter((value) => value !== normalized)].slice(
    0,
    4,
  );
}

export function looksUnreadable(title: string, body: string): boolean {
  const hayTitle = title.toLowerCase();
  const hayBody = body.toLowerCase();
  // Avoid treating titles like "Terror" / research words as errors; require clear markers.
  if (
    ERROR_TITLE_MARKERS.some((marker) => hayTitle.includes(marker)) ||
    /\b404\b/.test(hayTitle)
  ) {
    return true;
  }
  const hits = ERROR_BODY_MARKERS.filter((marker) => hayBody.includes(marker));
  const plain = body.replace(/<[^>]+>/g, " ").trim();
  if (hits.length >= 1 && plain.length < 900) return true;
  if (hits.length >= 2) return true;
  if (plain.length < 120) return true;
  return false;
}

async function fetchViaJina(
  url: string,
  fallbackTitle: string,
): Promise<SanitizedArticle | null> {
  try {
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 10000);
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

    if (looksUnreadable(title, body)) {
      return null;
    }

    const paragraphs = body
      .split(/\n{2,}/)
      .map((part) => part.trim())
      .filter((part) => part.length > 40)
      .filter((part) => !looksLikeMarkdownChrome(part))
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
      readability: "live" satisfies ArticleReadability,
    };
  } catch {
    return null;
  }
}

function looksLikeMarkdownChrome(part: string): boolean {
  return (
    part.startsWith("![") ||
    /^image\s+\d+/i.test(part) ||
    (part.includes("U.S. flag") && part.length < 80)
  );
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
  const studyBlock = `<section class="study-moves"><h2>Study moves</h2><ul>
    <li>Underline one claim and one piece of evidence in the abstract above.</li>
    <li>Rewrite the main idea in one sentence using your own words.</li>
    <li>Ask Milo to quiz you on a vocabulary word before you cite this source.</li>
  </ul></section>`;
  const citationBlock = input.citation
    ? `<p class="citation"><strong>Citation:</strong> ${escapeHtml(input.citation)}</p>`
    : "";
  const linkBlock = `<p class="source-link"><a href="${escapeHtml(input.url)}" rel="noreferrer">Open original source</a> (parent-approved domains only)</p>`;

  const contentHtml = base.contentHtml.replace(
    '<p class="calm-note">',
    `${vocabBlock}${studyBlock}${citationBlock}${linkBlock}<p class="calm-note">`,
  );

  return {
    ...base,
    contentHtml,
    citation: input.citation,
    vocabulary: input.vocabulary,
    fetchedLive: false,
    readability: "structured",
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
