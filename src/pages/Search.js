import { Link, useSearchParams } from "react-router-dom";
import { useMemo, useState } from "react";
import PageHero from "../components/PageHero";
import { programs } from "../data/programs";
import { REQUEST_INFO_URL } from "../data/links";

const pageResults = [
  {
    id: "page-home",
    title: "Home",
    kind: "Page",
    summary: "White Mountains Community College overview and next steps.",
    to: "/",
    keywords: ["wmcc", "white mountains", "home", "college"],
  },
  {
    id: "page-academics",
    title: "Academic Programs",
    kind: "Page",
    summary: "Browse degrees and certificates across WMCC focus areas.",
    to: "/academics",
    keywords: ["programs", "degrees", "certificates", "majors", "academics"],
  },
  {
    id: "page-admissions",
    title: "Admissions & Aid",
    kind: "Page",
    summary: "Apply, visit campus, review tuition, and start financial aid.",
    to: "/admissions",
    keywords: ["apply", "admissions", "enroll", "aid"],
  },
  {
    id: "page-visit",
    title: "Visit Campus",
    kind: "Page",
    summary: "Tours and visit events in Berlin, Littleton, and North Conway.",
    to: "/admissions/visit",
    keywords: ["visit", "tour", "open house", "campus"],
  },
  {
    id: "page-contact",
    title: "Locations & Contact",
    kind: "Page",
    summary: "Hours, directions, and contact details for WMCC campuses.",
    to: "/contact",
    keywords: ["contact", "hours", "directions", "berlin", "littleton", "north conway"],
  },
  {
    id: "page-workforce",
    title: "Workforce Development",
    kind: "Page",
    summary: "Short-term training and employer partnerships.",
    to: "/workforce",
    keywords: ["workforce", "training", "cdl", "employer"],
  },
  {
    id: "page-about",
    title: "About WMCC",
    kind: "Page",
    summary: "Mission, values, and the North Country college community.",
    to: "/about",
    keywords: ["about", "mission", "values"],
  },
  {
    id: "page-news",
    title: "News & Events",
    kind: "Page",
    summary: "Campus updates, student stories, and recognition.",
    to: "/news",
    keywords: ["news", "events", "stories"],
  },
];

function matchesQuery(haystack, query) {
  return haystack.toLowerCase().includes(query);
}

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initial = searchParams.get("q") || "";
  const [draft, setDraft] = useState(initial);
  const query = initial.trim().toLowerCase();

  const results = useMemo(() => {
    if (!query) return [];

    const programHits = programs
      .filter((program) => {
        const blob = [
          program.title,
          program.credential,
          program.summary,
          ...(program.locations || []),
          ...(program.focusAreas || []),
        ]
          .join(" ")
          .toLowerCase();
        return matchesQuery(blob, query);
      })
      .map((program) => ({
        id: program.id,
        title: program.title,
        kind: program.kind,
        summary: program.summary,
        meta: `${program.credential} · ${(program.locations || []).join(" · ")}`,
        to: `/academics/programs/${program.id}`,
      }));

    const pageHits = pageResults
      .filter((page) => {
        const blob = [page.title, page.summary, ...(page.keywords || [])]
          .join(" ")
          .toLowerCase();
        return matchesQuery(blob, query);
      })
      .map((page) => ({
        id: page.id,
        title: page.title,
        kind: page.kind,
        summary: page.summary,
        meta: "Site page",
        to: page.to,
      }));

    return [...pageHits, ...programHits];
  }, [query]);

  const onSubmit = (event) => {
    event.preventDefault();
    const next = draft.trim();
    setSearchParams(next ? { q: next } : {}, { replace: true });
  };

  return (
    <>
      <PageHero
        brand="Search"
        title="Find programs and pages."
        copy="Search WMCC degrees, certificates, and key site pages — then jump straight to what you need."
        image="/images/students.jpg"
        compact
        actions={[
          {
            label: "Browse All Programs",
            to: "/academics",
            className: "btn btn-gold",
          },
          {
            label: "Request Info",
            to: REQUEST_INFO_URL,
            external: true,
            className: "btn btn-ghost-light",
          },
        ]}
      />

      <section className="section">
        <div className="container">
          <form className="search-page-form" role="search" onSubmit={onSubmit}>
            <label className="sr-only" htmlFor="search-page-input">
              Search
            </label>
            <input
              id="search-page-input"
              type="search"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Try nursing, welding, littleton, tuition…"
            />
            <button className="btn btn-primary" type="submit">
              Search
            </button>
          </form>

          {!query ? (
            <div className="program-empty">
              <h2>Start with a keyword.</h2>
              <p>
                Search program names, credentials, campuses, or pages like
                admissions and contact.
              </p>
            </div>
          ) : results.length === 0 ? (
            <div className="program-empty">
              <h2>No results for “{initial}”.</h2>
              <p>Try another keyword, or browse the full program list.</p>
              <Link className="btn btn-gold" to="/academics">
                Browse Programs
              </Link>
            </div>
          ) : (
            <>
              <div className="program-results-meta">
                <p>
                  Showing <strong>{results.length}</strong> result
                  {results.length === 1 ? "" : "s"} for{" "}
                  <strong>“{initial}”</strong>
                </p>
              </div>
              <div className="news-list search-results">
                {results.map((item) => (
                  <article key={item.id} className="news-item">
                    <p className="news-meta">
                      <span>{item.kind}</span>
                      <span>{item.meta}</span>
                    </p>
                    <h2>
                      <Link to={item.to}>{item.title}</Link>
                    </h2>
                    <p>{item.summary}</p>
                    <Link className="text-link" to={item.to}>
                      View
                    </Link>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}

export default Search;
