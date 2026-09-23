import { Link } from "react-router-dom";
import { CartDrawer } from "../components/CartDrawer";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { PageMeta } from "../components/PageMeta";
import { links } from "../data/links";

export function ReleasesPage() {
  return (
    <div className="min-h-screen bg-foam">
      <PageMeta
        title="Release calendar"
        description="Smuttynose beer release calendar — upcoming cans, seasonals, and limited drops."
        path="/releases"
      />
      <Header solid />
      <CartDrawer />
      <main className="px-5 pb-20 pt-28 md:px-8 md:pb-28">
        <div className="mx-auto max-w-site">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-tide">
            Calendar
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold uppercase tracking-wide md:text-5xl">
            Beer release calendar
          </h1>
          <p className="mt-4 max-w-2xl text-steel">
            Upcoming releases and drops from the official smuttynose.com
            calendar. Dates can shift — check Facebook and Instagram for
            day-of updates.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={links.releaseCalendar}
              target="_blank"
              rel="noreferrer"
              className="inline-flex bg-buoy px-5 py-3 text-sm font-semibold tracking-wide text-foam"
            >
              Open full calendar
            </a>
            <Link
              to="/beers"
              className="inline-flex border border-ink/20 px-5 py-3 text-sm font-semibold tracking-wide"
            >
              Full lineup
            </Link>
          </div>

          <div className="mt-10 overflow-hidden border border-ink/10 bg-mist">
            <iframe
              title="Smuttynose release calendar"
              src={links.releaseCalendar}
              className="h-[36rem] w-full md:h-[42rem]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <p className="mt-4 text-sm text-steel">
            Calendar not loading?{" "}
            <a
              href={links.releaseCalendar}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-tide underline-offset-2 hover:underline"
            >
              View on smuttynose.com
            </a>
            .
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
