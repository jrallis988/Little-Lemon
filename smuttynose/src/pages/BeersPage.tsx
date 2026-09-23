import { Link } from "react-router-dom";
import { CartDrawer } from "../components/CartDrawer";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { PageMeta } from "../components/PageMeta";
import { beerDetails } from "../data/beerDetails";
import { links } from "../data/links";

export function BeersPage() {
  const yearRound = beerDetails.filter((b) => b.status === "year-round");
  const seasonal = beerDetails.filter((b) => b.status !== "year-round");

  return (
    <div className="min-h-screen bg-foam">
      <PageMeta
        title="Beer lineup"
        description="Smuttynose beer lineup — Finestkind IPA, Old Brown Dog, Whole Lotta Haze, and seasonal releases."
        path="/beers"
      />
      <Header solid />
      <CartDrawer />
      <main className="px-5 pb-20 pt-28 md:px-8 md:pb-28">
        <div className="mx-auto max-w-site">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-tide">
            Our lineup
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold uppercase tracking-wide md:text-5xl">
            Beers from Towle Farm
          </h1>
          <p className="mt-4 max-w-2xl text-steel">
            Core year-round classics and rotating seasonals. Stats match the
            official lineup on smuttynose.com.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={links.beers}
              target="_blank"
              rel="noreferrer"
              className="inline-flex bg-buoy px-5 py-3 text-sm font-semibold tracking-wide text-foam"
            >
              Official lineup
            </a>
            <Link
              to="/releases"
              className="inline-flex border border-ink/20 px-5 py-3 text-sm font-semibold tracking-wide"
            >
              Release calendar
            </Link>
            <Link
              to="/finder"
              className="inline-flex border border-ink/20 px-5 py-3 text-sm font-semibold tracking-wide"
            >
              Find near you
            </Link>
          </div>

          <section className="mt-14">
            <h2 className="font-display text-3xl font-bold uppercase tracking-wide">
              Year-round
            </h2>
            <BeerGrid beers={yearRound} />
          </section>

          <section className="mt-14">
            <h2 className="font-display text-3xl font-bold uppercase tracking-wide">
              Seasonal & limited
            </h2>
            <BeerGrid beers={seasonal} />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function BeerGrid({
  beers,
}: {
  beers: typeof beerDetails;
}) {
  return (
    <ul className="mt-6 divide-y divide-ink/10 border-y border-ink/10">
      {beers.map((beer) => (
        <li
          key={beer.slug}
          className="grid gap-3 py-6 md:grid-cols-[1.2fr_1fr_auto] md:items-end"
        >
          <div>
            <Link
              to={`/beers/${beer.slug}`}
              className="font-display text-3xl font-bold uppercase tracking-wide transition-colors hover:text-tide"
            >
              {beer.name}
            </Link>
            <p className="mt-1 text-sm font-medium uppercase tracking-[0.14em] text-tide">
              {beer.style} · {beer.status}
            </p>
          </div>
          <p className="text-steel">{beer.tagline}</p>
          <p className="font-display text-2xl font-bold md:text-right">
            {beer.abv}
            <span className="ml-3 text-base font-semibold text-steel">
              {beer.ibu} IBU
            </span>
          </p>
        </li>
      ))}
    </ul>
  );
}
