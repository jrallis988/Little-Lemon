import { useEffect, useMemo, useState } from "react";
import PageShell from "../components/PageShell";
import LabCard from "../components/LabCard";
import labProjects, { labCategories } from "../data/lab";

export default function LabPage() {
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Lab — James Rallis";
    return () => {
      document.title = "James Rallis — Front-End Engineer & Multimedia Designer";
    };
  }, []);

  const visible = useMemo(() => {
    if (filter === "All") return labProjects;
    return labProjects.filter((project) => project.categories?.includes(filter));
  }, [filter]);

  const availableCategories = useMemo(() => {
    const present = new Set(labProjects.flatMap((project) => project.categories || []));
    return labCategories.filter((category) => category === "All" || present.has(category));
  }, []);

  return (
    <PageShell>
      <section className="relative overflow-hidden bg-ink-soft pb-16 pt-28 md:pb-20 md:pt-36">
        <div className="absolute inset-0 hero-wash opacity-40" aria-hidden="true" />
        <div className="grain" aria-hidden="true" />
        <div className="container relative max-w-3xl stagger">
          <p className="reveal mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-foam">
            Lab
          </p>
          <h1 className="reveal font-display text-4xl font-bold text-chalk md:text-6xl">
            Experiments, prototypes & things I’m building.
          </h1>
          <p className="reveal mt-5 text-base leading-relaxed text-sand/85 md:text-lg">
            Smaller technical projects and interactive prototypes that don’t need a full case study—
            but still show how I explore front-end craft.
          </p>
        </div>
      </section>

      <section className="bg-ink py-16 md:py-24">
        <div className="container">
          <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filter lab projects">
            {availableCategories.map((category) => {
              const active = filter === category;
              return (
                <button
                  key={category}
                  type="button"
                  className={`border px-3 py-2 text-sm transition-colors ${
                    active
                      ? "border-foam bg-foam/15 text-foam-soft"
                      : "border-sand/20 text-sand/80 hover:border-foam hover:text-foam-soft"
                  }`}
                  aria-pressed={active}
                  onClick={() => setFilter(category)}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <div className="stagger">
            {visible.length ? (
              visible.map((project) => <LabCard key={project.id} project={project} />)
            ) : (
              <p className="text-base text-sand/75">No experiments in this category yet.</p>
            )}
            <div className="border-t border-sand/14" aria-hidden="true" />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
