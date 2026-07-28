import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import Seo from "../components/Seo";
import {
  filterOptions,
  filterPrograms,
  images,
} from "../data/content";

const initialFilters = {
  area: "All",
  credential: "All",
  campus: "All",
  query: "",
};

export default function Programs() {
  const [filters, setFilters] = useState(initialFilters);

  const filtered = useMemo(() => filterPrograms(filters), [filters]);

  function updateFilter(key, value) {
    setFilters((current) => ({ ...current, [key]: value }));
  }

  return (
    <div>
      <Seo
        title="Programs"
        description="Filter River Valley Community College degrees and certificates by focus area, credential, and campus."
        path="/programs"
      />
      <PageHero
        eyebrow="Programs"
        title="Find the pathway that fits your next chapter"
        summary="Filter by focus area, credential type, or campus — then open a pathway for prerequisites, careers, and next steps."
        image={images.programs}
        imageAlt="RVCC students and campus life"
      />

      <section className="border-b border-river/10 bg-white/85">
        <div className="section-shell grid gap-4 py-6 md:grid-cols-2 lg:grid-cols-4">
          <label className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-valley">
              Search
            </span>
            <input
              value={filters.query}
              onChange={(event) => updateFilter("query", event.target.value)}
              placeholder="Nursing, cybersecurity…"
              className="w-full rounded-md border border-river/20 bg-white px-3 py-2.5 outline-none ring-sunrise/40 focus:ring-2"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-valley">
              Focus area
            </span>
            <select
              value={filters.area}
              onChange={(event) => updateFilter("area", event.target.value)}
              className="w-full rounded-md border border-river/20 bg-white px-3 py-2.5 outline-none ring-sunrise/40 focus:ring-2"
            >
              <option>All</option>
              {filterOptions.areas.map((area) => (
                <option key={area}>{area}</option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-valley">
              Credential
            </span>
            <select
              value={filters.credential}
              onChange={(event) => updateFilter("credential", event.target.value)}
              className="w-full rounded-md border border-river/20 bg-white px-3 py-2.5 outline-none ring-sunrise/40 focus:ring-2"
            >
              <option>All</option>
              {filterOptions.credentials.map((credential) => (
                <option key={credential}>{credential}</option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-valley">
              Campus
            </span>
            <select
              value={filters.campus}
              onChange={(event) => updateFilter("campus", event.target.value)}
              className="w-full rounded-md border border-river/20 bg-white px-3 py-2.5 outline-none ring-sunrise/40 focus:ring-2"
            >
              <option>All</option>
              {filterOptions.campuses.map((campus) => (
                <option key={campus}>{campus}</option>
              ))}
            </select>
          </label>
        </div>
      </section>

      <section className="section-shell py-12 sm:py-16">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <p className="text-granite-muted">
            Showing{" "}
            <span className="font-semibold text-river-deep">{filtered.length}</span>{" "}
            pathways
          </p>
          <button
            type="button"
            className="text-sm font-semibold text-river underline-offset-2 hover:underline"
            onClick={() => setFilters(initialFilters)}
          >
            Clear filters
          </button>
        </div>

        {filtered.length === 0 ? (
          <p className="mt-10 max-w-xl text-lg text-granite-muted">
            No pathways match those filters. Try clearing a filter or browsing by
            a different campus.
          </p>
        ) : (
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {filtered.map((program) => (
              <li key={program.slug}>
                <Link
                  to={`/programs/${program.slug}`}
                  className="group flex h-full flex-col border border-river/10 bg-white/70 px-5 py-5 transition duration-300 hover:-translate-y-0.5 hover:border-river/30 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-river"
                >
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-valley">
                    {program.area}
                  </span>
                  <span className="mt-3 font-display text-xl font-semibold text-river-deep group-hover:text-river">
                    {program.name}
                  </span>
                  <span className="mt-2 text-sm text-granite-muted">
                    {program.credential}
                  </span>
                  <span className="mt-3 text-sm text-granite">
                    {program.campuses.join(" · ")}
                  </span>
                  <span className="mt-4 text-sm font-medium text-sunrise">
                    View pathway →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-16 flex flex-col gap-4 bg-river-mist px-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="max-w-xl">
            <p className="text-lg text-river-deep">
              Not sure which path fits? Admissions can help you map courses,
              transfer options, and financial aid.
            </p>
            <a
              href="https://catalog.rivervalley.edu/degrees"
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex text-sm font-semibold text-river underline-offset-2 hover:underline"
            >
              Browse the official college catalog →
            </a>
          </div>
          <Link to="/admissions" className="btn-primary w-fit shrink-0">
            Talk with admissions
          </Link>
        </div>
      </section>
    </div>
  );
}
