import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import PageHero from "../components/PageHero";
import { APPLY_URL } from "../data/links";
import {
  focusAreas,
  locations,
  programTypes,
  programs,
} from "../data/programs";

const emptyFilters = {
  query: "",
  type: "all",
  focus: "all",
  location: "all",
};

function Academics() {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState(() => ({
    ...emptyFilters,
    focus: searchParams.get("focus") || "all",
  }));

  useEffect(() => {
    const focus = searchParams.get("focus");
    if (focus) {
      setFilters((current) => ({ ...current, focus }));
    }
  }, [searchParams]);

  const focusLabels = useMemo(
    () => Object.fromEntries(focusAreas.map((area) => [area.id, area.title])),
    []
  );

  const results = useMemo(() => {
    const query = filters.query.trim().toLowerCase();

    return programs.filter((program) => {
      const matchesQuery =
        !query ||
        program.title.toLowerCase().includes(query) ||
        program.credential.toLowerCase().includes(query) ||
        program.focusAreas.some((area) =>
          (focusLabels[area] || "").toLowerCase().includes(query)
        );

      const matchesType =
        filters.type === "all" || program.kind === filters.type;

      const matchesFocus =
        filters.focus === "all" || program.focusAreas.includes(filters.focus);

      const matchesLocation =
        filters.location === "all" ||
        (program.locations || [program.location]).includes(filters.location);

      return matchesQuery && matchesType && matchesFocus && matchesLocation;
    });
  }, [filters, focusLabels]);

  const updateFilter = (key, value) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };

  const clearFilters = () => setFilters(emptyFilters);

  return (
    <>
      <PageHero
        brand="Academics"
        title="Our Programs"
        copy="Search every degree and certificate at White Mountains Community College — from Arts & Humanities to STEM, Industry, Culinary, and Health Sciences."
        image="/images/students.jpg"
        actions={[
          {
            label: "Apply Now",
            to: APPLY_URL,
            external: true,
            className: "btn btn-gold",
          },
          {
            label: "Request Info",
            to: "/contact",
            className: "btn btn-ghost-light",
          },
        ]}
      />

      <section className="section programs-section">
        <div className="container">
          <form
            className="program-filters"
            onSubmit={(event) => event.preventDefault()}
            aria-label="Filter academic programs"
          >
            <label className="filter-search">
              <span className="sr-only">Search programs</span>
              <input
                type="search"
                placeholder="Search for a degree or certificate program"
                value={filters.query}
                onChange={(event) => updateFilter("query", event.target.value)}
              />
            </label>

            <label>
              <span>Program Types</span>
              <select
                value={filters.type}
                onChange={(event) => updateFilter("type", event.target.value)}
              >
                {programTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.label}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span>Academic Focus Area</span>
              <select
                value={filters.focus}
                onChange={(event) => updateFilter("focus", event.target.value)}
              >
                <option value="all">All Focus Areas</option>
                {focusAreas.map((area) => (
                  <option key={area.id} value={area.id}>
                    {area.title}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span>Location</span>
              <select
                value={filters.location}
                onChange={(event) =>
                  updateFilter("location", event.target.value)
                }
              >
                {locations.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.label}
                  </option>
                ))}
              </select>
            </label>

            <div className="filter-actions">
              <button
                type="button"
                className="btn btn-primary"
                onClick={clearFilters}
              >
                Clear
              </button>
            </div>
          </form>

          <div className="program-results-meta">
            <p>
              Showing <strong>{results.length}</strong> of{" "}
              <strong>{programs.length}</strong> programs
            </p>
          </div>

          {results.length === 0 ? (
            <div className="program-empty">
              <h2>No programs match those filters.</h2>
              <p>Try clearing your search or choosing a different focus area.</p>
              <button
                type="button"
                className="btn btn-gold"
                onClick={clearFilters}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="program-results">
              {results.map((program) => (
                <article key={program.id} className="program-result">
                  <div
                    className="program-result-media"
                    style={
                      program.image
                        ? { backgroundImage: `url(${program.image})` }
                        : undefined
                    }
                    aria-hidden="true"
                  />
                  <div className="program-result-body">
                    <p className="program-kind">{program.kind}</p>
                    <h2>{program.title}</h2>
                    <p className="program-credential">{program.credential}</p>
                    {program.summary ? (
                      <p className="program-summary">{program.summary}</p>
                    ) : null}
                    <p className="program-focus">
                      {program.focusAreas
                        .map((area) => focusLabels[area])
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                    <p className="program-location">
                      {(program.locations || [program.location]).join(" · ")}
                    </p>
                    <Link
                      className="text-link"
                      to={`/academics/programs/${program.id}`}
                    >
                      View program
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section section-tint">
        <div className="container">
          <div className="section-intro">
            <p className="eyebrow">Academic focus areas</p>
            <h2>Explore by the same categories as WMCC.</h2>
          </div>
          <div className="area-grid focus-overview">
            {focusAreas.map((area) => {
              const count = programs.filter((program) =>
                program.focusAreas.includes(area.id)
              ).length;

              return (
                <article key={area.id} className="area-item">
                  <h3>{area.title}</h3>
                  <p>{area.description}</p>
                  <button
                    type="button"
                    className="text-link button-link"
                    onClick={() => {
                      setFilters({
                        ...emptyFilters,
                        focus: area.id,
                      });
                      document
                        .querySelector(".program-filters")
                        ?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                  >
                    View {count} programs
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container support-grid">
          <div>
            <p className="eyebrow">Student success</p>
            <h2>Support that stays with you.</h2>
            <p>
              Advising, tutoring, accessibility services, and career guidance help
              you stay on track — whether you study in Berlin, Littleton, or
              online.
            </p>
          </div>
          <ul className="support-list">
            <li>
              <strong>Academic advising</strong>
              <span>Plan your path semester by semester</span>
            </li>
            <li>
              <strong>Tutoring &amp; coaching</strong>
              <span>In-person help plus flexible study support</span>
            </li>
            <li>
              <strong>Transfer options</strong>
              <span>Agreements and pathways across New England</span>
            </li>
            <li>
              <strong>Career readiness</strong>
              <span>Resume help, internships, and employer connections</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container callout-row">
          <div>
            <h2>Questions about programs or courses?</h2>
            <p>
              Contact Admissions at{" "}
              <a href="mailto:wmcc@ccsnh.edu">wmcc@ccsnh.edu</a> or call{" "}
              <a href="tel:6037521113">(603) 752-1113</a>. Berlin Campus, 2020
              Riverside Drive.
            </p>
          </div>
          <Link className="btn btn-primary" to="/admissions">
            Talk to Admissions
          </Link>
        </div>
      </section>
    </>
  );
}

export default Academics;
