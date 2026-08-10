import { Link, Navigate, useParams } from "react-router-dom";
import { CampusImage } from "../components/CampusImage";
import { CartDrawer } from "../components/CartDrawer";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { getBeerBySlug } from "../data/beerDetails";
import { links } from "../data/links";

export function BeerDetailPage() {
  const { slug = "" } = useParams();
  const beer = getBeerBySlug(slug);

  if (!beer) {
    return <Navigate to="/#beers" replace />;
  }

  return (
    <div className="min-h-screen bg-foam">
      <Header solid />
      <CartDrawer />
      <main className="pt-24">
        <div className="mx-auto grid max-w-site gap-10 px-5 pb-20 md:grid-cols-2 md:gap-14 md:px-8 md:pb-28">
          <div className="relative min-h-[22rem] overflow-hidden md:min-h-[34rem]">
            <CampusImage
              name={beer.image}
              alt={`${beer.name} atmosphere at Towle Farm`}
              className="h-full w-full object-cover"
              loading="eager"
            />
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-tide">
              {beer.status.replace("-", " ")}
            </p>
            <h1 className="mt-3 font-display text-5xl font-bold uppercase tracking-wide md:text-6xl">
              {beer.name}
            </h1>
            <p className="mt-2 text-sm font-medium uppercase tracking-[0.14em] text-steel">
              {beer.style}
            </p>
            <p className="mt-5 text-lg text-steel">{beer.tagline}</p>

            <dl className="mt-8 grid grid-cols-3 gap-4 border-y border-ink/10 py-5">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-salt">
                  ABV
                </dt>
                <dd className="mt-1 font-display text-3xl font-bold">{beer.abv}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-salt">
                  IBU
                </dt>
                <dd className="mt-1 font-display text-3xl font-bold">{beer.ibu}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-salt">
                  SRM
                </dt>
                <dd className="mt-1 font-display text-3xl font-bold">{beer.srm}</dd>
              </div>
            </dl>

            <p className="mt-6 leading-relaxed text-ink/85">{beer.description}</p>

            <section className="mt-10">
              <h2 className="font-display text-2xl font-bold uppercase tracking-wide">
                Tasting notes
              </h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {beer.tastingNotes.map((note) => (
                  <li
                    key={note}
                    className="border border-ink/15 px-3 py-1.5 text-sm text-ink/80"
                  >
                    {note}
                  </li>
                ))}
              </ul>
            </section>

            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              <section>
                <h2 className="font-display text-xl font-bold uppercase tracking-wide">
                  Malt
                </h2>
                <p className="mt-2 text-steel">{beer.malt.join(" · ")}</p>
              </section>
              <section>
                <h2 className="font-display text-xl font-bold uppercase tracking-wide">
                  Hops
                </h2>
                <p className="mt-2 text-steel">{beer.hops.join(" · ")}</p>
              </section>
            </div>

            <section className="mt-10">
              <h2 className="font-display text-2xl font-bold uppercase tracking-wide">
                Food pairings
              </h2>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-steel">
                {beer.pairings.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </section>

            <section className="mt-10">
              <h2 className="font-display text-2xl font-bold uppercase tracking-wide">
                Packaging
              </h2>
              <ul className="mt-4 divide-y divide-ink/10 border-y border-ink/10">
                {beer.packaging.map((pack) => (
                  <li
                    key={pack.label}
                    className="flex items-baseline justify-between gap-4 py-3"
                  >
                    <span className="font-semibold uppercase tracking-[0.12em]">
                      {pack.label}
                    </span>
                    <span className="text-right text-sm text-steel">{pack.note}</span>
                  </li>
                ))}
              </ul>
            </section>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={links.beers}
                target="_blank"
                rel="noreferrer"
                className="bg-buoy px-5 py-3 text-sm font-semibold tracking-wide text-foam"
              >
                Full official lineup
              </a>
              <Link
                to="/finder"
                className="border border-ink/25 px-5 py-3 text-sm font-semibold tracking-wide"
              >
                Find near you
              </Link>
              <Link
                to="/#beers"
                className="border border-ink/25 px-5 py-3 text-sm font-semibold tracking-wide"
              >
                Back to tap list
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
