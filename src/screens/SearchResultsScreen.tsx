import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  BadgeCheck,
  BookOpen,
  Clock3,
  Film,
  GraduationCap,
  Image as ImageIcon,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBrowserActions } from "@/hooks/useBrowserActions";
import { useSearchStore } from "@/stores/searchStore";
import { cn } from "@/lib/utils";
import type { EducationalSearchResult } from "@/types";

type ResultFilter = "all" | "article" | "video" | "image" | "reference" | "document";

function matchesFilter(result: EducationalSearchResult, filter: ResultFilter) {
  if (filter === "all") return true;
  return (result.result_type || "article") === filter;
}

const FILTERS: Array<{ id: ResultFilter; label: string }> = [
  { id: "all", label: "All" },
  { id: "article", label: "Articles" },
  { id: "video", label: "Videos" },
  { id: "image", label: "Images" },
  { id: "reference", label: "Reference" },
  { id: "document", label: "PDFs" },
];

/** Live educational search results from the Surf desktop backend. */
export function SearchResultsScreen() {
  const [params, setParams] = useSearchParams();
  const q = params.get("q") ?? "";
  const filter = (params.get("type") as ResultFilter | null) ?? "all";
  const results = useSearchStore((state) => state.results);
  const status = useSearchStore((state) => state.status);
  const errorMessage = useSearchStore((state) => state.errorMessage);
  const runSearch = useSearchStore((state) => state.search);
  const { openSearchResult, openSearch } = useBrowserActions();

  useEffect(() => {
    if (!q) return;
    void runSearch(q);
  }, [q, runSearch]);

  const filtered = results.filter((result) => matchesFilter(result, filter));

  return (
    <section className="animate-fade-in pb-24 md:pb-16">
      <header className="mb-6 max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-[0.14em] text-ocean">
          Educational search
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-navy md:text-4xl">
          {q || "Your search"}
        </h1>
        <p className="mt-3 text-slate">
          Live results from approved educational sources — articles, videos,
          images, and references when available.
        </p>
      </header>

      <div className="mb-6 flex flex-wrap gap-2">
        {FILTERS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={cn(
              "rounded-full px-3 py-1.5 text-sm font-semibold transition",
              filter === item.id
                ? "bg-navy text-foam"
                : "bg-white/80 text-slate hover:bg-white",
            )}
            onClick={() => {
              const next = new URLSearchParams(params);
              if (item.id === "all") next.delete("type");
              else next.set("type", item.id);
              setParams(next, { replace: true });
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      {status === "loading" && (
        <div className="rounded-3xl bg-white/70 p-8 text-center shadow-soft">
          <RefreshCw className="mx-auto h-6 w-6 animate-spin text-ocean" />
          <p className="mt-3 text-slate">Searching trusted learning sources...</p>
        </div>
      )}

      {status === "error" && (
        <div className="rounded-3xl border border-destructive/20 bg-white/80 p-8 shadow-soft">
          <h2 className="font-display text-2xl font-semibold text-navy">
            Search is unavailable
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate">
            {errorMessage ?? "Educational search failed."}
          </p>
          {q && (
            <Button className="mt-5" onClick={() => void runSearch(q)}>
              Retry search
            </Button>
          )}
        </div>
      )}

      <div className="grid gap-4">
        {status === "success" &&
          filtered.map((result, index) => (
            <article
              key={result.id}
              className="rounded-3xl border border-white/60 bg-white/75 p-5 shadow-soft backdrop-blur-sm animate-rise-in"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <TypeBadge type={result.result_type || "article"} />
                <span className="inline-flex items-center gap-1 rounded-full bg-navy-mist px-3 py-1 text-xs font-semibold text-navy">
                  <BadgeCheck className="h-3.5 w-3.5 text-ocean" />
                  Trust {result.trust_score}/100
                </span>
                <span className="text-xs text-slate">{result.domain}</span>
                <span className="inline-flex items-center gap-1 text-xs text-slate">
                  <GraduationCap className="h-3.5 w-3.5" />
                  {result.reading_level}
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-slate">
                  <Clock3 className="h-3.5 w-3.5" />
                  {result.estimated_minutes} min
                </span>
              </div>
              <div className="flex items-start gap-3">
                {result.favicon_url && (
                  <img
                    src={result.favicon_url}
                    alt=""
                    className="mt-1 h-6 w-6 rounded"
                  />
                )}
                <div>
                  <h2 className="font-display text-xl font-semibold text-navy">
                    {result.title}
                  </h2>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-ocean">
                    {result.category} · {result.source}
                  </p>
                </div>
              </div>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate">
                {result.description}
              </p>
              <div className="mt-4">
                <Button onClick={() => openSearchResult(result)}>
                  Open learning page
                </Button>
              </div>
            </article>
          ))}
      </div>

      {status === "success" && filtered.length === 0 && (
        <div className="rounded-3xl bg-white/70 p-8 text-center shadow-soft">
          <p className="text-slate">
            No {filter === "all" ? "approved educational" : filter} results were
            returned for this search.
          </p>
          <Button className="mt-4" onClick={() => openSearch("coral reefs")}>
            Search coral reefs
          </Button>
        </div>
      )}
    </section>
  );
}

function TypeBadge({ type }: { type: string }) {
  const meta =
    type === "video"
      ? { icon: Film, label: "Video" }
      : type === "image"
        ? { icon: ImageIcon, label: "Image" }
        : type === "document"
          ? { icon: BookOpen, label: "PDF" }
          : type === "reference"
            ? { icon: BookOpen, label: "Reference" }
            : { icon: BookOpen, label: "Article" };

  const Icon = meta.icon;
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-orange/15 px-3 py-1 text-xs font-semibold text-orange-deep">
      <Icon className="h-3.5 w-3.5" />
      {meta.label}
    </span>
  );
}
