import { useDeferredValue, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { shows } from "../data/content";
import { ShowPoster } from "../components/Illustrations";
import { useLibrary } from "../library/LibraryContext";

const SUGGESTIONS = ["Academy Rock", "music", "playlist", "learning", "Mia", "bedtime"];

function matchesQuery(show, query) {
  if (!query) return true;
  const haystack = [
    show.title,
    show.meta,
    show.tagline,
    ...(show.characters || []),
  ]
    .join(" ")
    .toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((token) => haystack.includes(token));
}

export default function Search() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const { getProgress } = useLibrary();

  const results = useMemo(
    () => shows.filter((show) => matchesQuery(show, deferredQuery.trim())),
    [deferredQuery]
  );

  return (
    <div className="page-panel search-page">
      <header className="page-panel-head">
        <p className="hero-eyebrow">Search</p>
        <h1 className="page-panel-title">Find a show</h1>
        <label className="search-field">
          <span className="visually-hidden">Search titles</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="2" />
            <path d="M20 20l-3.2-3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Titles, characters, music…"
            autoFocus
          />
        </label>
        <div className="search-chips" aria-label="Suggestions">
          {SUGGESTIONS.map((chip) => (
            <button
              key={chip}
              type="button"
              className="search-chip"
              onClick={() => setQuery(chip)}
            >
              {chip}
            </button>
          ))}
        </div>
      </header>

      <p className="search-count" aria-live="polite">
        {results.length} result{results.length === 1 ? "" : "s"}
        {deferredQuery.trim() ? ` for “${deferredQuery.trim()}”` : ""}
      </p>

      {results.length === 0 ? (
        <p className="empty-state">No matches. Try a character name or “music”.</p>
      ) : (
        <div className="poster-grid" role="list">
          {results.map((show) => {
            const progress = getProgress(show.id) ?? show.progress;
            return (
              <Link
                key={show.id}
                to={show.to}
                className="rail-tile"
                role="listitem"
                aria-label={show.title}
              >
                <div className="rail-art">
                  <ShowPoster id={`search-${show.id}`} colors={show.palette} title={show.title} />
                  {typeof progress === "number" && (
                    <div className="rail-progress" aria-hidden="true">
                      <span style={{ width: `${Math.round(progress * 100)}%` }} />
                    </div>
                  )}
                </div>
                <span className="rail-label">{show.title}</span>
                <span className="rail-sub">{show.meta}</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
