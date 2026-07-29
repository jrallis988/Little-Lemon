import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  BadgeCheck,
  BookOpen,
  Clock3,
  Filter,
  Quote,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  academicHitsToSearchResults,
  runAcademicSearch,
} from "@/services/academicSearch";
import { useUrlInterceptor } from "@/hooks/useUrlInterceptor";
import { useNavigationStore } from "@/stores/navigationStore";
import { ACADEMIC_TIERS, GRADE_BANDS } from "@/lib/constants";
import { MILO_NAME } from "@/brand/identity";
import type { AcademicContentTier, GradeBandId } from "@/types";
import { cn } from "@/lib/utils";

/** Screen 2 — Academic Search Results with EBSCO-style tier + grade filters */
export function SearchResultsScreen() {
  const [params] = useSearchParams();
  const q = params.get("q") ?? "";
  const results = useNavigationStore((s) => s.results);
  const academic = useNavigationStore((s) => s.academicResponse);
  const setResults = useNavigationStore((s) => s.setResults);
  const setAcademicResponse = useNavigationStore((s) => s.setAcademicResponse);
  const setQuery = useNavigationStore((s) => s.setQuery);
  const setMiloOpen = useNavigationStore((s) => s.setMiloOpen);
  const { openSearchResult, search } = useUrlInterceptor();

  const [tier, setTier] = useState<AcademicContentTier | "all">("all");
  const [band, setBand] = useState<GradeBandId | "all">("all");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!q) return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      setQuery(q);
      const response = await runAcademicSearch(q, {
        gradeBand: band === "all" ? undefined : band,
        tiers: tier === "all" ? undefined : [tier],
      });
      if (cancelled) return;
      setAcademicResponse(response);
      setResults(academicHitsToSearchResults(response.results));
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [q, tier, band, setAcademicResponse, setQuery, setResults]);

  const tierCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const hit of academic?.results ?? []) {
      counts.set(hit.contentTier, (counts.get(hit.contentTier) ?? 0) + 1);
    }
    return counts;
  }, [academic]);

  return (
    <section className="animate-fade-in pb-24">
      <header className="mb-6 max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-[0.14em] text-ocean">
          Academic research results
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-navy md:text-4xl">
          {q || "Your search"}
        </h1>
        <p className="mt-3 text-slate">
          EBSCO-style tiered filtering from verified educational repositories —
          abstracts, vocabulary, grade tags, and citations included.
        </p>
      </header>

      {academic && (
        <div className="mb-6 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <article className="rounded-3xl border border-white/60 bg-white/80 p-5 shadow-soft">
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-ocean">
              <BookOpen className="h-3.5 w-3.5" />
              Research briefing
            </div>
            <p className="text-sm leading-relaxed text-slate-deep">
              {academic.abstractSummary}
            </p>
            {academic.filteredOutFarms > 0 && (
              <p className="mt-3 inline-flex items-center gap-1 text-xs text-slate">
                <ShieldCheck className="h-3.5 w-3.5 text-ocean" />
                Filtered {academic.filteredOutFarms} low-legitimacy / content-farm
                source(s)
              </p>
            )}
          </article>

          <article className="rounded-3xl border border-white/60 bg-white/80 p-5 shadow-soft">
            <div className="mb-2 flex items-center justify-between gap-2">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ocean">
                Key vocabulary
              </p>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => setMiloOpen(true)}
              >
                <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                {MILO_NAME}
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {(academic.keyVocabulary.length
                ? academic.keyVocabulary
                : ["Search to load vocabulary"]
              ).map((term) => (
                <span
                  key={term}
                  className="rounded-full bg-navy-mist px-3 py-1 text-xs font-medium text-navy"
                >
                  {term}
                </span>
              ))}
            </div>
            {academic.recommendedGradeLevels.length > 0 && (
              <p className="mt-3 text-xs text-slate">
                Recommended levels:{" "}
                {academic.recommendedGradeLevels.join(" · ")}
              </p>
            )}
          </article>
        </div>
      )}

      <div className="mb-5 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate">
          <Filter className="h-3.5 w-3.5" />
          Content tier
        </span>
        <FilterChip
          active={tier === "all"}
          onClick={() => setTier("all")}
          label="All tiers"
        />
        {ACADEMIC_TIERS.map((item) => (
          <FilterChip
            key={item.id}
            active={tier === item.id}
            onClick={() => setTier(item.id)}
            label={`${item.label}${tierCounts.has(item.id) ? ` (${tierCounts.get(item.id)})` : ""}`}
          />
        ))}
      </div>

      <div className="mb-8 flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate">
          Grade band
        </span>
        <FilterChip
          active={band === "all"}
          onClick={() => setBand("all")}
          label="All grades"
        />
        {GRADE_BANDS.map((item) => (
          <FilterChip
            key={item.id}
            active={band === item.id}
            onClick={() => setBand(item.id)}
            label={item.label}
          />
        ))}
      </div>

      {loading && (
        <p className="mb-4 text-sm text-slate">Indexing academic sources…</p>
      )}

      <div className="grid gap-4">
        {results.map((result, index) => (
          <article
            key={result.id}
            className="rounded-3xl border border-white/60 bg-white/75 p-5 shadow-soft backdrop-blur-sm animate-rise-in"
            style={{ animationDelay: `${index * 60}ms` }}
          >
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-navy-mist px-3 py-1 text-xs font-semibold text-navy">
                <BadgeCheck className="h-3.5 w-3.5 text-ocean" />
                {result.sourceBadge}
              </span>
              {result.contentTierLabel && (
                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-navy">
                  {result.contentTierLabel}
                </span>
              )}
              {result.recommendedGrades && (
                <span className="rounded-full bg-cream px-3 py-1 text-xs font-medium text-slate-deep">
                  {result.recommendedGrades}
                </span>
              )}
              {typeof result.legitimacyScore === "number" && (
                <span className="inline-flex items-center gap-1 text-xs text-slate">
                  <ShieldCheck className="h-3.5 w-3.5 text-ocean" />
                  Legitimacy {result.legitimacyScore}
                </span>
              )}
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
            {result.vocabulary && result.vocabulary.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {result.vocabulary.slice(0, 6).map((term) => (
                  <span
                    key={term}
                    className="rounded-full border border-border/80 px-2.5 py-0.5 text-[11px] text-slate-deep"
                  >
                    {term}
                  </span>
                ))}
              </div>
            )}
            {result.citation && (
              <p className="mt-3 inline-flex items-start gap-1.5 text-xs leading-relaxed text-slate">
                <Quote className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                {result.citation}
              </p>
            )}
            <div className="mt-4 flex flex-wrap gap-2">
              <Button onClick={() => openSearchResult(result)}>
                Open in reader
              </Button>
              <Button
                variant="secondary"
                onClick={() => setMiloOpen(true)}
              >
                {MILO_NAME}
              </Button>
            </div>
          </article>
        ))}
      </div>

      {!loading && results.length === 0 && (
        <div className="rounded-3xl bg-white/70 p-8 text-center shadow-soft">
          <p className="text-slate">
            No verified academic sources matched this filter set.
          </p>
          <Button
            className="mt-4"
            onClick={() => {
              setTier("all");
              setBand("all");
              void search("Plate Tectonics");
            }}
          >
            Search Plate Tectonics
          </Button>
        </div>
      )}
    </section>
  );
}

function FilterChip({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full px-3 py-1.5 text-xs font-medium transition",
        active
          ? "bg-navy text-foam shadow-soft"
          : "bg-white/80 text-slate hover:bg-white hover:text-navy",
      )}
    >
      {label}
    </button>
  );
}
