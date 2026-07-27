import type { Citation } from "@/types";

export type CitationFormat =
  | "apa"
  | "mla"
  | "chicago"
  | "harvard"
  | "bibtex";

function accessedDate(citation: Citation): Date {
  return new Date(citation.accessedAt);
}

function year(citation: Citation): string {
  const value = accessedDate(citation).getFullYear();
  return Number.isFinite(value) ? String(value) : "n.d.";
}

function readableDate(citation: Citation): string {
  return accessedDate(citation).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function authorOrTitle(citation: Citation): string {
  return citation.author?.trim() || citation.title;
}

function siteName(citation: Citation): string {
  return citation.siteName?.trim() || new URL(citation.url).hostname;
}

function bibtexKey(citation: Citation): string {
  const base = `${authorOrTitle(citation)} ${year(citation)}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return base || "surf-source";
}

export function formatApa(citation: Citation): string {
  const author = citation.author ? `${citation.author}. ` : "";
  return `${author}(${year(citation)}). ${citation.title}. ${siteName(citation)}. ${citation.url}`;
}

export function formatMla(citation: Citation): string {
  const author = citation.author ? `${citation.author}. ` : "";
  return `${author}"${citation.title}." ${siteName(citation)}, accessed ${readableDate(citation)}, ${citation.url}.`;
}

export function formatChicago(citation: Citation): string {
  const author = citation.author ? `${citation.author}. ` : "";
  return `${author}"${citation.title}." ${siteName(citation)}. Accessed ${readableDate(citation)}. ${citation.url}.`;
}

export function formatHarvard(citation: Citation): string {
  return `${authorOrTitle(citation)} (${year(citation)}) ${citation.title}. ${siteName(citation)}. Available at: ${citation.url} (Accessed: ${readableDate(citation)}).`;
}

export function formatBibtex(citation: Citation): string {
  return `@misc{${bibtexKey(citation)},
  title = {${citation.title}},
  author = {${citation.author ?? ""}},
  year = {${year(citation)}},
  howpublished = {\\url{${citation.url}}},
  note = {Accessed ${readableDate(citation)}}
}`;
}

export function formatCitation(
  citation: Citation,
  format: CitationFormat,
): string {
  switch (format) {
    case "apa":
      return formatApa(citation);
    case "mla":
      return formatMla(citation);
    case "chicago":
      return formatChicago(citation);
    case "harvard":
      return formatHarvard(citation);
    case "bibtex":
      return formatBibtex(citation);
    default:
      return formatApa(citation);
  }
}
