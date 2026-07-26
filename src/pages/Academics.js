import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
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
  const [filters, setFilters] = useState(emptyFilters);

  const focusLabels = useMemo(
    () =>
      Object.fromEntries(focusAreas.map((area) => [area.id, area.title])),
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
        filters.focus === "all" ||
        program.focusAreas.includes(filters.focus);

      const matchesLocation =
        filters.location === "all" ||
        program.location === filters.location;

      return matchesQuery && matchesType && matchesFocus && matchesLocation;
    });
  }, [filters, focusLabels]);

  const updateFilter = (key, value) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };

  const clearFilters = () => setFilters(emptyFilters);

  return (
    <>
      <section className="page-hero">
        <div className="page-hero-media" aria-hidden="true">
          <img src="/images/students.jpg" alt="" />
          <div className="hero-veil" />
        </div>
        <div className="container page-hero-content">
          <p className="hero-brand">Academics</p>
          <h1>Our Programs</h1>
          <p>
            Search every degree and certificate at Great Bay — the same academic
            focus areas you&apos;ll find on the official site, from Arts &amp;
            Humanities to STEM and Advanced Manufacturing.
          </p>
        </div>
      </section>

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
                className="btn btn-navy"
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
              <button type="button" className="btn btn-gold" onClick={clearFilters}>
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
                    <p className="program-focus">
                      {program.focusAreas
                        .map((area) => focusLabels[area])
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                    <p className="program-location">{program.location} Campus</p>
                    {program.url ? (
                      <a
                        className="text-link"
                        href={program.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View on greatbay.edu
                      </a>
                    ) : null}
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
            <h2>Explore by the same categories as Great Bay.</h2>
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
              The Center for Academic Planning and Support (CAPS) offers advising,
              tutoring, accessibility services, success coaching, and career
              guidance — so you never have to figure it out alone.
            </p>
          </div>
          <ul className="support-list">
            <li>
              <strong>Academic advising</strong>
              <span>Plan your path semester by semester</span>
            </li>
            <li>
              <strong>Tutoring &amp; coaching</strong>
              <span>In-person help plus 24/7 online support</span>
            </li>
            <li>
              <strong>Transfer options</strong>
              <span>Agreements with colleges across New England</span>
            </li>
            <li>
              <strong>Career Center</strong>
              <span>Resume help, internships, and job search support</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container callout-row">
          <div>
            <h2>Questions about programs or courses?</h2>
            <p>
              Contact the Advising and Transfer Center at{" "}
              <a href="mailto:greatbayadvising@ccsnh.edu">
                greatbayadvising@ccsnh.edu
              </a>{" "}
              or call <a href="tel:6034277728">(603) 427-7728</a>. Suite 100,
              Portsmouth Campus.
            </p>
          </div>
          <Link className="btn btn-navy" to="/admissions">
            Talk to Admissions
          </Link>
        </div>
      </section>
    </>
  );
}

export default Academics;
