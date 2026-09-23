import { Link } from "react-router-dom";
import { CartDrawer } from "../components/CartDrawer";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { PageMeta } from "../components/PageMeta";
import { links } from "../data/links";

export function FinderPage() {
  return (
    <div className="min-h-screen bg-foam">
      <PageMeta
        title="Beer locator"
        description="Find Smuttynose beer near you — official VT locator embedded from smuttynose.com."
        path="/finder"
      />
      <Header solid />
      <CartDrawer />
      <main className="px-5 pb-20 pt-28 md:px-8 md:pb-28">
        <div className="mx-auto max-w-site">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-tide">
            Distribution
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold uppercase tracking-wide md:text-5xl">
            Find a brew near you
          </h1>
          <p className="mt-4 max-w-2xl text-steel">
            Search package stores, bars, and restaurants carrying Smuttynose —
            the same beer locator used on smuttynose.com. For the freshest pour,
            start at Towle Farm.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={links.beerLocator}
              target="_blank"
              rel="noreferrer"
              className="inline-flex border border-ink/20 px-5 py-3 text-sm font-semibold tracking-wide text-ink transition-colors hover:border-ink hover:bg-ink hover:text-foam"
            >
              Open full locator
            </a>
            <Link
              to="/#visit"
              className="inline-flex bg-buoy px-5 py-3 text-sm font-semibold tracking-wide text-foam"
            >
              Visit Towle Farm
            </Link>
          </div>

          <div className="mt-10 overflow-hidden border border-ink/10 bg-mist">
            <iframe
              title="Smuttynose beer locator"
              src={links.beerLocatorEmbed}
              className="h-[36rem] w-full md:h-[42rem]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <p className="mt-4 text-sm text-steel">
            Locator powered by Vermont Information Consortium — also embedded on{" "}
            <a
              href={links.beerLocator}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-tide underline-offset-2 hover:underline"
            >
              smuttynose.com/beer-locator
            </a>
            .
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
