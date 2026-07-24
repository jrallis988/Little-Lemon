import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { EXPLORE_CATEGORIES } from "@/data/curatedContent";
import { ROUTES } from "@/routes/paths";

/** Screen 4 — Explore: curated inspiration that funnels into search */
export function ExploreScreen() {
  return (
    <section className="animate-fade-in pb-16">
      <header className="mb-10 max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-[0.14em] text-sage">
          Explore
        </p>
        <h1 className="mt-2 font-display text-4xl font-semibold text-navy">
          Start with a spark
        </h1>
        <p className="mt-3 text-slate">
          Pick a theme. Surf turns it into a focused search — not a feed.
        </p>
      </header>

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
