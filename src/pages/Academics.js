import { useDeferredValue, useMemo, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { focusAreas, programs, getFocusTitle } from "../data/content";

function Academics() {
  const location = useLocation();
  const [query, setQuery] = useState("");
  const [focus, setFocus] = useState(location.state?.focus || "all");
  const [type, setType] = useState("all");
  const [onlineOnly, setOnlineOnly] = useState(false);
  const deferredQuery = useDeferredValue(query);

  useEffect(() => {
    if (location.state?.focus) {
      setFocus(location.state.focus);
    }
  }, [location.state]);

  const filtered = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    return programs.filter((program) => {
      if (focus !== "all" && program.focus !== focus) return false;
      if (type !== "all" && program.type !== type) return false;
      if (onlineOnly && !program.online) return false;
      if (!q) return true;
      const haystack = [
        program.name,
        program.credential,
        program.summary,
        getFocusTitle(program.focus),
        ...program.careers,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [deferredQuery, focus, type, onlineOnly]);

  return (
    <>
      <section className="page-hero">
        <p className="eyebrow">Academics</p>
        <h1>80+ programs built for work and transfer</h1>
        <p className="page-hero__lede">
          Search degrees and certificates across healthcare, engineering,
          business, education, public service, and the liberal arts — with
          daytime, evening, hybrid, and online options.
        </p>
      </section>

      <section className="section section--tight">
        <form
          className="catalog-controls"
          onSubmit={(event) => event.preventDefault()}
          role="search"
          aria-label="Filter academic programs"
        >
          <label className="catalog-search">
            <span className="sr-only">Search programs</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by program, career, or keyword"
            />
          </label>

          <label>
            <span>Focus area</span>
            <select value={focus} onChange={(event) => setFocus(event.target.value)}>
              <option value="all">All areas</option>
              {focusAreas.map((area) => (
                <option key={area.id} value={area.id}>
                  {area.title}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>Credential</span>
            <select value={type} onChange={(event) => setType(event.target.value)}>
              <option value="all">Degrees &amp; certificates</option>
              <option value="degree">Degrees</option>
              <option value="certificate">Certificates</option>
            </select>
          </label>

          <label className="catalog-check">
            <input
              type="checkbox"
              checked={onlineOnly}
              onChange={(event) => setOnlineOnly(event.target.checked)}
            />
            <span>Online options only</span>
          </label>
        </form>

        <p className="catalog-count" aria-live="polite">
          Showing {filtered.length} of {programs.length} programs
        </p>

        <div className="program-grid">
          {filtered.map((program) => (
            <article key={program.id} className="program-card">
              <div className="program-card__meta">
                <span>{getFocusTitle(program.focus)}</span>
                {program.online ? <span className="tag">Online</span> : null}
              </div>
              <h2>
                <Link to={`/academics/${program.id}`}>{program.name}</Link>
              </h2>
              <p className="program-card__credential">{program.credential}</p>
              <p>{program.summary}</p>
              <Link className="text-link" to={`/academics/${program.id}`}>
                View program
              </Link>
            </article>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <h2>No programs match those filters</h2>
            <p>Try a broader search or clear the online filter.</p>
            <button
              type="button"
              className="btn btn--solid"
              onClick={() => {
                setQuery("");
                setFocus("all");
                setType("all");
                setOnlineOnly(false);
              }}
            >
              Reset filters
            </button>
          </div>
        ) : null}
      </section>
    </>
  );
}

export default Academics;
