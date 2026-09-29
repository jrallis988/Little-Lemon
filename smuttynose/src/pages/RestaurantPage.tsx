import { Link } from "react-router-dom";
import { CampusImage } from "../components/CampusImage";
import { CartDrawer } from "../components/CartDrawer";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { PageMeta } from "../components/PageMeta";
import { SealMark } from "../components/SealMark";
import { SkipLink } from "../components/SkipLink";
import { links } from "../data/links";

export function RestaurantPage() {
  return (
    <div className="min-h-screen bg-foam">
      <PageMeta
        title="Restaurant"
        description="Smuttynose Restaurant at Towle Farm — patio dining, rotating food trucks, Toast waitlist, and loyalty rewards."
        path="/restaurant"
      />
      <SkipLink />
      <Header solid />
      <CartDrawer />
      <main id="main">
        <section className="relative min-h-[70svh] overflow-hidden bg-ink text-foam">
          <CampusImage
            name="hayseed-plate"
            alt="Food and beer on the Smuttynose patio"
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/30" />
          <div className="relative mx-auto flex min-h-[70svh] max-w-site flex-col justify-end px-5 pb-16 pt-28 md:px-8 md:pb-20">
            <div className="mb-4 flex items-center gap-3">
              <SealMark className="h-9 w-9" />
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-foam/80">
                Towle Farm
              </span>
            </div>
            <p className="font-display text-[clamp(2.6rem,8vw,5rem)] font-bold uppercase leading-[0.9] tracking-[0.04em]">
              Smuttynose
            </p>
            <div className="mt-4 h-1 w-24 bg-buoy" />
            <h1 className="mt-6 max-w-xl font-display text-[clamp(1.5rem,3.4vw,2.3rem)] font-semibold uppercase tracking-wide">
              Restaurant + rotating trucks
            </h1>
            <p className="mt-4 max-w-md text-foam/85">
              Patio plates, cold pours, and local trucks — kitchen closes 30
              minutes before closing every night.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={links.restaurant}
                target="_blank"
                rel="noreferrer"
                className="bg-buoy px-5 py-3 text-sm font-semibold tracking-wide text-foam"
              >
                View full menu
              </a>
              <a
                href={links.waitlist}
                target="_blank"
                rel="noreferrer"
                className="border border-foam/60 px-5 py-3 text-sm font-semibold tracking-wide text-foam"
              >
                Join waitlist
              </a>
            </div>
          </div>
        </section>

        <section className="px-5 py-16 md:px-8 md:py-24">
          <div className="mx-auto grid max-w-site gap-12 lg:grid-cols-3">
            <div>
              <h2 className="font-display text-2xl font-bold uppercase tracking-wide">
                Hours
              </h2>
              <dl className="mt-6 space-y-2 text-sm">
                {links.hoursRows.map((row) => (
                  <div
                    key={row.days}
                    className="flex justify-between gap-4 border-b border-ink/10 py-2"
                  >
                    <dt className="font-semibold uppercase tracking-[0.12em] text-tide">
                      {row.days}
                    </dt>
                    <dd>{row.time}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-sm text-steel">{links.hoursKitchen}</p>
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold uppercase tracking-wide">
                Loyalty
              </h2>
              <p className="mt-4 text-steel">
                Earn 1 point per $1. Unlock $5 off every 50 points, plus signup
                and birthday bonuses via Toast.
              </p>
              <a
                href={links.loyalty}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex bg-ink px-5 py-3 text-sm font-semibold tracking-wide text-foam"
              >
                Join loyalty
              </a>
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold uppercase tracking-wide">
                Trucks & music
              </h2>
              <p className="mt-4 text-steel">
                Rotating local food trucks and patio music — follow the
                restaurant Facebook page for this week’s lineup.
              </p>
              <a
                href={links.facebookRestaurant}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex border border-ink/20 px-5 py-3 text-sm font-semibold tracking-wide"
              >
                Facebook updates
              </a>
            </div>
          </div>
          <p className="mx-auto mt-12 max-w-site text-sm text-steel">
            Prefer the official page?{" "}
            <a
              href={links.restaurant}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-tide underline-offset-2 hover:underline"
            >
              smuttynose.com/smuttynose-restaurant
            </a>
            . Or{" "}
            <Link to="/visit" className="font-semibold text-tide hover:underline">
              plan a visit
            </Link>
            .
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
