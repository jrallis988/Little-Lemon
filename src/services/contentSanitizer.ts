import type { SanitizedArticle } from "@/types";
import { extractDomain } from "@/lib/utils";

/**
 * Lightweight reader-mode sanitizer.
 * Strips ads/trackers conceptually and returns calm readable HTML.
 */
export function sanitizeArticleContent(input: {
  url: string;
  title: string;
  description: string;
  sourceBadge: string;
}): SanitizedArticle {
  const paragraphs = input.description
    .split(/(?<=\.)\s+/)
    .filter(Boolean)
    .map((p) => `<p>${escapeHtml(p.trim())}</p>`)
    .join("");

  const contentHtml = `
    <article class="surf-reader">
      <header>
        <p class="source">${escapeHtml(input.sourceBadge)}</p>
        <h1>${escapeHtml(input.title)}</h1>
      </header>
      ${paragraphs}
      <p class="calm-note">Surf reader mode hides ads, sidebars, and trackers so you can focus on learning.</p>
    </article>
  `;

  return {
    url: input.url,
    title: input.title,
    source: extractDomain(input.url),
    contentHtml,
    estimatedMinutes: Math.max(2, Math.ceil(input.description.length / 420)),
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
