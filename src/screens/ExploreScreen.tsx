import { Link } from "react-router-dom";
import { ArrowUpRight, GraduationCap } from "lucide-react";
import { EXPLORE_CATEGORIES } from "@/data/curatedContent";
import { topicPacksForGrade, TOPIC_PACKS } from "@/data/topicPacks";
import { useProfileStore } from "@/stores/profileStore";
import { useUrlInterceptor } from "@/hooks/useUrlInterceptor";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/routes/paths";

/** Screen 4 — Explore: topic packs + curated themes that funnel into search */
export function ExploreScreen() {
  const profile = useProfileStore((s) => s.getActiveProfile());
  const { search } = useUrlInterceptor();
  const packs = profile
    ? topicPacksForGrade(profile.grade)
    : TOPIC_PACKS.slice(0, 6);

  return (
    <section className="animate-fade-in pb-16">
      <header className="mb-10 max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-[0.14em] text-ocean">
          Explore
        </p>
        <h1 className="mt-2 font-display text-4xl font-semibold text-navy">
          Start with a spark
        </h1>
        <p className="mt-3 text-slate">
          Classroom topic packs and themes that open focused academic search —
          never a feed.
          {profile ? (
            <>
              {" "}
              Showing packs for{" "}
              <span className="font-semibold text-navy">
                grade {profile.grade}
              </span>
              .
            </>
          ) : null}
        </p>
      </header>

      <div className="mb-10">
        <div className="mb-4 flex items-center gap-2 text-navy">
          <GraduationCap className="h-5 w-5 text-ocean" />
          <h2 className="font-display text-2xl font-semibold">
            Classroom topic packs
          </h2>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {packs.map((pack) => (
            <article
              key={pack.id}
              className="rounded-3xl border border-white/60 bg-white/80 p-5 shadow-soft"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ocean">
                {pack.subject} · Grades {pack.gradeMin}–{pack.gradeMax}
              </p>
              <h3 className="mt-2 font-display text-xl font-semibold text-navy">
                {pack.title}
              </h3>
              <p className="mt-2 text-sm text-slate">{pack.summary}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {pack.vocabulary.slice(0, 4).map((term) => (
                  <span
                    key={term}
                    className="rounded-full bg-navy-mist px-2.5 py-0.5 text-[11px] font-medium text-navy"
                  >
                    {term}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-xs text-slate">
                Essential question: {pack.essentialQuestions[0]}
              </p>
              <Button
                className="mt-4"
                size="sm"
                onClick={() => void search(pack.searchPrompt)}
              >
                Research this pack
              </Button>
            </article>
          ))}
        </div>
      </div>

      <h2 className="mb-4 font-display text-2xl font-semibold text-navy">
        Themes
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {EXPLORE_CATEGORIES.map((category, index) => (
          <Link
            key={category.id}
            to={`/explore/${category.id}`}
            className="group rounded-3xl border border-white/60 bg-white/70 p-6 shadow-soft transition hover:-translate-y-0.5 hover:bg-white animate-rise-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div
              className="mb-5 h-2 w-16 rounded-full"
              style={{ backgroundColor: category.accent }}
            />
            <div className="flex items-start justify-between gap-3">
              <h2 className="font-display text-2xl font-semibold text-navy">
                {category.title}
              </h2>
              <ArrowUpRight className="h-5 w-5 text-slate transition group-hover:text-navy" />
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate">
              {category.description}
            </p>
          </Link>
        ))}
      </div>

      <p className="mt-8 text-sm text-slate">
        Prefer typing?{" "}
        <Link to={ROUTES.home} className="font-semibold text-navy underline">
          Go to Surf Search
        </Link>
      </p>
    </section>
  );
}
