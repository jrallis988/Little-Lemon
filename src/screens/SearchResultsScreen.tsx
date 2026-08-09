import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  BadgeCheck,
  BookMarked,
  BookOpen,
  Clock3,
  Quote,
  RotateCcw,
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
import { useProfileStore } from "@/stores/profileStore";
import { useProjectsStore } from "@/stores/projectsStore";
import { ACADEMIC_TIERS, GRADE_BANDS, gradeToBand } from "@/lib/constants";
import { MILO_NAME } from "@/brand/identity";
import type {
  AcademicContentTier,
  AcademicSearchHit,
  GradeBandId,
  SearchResult,
} from "@/types";
import { cn } from "@/lib/utils";

type SourceTypeId = AcademicContentTier;

/** Screen 2 — Academic Search Results with EBSCO-style Refine Results facets */
export function SearchResultsScreen() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const q = params.get("q") ?? "";
  const academic = useNavigationStore((s) => s.academicResponse);
  const setResults = useNavigationStore((s) => s.setResults);
  const setAcademicResponse = useNavigationStore((s) => s.setAcademicResponse);
  const setQuery = useNavigationStore((s) => s.setQuery);
  const setMiloOpen = useNavigationStore((s) => s.setMiloOpen);
  const profile = useProfileStore((s) => s.getActiveProfile());
  const projects = useProjectsStore((s) => s.projects);
  const createProject = useProjectsStore((s) => s.createProject);
  const addSource = useProjectsStore((s) => s.addSource);
  const activeProjectId = useProjectsStore((s) => s.activeProjectId);
  const setActiveProject = useProjectsStore((s) => s.setActiveProject);
  const { openSearchResult, search } = useUrlInterceptor();

  /** Multi-select source types — empty means “all types” (EBSCO default) */
  const [selectedTypes, setSelectedTypes] = useState<SourceTypeId[]>([]);
  const [band, setBand] = useState<GradeBandId | "all">("all");
  const [peerReviewedOnly, setPeerReviewedOnly] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saveNotice, setSaveNotice] = useState("");
  /** Unfiltered hit set for stable facet counts (like EBSCO) */
  const [catalog, setCatalog] = useState<AcademicSearchHit[]>([]);

  useEffect(() => {
    if (!profile?.grade) return;
    setBand((current) =>
      current === "all" ? gradeToBand(profile.grade) : current,
    );
  }, [profile?.grade]);

  useEffect(() => {
    if (!q) return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      setQuery(q);
      const response = await runAcademicSearch(q, {
        grade: profile?.grade,
        gradeBand: band === "all" ? undefined : band,
        limit: 12,
      });
      if (cancelled) return;
      setCatalog(response.results);
      setAcademicResponse(response);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [q, band, profile?.grade, setAcademicResponse, setQuery]);

  const sourceTypeCounts = useMemo(() => {
    const counts = new Map<SourceTypeId, number>();
    for (const hit of catalog) {
      counts.set(hit.contentTier, (counts.get(hit.contentTier) ?? 0) + 1);
    }
    return counts;
  }, [catalog]);

  const visibleHits = useMemo(() => {
    return catalog.filter((hit) => {
      if (peerReviewedOnly) {
        const peerish =
          hit.contentTier === "peer_reviewed_journal" ||
          hit.contentTier === "authoritative_research";
        if (!peerish) return false;
      }
      if (selectedTypes.length === 0) return true;
      return selectedTypes.includes(hit.contentTier);
    });
  }, [catalog, peerReviewedOnly, selectedTypes]);

  const visibleResults: SearchResult[] = useMemo(
    () => academicHitsToSearchResults(visibleHits),
    [visibleHits],
  );

  useEffect(() => {
    setResults(visibleResults);
  }, [setResults, visibleResults]);

  const toggleType = (id: SourceTypeId) => {
    setSelectedTypes((current) =>
      current.includes(id)
        ? current.filter((value) => value !== id)
        : [...current, id],
    );
  };

  const clearFilters = () => {
    setSelectedTypes([]);
    setBand(profile?.grade ? gradeToBand(profile.grade) : "all");
    setPeerReviewedOnly(false);
  };

  const myProjects = useMemo(
    () => projects.filter((project) => project.profileId === profile?.id),
    [projects, profile?.id],
  );

  const saveResultToProject = (result: SearchResult) => {
    if (!profile) {
      setSaveNotice("Choose a student profile first.");
      return;
    }
    let projectId = activeProjectId;
    const activeMine = myProjects.find((project) => project.id === projectId);
    if (!activeMine) {
      projectId = createProject({
        profileId: profile.id,
        title: q ? `${q} research` : "Research project",
        topic: q,
      });
      setActiveProject(projectId);
    }
    addSource(projectId!, {
      title: result.title,
      url: result.url,
      domain: result.domain,
      publisher: result.publisher,
      abstractText: result.description,
      citation: result.citation ?? result.title,
      vocabulary: result.vocabulary ?? [],
      contentTier: result.contentTier,
    });
    setSaveNotice(`Saved to project`);
    window.setTimeout(() => setSaveNotice(""), 2500);
  };

  const activeFilterCount =
    selectedTypes.length +
    (band === "all" ? 0 : 1) +
    (peerReviewedOnly ? 1 : 0);

  const totalInCatalog = catalog.length;

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
          Use Refine Results to limit by source type — Academic Journals,
          Magazines, Research Papers, and Reference Sources — just like a
          research database.
          {profile ? (
            <>
              {" "}
              Matching{" "}
              <span className="font-semibold text-navy">
                {profile.displayName}, grade {profile.grade}
              </span>
              .
            </>
          ) : null}
        </p>
        {academic?.sourcesUsed?.length ? (
          <p className="mt-2 text-xs text-slate">
            Sources: {academic.sourcesUsed.join(" + ")}
          </p>
        ) : null}
        {saveNotice && (
          <p className="mt-2 text-sm font-medium text-ocean">{saveNotice}</p>
        )}
      </header>

      <div className="grid gap-6 lg:grid-cols-[17.5rem_minmax(0,1fr)]">
        {/* —— EBSCO-style Refine Results sidebar —— */}
        <aside
          className="h-fit rounded-2xl border border-border/80 bg-white/90 p-4 shadow-soft lg:sticky lg:top-24"
          aria-label="Refine Results"
        >
          <div className="mb-4 flex items-center justify-between gap-2 border-b border-border/70 pb-3">
            <div>
              <p className="font-display text-base font-semibold text-navy">
                Refine Results
              </p>
              <p className="text-[11px] text-slate">
                {visibleHits.length} of {totalInCatalog} sources
              </p>
            </div>
            {activeFilterCount > 0 && (
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-ocean hover:underline"
              >
                <RotateCcw className="h-3 w-3" />
                Clear
              </button>
            )}
          </div>

          <section className="mb-5">
            <h2 className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-deep">
              Limit To
            </h2>
            <label className="flex cursor-pointer items-start gap-2.5 rounded-xl px-1 py-1.5 hover:bg-navy-mist/60">
              <input
                type="checkbox"
                className="mt-0.5 h-4 w-4 rounded border-border text-navy accent-navy"
                checked={peerReviewedOnly}
                onChange={(event) => setPeerReviewedOnly(event.target.checked)}
              />
              <span>
                <span className="block text-sm font-medium text-navy">
                  Peer Reviewed
                </span>
                <span className="block text-[11px] text-slate">
                  Journals & research papers only
                </span>
              </span>
            </label>
          </section>

          <section className="mb-5">
            <h2 className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-deep">
              Source Types
            </h2>
            <ul className="space-y-0.5" role="list">
              {ACADEMIC_TIERS.map((item) => {
                const count = sourceTypeCounts.get(item.id) ?? 0;
                const checked = selectedTypes.includes(item.id);
                const disabled = count === 0;
                return (
                  <li key={item.id}>
                    <label
                      className={cn(
                        "flex cursor-pointer items-center justify-between gap-2 rounded-xl px-1 py-2 hover:bg-navy-mist/60",
                        disabled && "cursor-not-allowed opacity-45",
                        checked && "bg-navy-mist/80",
                      )}
                    >
                      <span className="flex min-w-0 items-start gap-2.5">
                        <input
                          type="checkbox"
                          className="mt-0.5 h-4 w-4 shrink-0 rounded border-border text-navy accent-navy"
                          checked={checked}
                          disabled={disabled}
                          onChange={() => toggleType(item.id)}
                          aria-label={`Filter by ${item.label}`}
                        />
                        <span className="min-w-0">
                          <span className="block text-sm font-medium text-navy">
                            {item.label}
                          </span>
                          <span className="block text-[11px] leading-snug text-slate">
                            {item.description}
                          </span>
                        </span>
                      </span>
                      <span
                        className={cn(
                          "shrink-0 rounded-md bg-cream px-1.5 py-0.5 text-[11px] font-semibold tabular-nums text-slate-deep",
                          checked && "bg-navy text-foam",
                        )}
                      >
                        {count}
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
            <p className="mt-2 text-[11px] leading-relaxed text-slate">
              Tip: check <strong className="font-semibold text-slate-deep">Magazines</strong>{" "}
              or{" "}
              <strong className="font-semibold text-slate-deep">
                Academic Journals
              </strong>{" "}
              to narrow the list the way EBSCO does.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-deep">
              Grade Level
            </h2>
            <ul className="space-y-0.5" role="list">
              <li>
                <label className="flex cursor-pointer items-center gap-2.5 rounded-xl px-1 py-2 hover:bg-navy-mist/60">
                  <input
                    type="radio"
                    name="grade-band"
                    className="h-4 w-4 accent-navy"
                    checked={band === "all"}
                    onChange={() => setBand("all")}
                  />
                  <span className="text-sm font-medium text-navy">
                    All grades
                  </span>
                </label>
              </li>
              {GRADE_BANDS.map((item) => (
                <li key={item.id}>
                  <label className="flex cursor-pointer items-center gap-2.5 rounded-xl px-1 py-2 hover:bg-navy-mist/60">
                    <input
                      type="radio"
                      name="grade-band"
                      className="h-4 w-4 accent-navy"
                      checked={band === item.id}
                      onChange={() => setBand(item.id)}
                    />
                    <span className="text-sm font-medium text-navy">
                      {item.label}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </section>
        </aside>

        {/* —— Results column —— */}
        <div className="min-w-0">
          {academic && (
            <div className="mb-5 grid gap-4 lg:grid-cols-[1.35fr_1fr]">
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
                    Filtered {academic.filteredOutFarms} low-legitimacy /
                    content-farm source(s)
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

          {/* Active filter summary strip */}
          <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-slate">
            <span className="font-medium text-navy">
              Showing {visibleHits.length} result
              {visibleHits.length === 1 ? "" : "s"}
            </span>
            {selectedTypes.length === 0 && !peerReviewedOnly ? (
              <span>· All source types</span>
            ) : (
              <>
                {peerReviewedOnly && (
                  <ActivePill
                    label="Peer Reviewed"
                    onRemove={() => setPeerReviewedOnly(false)}
                  />
                )}
                {selectedTypes.map((id) => {
                  const meta = ACADEMIC_TIERS.find((tier) => tier.id === id);
                  return (
                    <ActivePill
                      key={id}
                      label={meta?.label ?? id}
                      onRemove={() => toggleType(id)}
                    />
                  );
                })}
              </>
            )}
            {band !== "all" && (
              <ActivePill
                label={
                  GRADE_BANDS.find((item) => item.id === band)?.label ?? band
                }
                onRemove={() => setBand("all")}
              />
            )}
          </div>

          {loading && (
            <p className="mb-4 text-sm text-slate">
              Indexing academic sources…
            </p>
          )}

          <div className="grid gap-4">
            {visibleResults.map((result, index) => (
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
                  {result.contentTier && (
                    <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-navy">
                      {sourceTypeLabel(result.contentTier)}
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
                  <Button onClick={() => void openSearchResult(result)}>
                    Open in reader
                  </Button>
                  <Button variant="secondary" onClick={() => setMiloOpen(true)}>
                    {MILO_NAME}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => saveResultToProject(result)}
                  >
                    <BookMarked className="mr-1.5 h-4 w-4" />
                    Save to project
                  </Button>
                </div>
              </article>
            ))}
          </div>
          {myProjects.length > 0 && (
            <div className="mt-6">
              <Button
                variant="secondary"
                onClick={() =>
                  navigate(
                    activeProjectId
                      ? `/projects/${activeProjectId}`
                      : "/projects",
                  )
                }
              >
                Open research projects
              </Button>
            </div>
          )}

          {!loading && visibleResults.length === 0 && (
            <div className="rounded-3xl bg-white/70 p-8 text-center shadow-soft">
              <p className="text-slate">
                No sources match these Refine Results settings. Clear a source
                type or grade filter and try again.
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <Button variant="secondary" onClick={clearFilters}>
                  Clear filters
                </Button>
                <Button
                  onClick={() => {
                    clearFilters();
                    void search("Plate Tectonics");
                  }}
                >
                  Search Plate Tectonics
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function sourceTypeLabel(tier: AcademicContentTier): string {
  return ACADEMIC_TIERS.find((item) => item.id === tier)?.label ?? tier;
}

function ActivePill({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onRemove}
      className="inline-flex items-center gap-1 rounded-full bg-navy px-2.5 py-1 text-[11px] font-semibold text-foam"
      aria-label={`Remove ${label} filter`}
    >
      {label}
      <span aria-hidden>×</span>
    </button>
  );
}
