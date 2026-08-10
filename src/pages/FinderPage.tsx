import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { CartDrawer } from "../components/CartDrawer";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { lookupRetail, RetailHit } from "../data/finder";
import { links } from "../data/links";

export function FinderPage() {
  const [query, setQuery] = useState("03842");
  const [results, setResults] = useState<RetailHit[]>(() => lookupRetail("03842"));
  const [searched, setSearched] = useState(true);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setResults(lookupRetail(query));
    setSearched(true);
  }

  return (
    <div className="min-h-screen bg-foam">
      <Header solid />
      <CartDrawer />
      <main className="px-5 pb-20 pt-28 md:px-8 md:pb-28">
        <div className="mx-auto max-w-site">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-tide">
            Distribution
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold uppercase tracking-wide md:text-5xl">
            Find Smuttynose near you
          </h1>
          <p className="mt-4 max-w-2xl text-steel">
            Enter a ZIP or city to locate package stores, bars, and restaurants
            carrying Smuttynose across the Seacoast footprint. Demo results —
            swap in a live retailer API anytime.
          </p>

          <form
            onSubmit={onSubmit}
            className="mt-10 flex w-full max-w-xl flex-col gap-3 sm:flex-row"
          >
            <label className="sr-only" htmlFor="finder-query">
              ZIP code or city
            </label>
            <input
              id="finder-query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ZIP or city (try 03842 or Portsmouth)"
              className="min-w-0 flex-1 border border-ink/20 bg-foam px-4 py-3 outline-none focus:border-buoy"
            />
            <button
              type="submit"
              className="bg-buoy px-5 py-3 text-sm font-semibold tracking-wide text-foam"
            >
              Search
            </button>
          </form>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="mb-4 flex items-end justify-between gap-4">
                <h2 className="font-display text-3xl font-bold uppercase tracking-wide">
                  {searched ? "Nearby spots" : "Results"}
                </h2>
                <p className="text-sm text-steel">
                  {results.length} location{results.length === 1 ? "" : "s"}
                </p>
              </div>
              <ul className="divide-y divide-ink/10 border-y border-ink/10">
                {results.map((hit) => (
                  <li
                    key={`${hit.name}-${hit.address}`}
                    className="grid gap-2 py-5 md:grid-cols-[1.2fr_0.8fr_auto] md:items-end"
                  >
                    <div>
                      <p className="font-display text-2xl font-bold uppercase tracking-wide">
                        {hit.name}
                      </p>
                      <p className="mt-1 text-sm font-medium uppercase tracking-[0.14em] text-tide">
                        {hit.type}
                      </p>
                    </div>
                    <div className="text-sm text-steel">
                      <p>
                        {hit.city}, {hit.state}
                      </p>
                      <p>{hit.address}</p>
                    </div>
                    <p className="font-display text-xl font-bold md:text-right">
                      {hit.miles.toFixed(1)} mi
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <aside className="bg-tide-deep p-6 text-foam md:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-salt">
                Map preview
              </p>
              <h3 className="mt-3 font-display text-3xl font-bold uppercase tracking-wide">
                Seacoast footprint
              </h3>
              <p className="mt-3 text-foam/75">
                Distribution leans New Hampshire, with accounts into
                Massachusetts and Maine. For the freshest pour, start at Towle
                Farm.
              </p>
              <div className="mt-6 aspect-[4/3] border border-foam/15 bg-ink/30">
                <iframe
                  title="Smuttynose distribution area map"
                  src={links.mapsEmbed}
                  className="h-full w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <Link
                to="/#visit"
                className="mt-6 inline-flex bg-buoy px-5 py-3 text-sm font-semibold tracking-wide text-foam"
              >
                Visit Towle Farm
              </Link>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
