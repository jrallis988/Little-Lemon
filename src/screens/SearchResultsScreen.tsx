import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { BadgeCheck, Clock3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { runCuratedSearch } from "@/data/curatedContent";
import { useUrlInterceptor } from "@/hooks/useUrlInterceptor";
import { useNavigationStore } from "@/stores/navigationStore";

/** Screen 2 — Search Results: curated 6–8 calm cards */
export function SearchResultsScreen() {
  const [params] = useSearchParams();
  const q = params.get("q") ?? "";
  const results = useNavigationStore((s) => s.results);
  const setResults = useNavigationStore((s) => s.setResults);
  const setQuery = useNavigationStore((s) => s.setQuery);
  const { openSearchResult, search } = useUrlInterceptor();

  useEffect(() => {
    if (!q) return;
    setQuery(q);
    setResults(runCuratedSearch(q));
  }, [q, setQuery, setResults]);

  return (
    <section className="animate-fade-in pb-16">
      <header className="mb-8 max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-[0.14em] text-sage">
          Curated results
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-navy md:text-4xl">
          {q || "Your search"}
        </h1>
        <p className="mt-3 text-slate">
          A short list from trusted educational sources — no ads, no clutter.
        </p>
      </header>

      <div className="grid gap-4">
        {results.map((result, index) => (
          <article
            key={result.id}
            className="rounded-3xl border border-white/60 bg-white/75 p-5 shadow-soft backdrop-blur-sm animate-rise-in"
            style={{ animationDelay: `${index * 60}ms` }}
          >
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-sage-soft px-3 py-1 text-xs font-semibold text-sage-deep">
                <BadgeCheck className="h-3.5 w-3.5" />
                {result.sourceBadge}
              </span>
              <span className="text-xs text-slate">{result.domain}</span>
              {result.readingMinutes && (
                <span className="inline-flex items-center gap-1 text-xs text-slate">
                  <Clock3 className="h-3.5 w-3.5" />
                  {result.readingMinutes} min
                </span>
              )}
            </div>
            <h2 className="font-display text-xl font-semibold text-navy">
              {result.title}
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate">
              {result.description}
            </p>
            <div className="mt-4">
              <Button onClick={() => openSearchResult(result)}>
                Open in reader
              </Button>
            </div>
          </article>
        ))}
      </div>

      {results.length === 0 && (
        <div className="rounded-3xl bg-white/70 p-8 text-center shadow-soft">
          <p className="text-slate">No results yet. Try a new search.</p>
          <Button className="mt-4" onClick={() => search("coral reefs")}>
            Search coral reefs
          </Button>
        </div>
      )}
    </section>
  );
}
