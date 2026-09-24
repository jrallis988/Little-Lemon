import { CampusImage } from "../components/CampusImage";
import { CartDrawer } from "../components/CartDrawer";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { PageMeta } from "../components/PageMeta";
import { SkipLink } from "../components/SkipLink";
import { TripleseatEmbed } from "../components/TripleseatEmbed";
import { links } from "../data/links";
import { venues } from "../data/venues";

export function PrivateEventsPage() {
  return (
    <div className="min-h-screen bg-foam">
      <PageMeta
        title="Private events"
        description="Book the Heritage Room, Field, or Backyard Patio at Smuttynose Towle Farm — up to 200 guests."
        path="/events/private"
      />
      <SkipLink />
      <Header solid />
      <CartDrawer />
      <main id="main">
        <section className="bg-ink px-5 pb-16 pt-28 text-foam md:px-8 md:pb-20 md:pt-32">
          <div className="mx-auto max-w-site">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-salt">
              Private events
            </p>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold uppercase tracking-wide md:text-6xl">
              Book a space on Towle Farm
            </h1>
            <p className="mt-4 max-w-2xl text-foam/75">
              Heritage Room for up to 30 guests indoors, or the two-acre Field
              for up to 200 under tent — host your next gathering where the beer
              is brewed. Call{" "}
              <a href={links.phone} className="underline underline-offset-2">
                {links.phoneDisplay}
              </a>
              .
            </p>
          </div>
        </section>

        <section className="px-5 py-16 md:px-8 md:py-24">
          <div className="mx-auto grid max-w-site gap-10 lg:gap-14">
            {venues.map((venue, index) => (
              <article
                key={venue.id}
                className={`grid gap-0 overflow-hidden lg:grid-cols-2 ${
                  index % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""
                }`}
              >
                <div className="relative min-h-[16rem] lg:min-h-[22rem]">
                  <CampusImage
                    name={venue.image}
                    alt={venue.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center bg-foam p-6 md:p-10">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-tide">
                    {venue.setting}
                  </p>
                  <h2 className="mt-2 font-display text-3xl font-bold uppercase tracking-wide md:text-4xl">
                    {venue.name}
                  </h2>
                  <p className="mt-2 font-display text-xl font-bold text-buoy">
                    {venue.capacity}
                  </p>
                  <p className="mt-4 text-steel">{venue.note}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {venue.bestFor.map((item) => (
                      <li
                        key={item}
                        className="border border-ink/15 px-3 py-1 text-sm"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="border-t border-ink/10 px-5 py-16 md:px-8 md:py-24">
          <div className="mx-auto max-w-site">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-tide">
              Official booking
            </p>
            <h2 className="mt-3 font-display text-4xl font-bold uppercase tracking-wide">
              Tell us about your event
            </h2>
            <p className="mt-3 max-w-2xl text-steel">
              Same Tripleseat intake as{" "}
              <a
                href={links.privateEvent}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-tide underline-offset-2 hover:underline"
              >
                smuttynose.com/private-event
              </a>
              .
            </p>
            <div className="mt-8">
              <TripleseatEmbed scriptUrl={links.tripleseatScript} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
