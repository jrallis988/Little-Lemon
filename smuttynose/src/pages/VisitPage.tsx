import { Link } from "react-router-dom";
import { CampusImage } from "../components/CampusImage";
import { CartDrawer } from "../components/CartDrawer";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { PageMeta } from "../components/PageMeta";
import { SealMark } from "../components/SealMark";
import { SkipLink } from "../components/SkipLink";
import { links } from "../data/links";

export function VisitPage() {
  return (
    <div className="min-h-screen bg-foam">
      <PageMeta
        title="Visit Towle Farm"
        description="Visit Smuttynose Backyard Club at 105 Towle Farm Road, Hampton NH — hours, waitlist, map, and directions."
        path="/visit"
      />
      <SkipLink />
      <Header solid />
      <CartDrawer />
      <main id="main">
        <section className="relative min-h-[100svh] overflow-hidden bg-ink text-foam md:min-h-[70svh]">
          <CampusImage
            name="campus-entrance"
            alt="Entrance to Smuttynose on Towle Farm"
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/25" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/35 to-transparent" />
          <div className="relative mx-auto flex min-h-[100svh] max-w-site flex-col justify-end px-5 pb-16 pt-28 md:min-h-[70svh] md:px-8 md:pb-20">
            <div className="mb-4 flex items-center gap-3">
              <SealMark className="h-9 w-9 text-foam" />
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-foam/80">
                Hampton, NH
              </span>
            </div>
            <p className="font-display text-[clamp(2.8rem,9vw,5.5rem)] font-bold uppercase leading-[0.9] tracking-[0.04em]">
              Smuttynose
            </p>
            <div className="mt-4 h-1 w-24 bg-buoy" />
            <h1 className="mt-6 max-w-xl font-display text-[clamp(1.5rem,3.5vw,2.4rem)] font-semibold uppercase tracking-wide">
              Come hang at Towle Farm.
            </h1>
            <p className="mt-4 max-w-md text-base leading-relaxed text-foam/85 md:text-lg">
              Cold pours, patio hangs, and food trucks — about 10 minutes from
              Hampton Beach.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={links.waitlist}
                target="_blank"
                rel="noreferrer"
                className="bg-buoy px-5 py-3 text-sm font-semibold tracking-wide text-foam"
              >
                Join the waitlist
              </a>
              <a
                href={links.maps}
                target="_blank"
                rel="noreferrer"
                className="border border-foam/60 px-5 py-3 text-sm font-semibold tracking-wide text-foam"
              >
                Get directions
              </a>
            </div>
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
                  href={links.backyard}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex border border-ink/20 px-5 py-3 text-sm font-semibold tracking-wide"
                >
                  Official Backyard page
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
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
