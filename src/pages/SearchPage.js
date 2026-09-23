import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import PageHero from "../components/PageHero";
import Seo from "../components/Seo";
import { IconSearch } from "../components/Icons";
import { searchSite } from "../data/searchIndex";

function SearchPage() {
  const [params, setParams] = useSearchParams();
  const initial = params.get("q") || "";
  const [query, setQuery] = useState(initial);

  const results = useMemo(() => searchSite(query), [query]);

  return (
    <>
      <Seo
        title={query ? `Search: ${query}` : "Search"}
        description="Search Great Bay programs, courses, news, events, and campus pages."
        path="/search"
      />
      <PageHero
        brand="Search"
        title="Find programs, courses, and campus info."
        copy="Search across academics, admissions, news, events, and student life."
        image="/images/campus-lobby.jpg"
        compact
      />

      <section className="section">
        <div className="container">
          <form
            className="site-search-form"
            role="search"
            onSubmit={(event) => {
              event.preventDefault();
              setParams(query ? { q: query } : {});
            }}
          >
            <label className="site-search-label" htmlFor="site-search-input">
              <IconSearch />
              <span className="sr-only">Search the site</span>
            </label>
            <input
              id="site-search-input"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Try nursing, tuition, athletics, FAFSA…"
              autoFocus
            />
            <button className="btn btn-gold" type="submit">
              Search
            </button>
          </form>

          <p className="fine-print">
            {query
              ? `${results.length} result${results.length === 1 ? "" : "s"} for “${query}”`
              : "Enter a keyword to search the site."}
          </p>

          <div className="search-results">
            {results.map((item) => (
              <article key={`${item.type}-${item.to}-${item.title}`} className="search-result">
                <p className="search-type">{item.type}</p>
                <h2>
                  <Link to={item.to}>{item.title}</Link>
                </h2>
                <p>{item.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default SearchPage;
