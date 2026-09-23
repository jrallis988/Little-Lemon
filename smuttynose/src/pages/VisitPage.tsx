import { Link } from "react-router-dom";
import { CampusImage } from "../components/CampusImage";
import { CartDrawer } from "../components/CartDrawer";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { PageMeta } from "../components/PageMeta";
import { links } from "../data/links";

export function VisitPage() {
  return (
    <div className="min-h-screen bg-foam">
      <PageMeta
        title="Visit Towle Farm"
        description="Visit Smuttynose Backyard Club at 105 Towle Farm Road, Hampton NH — hours, waitlist, map, and directions."
        path="/visit"
      />
      <Header solid />
      <CartDrawer />
      <main>
        <section className="relative min-h-[22rem] overflow-hidden bg-ink text-foam md:min-h-[28rem]">
          <CampusImage
            name="campus-entrance"
            alt="Entrance to Smuttynose on Towle Farm"
            className="absolute inset-0 h-full w-full object-cover opacity-70"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/20" />
          <div className="relative mx-auto flex max-w-site flex-col justify-end px-5 pb-12 pt-32 md:px-8 md:pb-16">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-salt">
              Towle Farm
            </p>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold uppercase tracking-wide md:text-6xl">
              Visit the Backyard
            </h1>
            <p className="mt-4 max-w-xl text-foam/80">
              Cold pours, patio hangs, and food trucks just inland from Hampton
              Beach — ~10 minutes from the sand.
            </p>
          </div>
        </section>

        <section className="px-5 py-16 md:px-8 md:py-24">
          <div className="mx-auto grid max-w-site gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-3xl font-bold uppercase tracking-wide">
                Hours & contact
              </h2>
              <dl className="mt-8 space-y-4 text-sm">
                {links.hoursRows.map((row) => (
                  <div
                    key={row.days}
                    className="flex justify-between gap-6 border-b border-ink/10 py-2"
                  >
                    <dt className="font-semibold uppercase tracking-[0.14em] text-tide">
                      {row.days}
                    </dt>
                    <dd>{row.time}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-sm text-steel">{links.hoursKitchen}</p>
              <div className="mt-8 space-y-2 text-base">
                <p>
                  Backyard Club ·{" "}
                  <a href={links.phone} className="font-semibold text-tide">
                    {links.phoneDisplay}
                  </a>
                </p>
                <p>
                  Brewery ·{" "}
                  <a href={links.phoneBrewery} className="font-semibold text-tide">
                    {links.phoneBreweryDisplay}
                  </a>
                </p>
                <p className="text-steel">{links.address}</p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={links.waitlist}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex bg-buoy px-5 py-3 text-sm font-semibold tracking-wide text-foam"
                >
                  Join the waitlist
                </a>
                <a
                  href={links.maps}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex border border-ink/20 px-5 py-3 text-sm font-semibold tracking-wide"
                >
                  Get directions
                </a>
                <Link
                  to="/events/private"
                  className="inline-flex border border-ink/20 px-5 py-3 text-sm font-semibold tracking-wide"
                >
                  Private events
                </Link>
              </div>
            </div>

            <div>
              <h2 className="font-display text-3xl font-bold uppercase tracking-wide">
                Map
              </h2>
              <p className="mt-3 text-steel">
                Free parking on campus. Set GPS to Towle Farm Road.
              </p>
              <div className="mt-6 overflow-hidden border border-ink/10">
                <iframe
                  title="Map to Smuttynose Brewing"
                  src={links.mapsEmbed}
                  className="h-[22rem] w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
              <a
                href={links.backyard}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex text-sm font-semibold text-tide underline-offset-2 hover:underline"
              >
                Official Visit the Backyard page →
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
