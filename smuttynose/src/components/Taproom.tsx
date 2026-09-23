import { links } from "../data/links";
import { useInView } from "../hooks/useInView";
import { CampusImage } from "./CampusImage";

export function Taproom() {
  const { ref, visible } = useInView<HTMLElement>();

  return (
    <section id="visit" ref={ref} className="bg-tide-deep text-foam">
      <div className="grid min-h-[34rem] lg:grid-cols-2">
        <div className="relative min-h-[18rem] overflow-hidden lg:min-h-full">
          <CampusImage
            name="campus-entrance"
            alt="Entrance to Smuttynose on Towle Farm with lawn, patio seating, and the red brewery building"
            className={`h-full w-full object-cover transition-transform duration-[1.4s] ease-out ${
              visible ? "scale-100" : "scale-110"
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-tide-deep/55 to-transparent lg:bg-gradient-to-r" />
        </div>

        <div className="flex flex-col justify-center px-5 py-16 md:px-12 md:py-24">
          <div
            className={`max-w-md transition-all duration-700 ${
              visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-salt">
              Towle Farm
            </p>
            <h2 className="mt-3 font-display text-4xl font-bold uppercase tracking-wide md:text-5xl">
              Come hang in Hampton.
            </h2>
            <p className="mt-4 leading-relaxed text-foam/80">
              Seventeen acres of farm campus — brewery, restaurant, and the
              Backyard for cold pours, food trucks, and summer hangs just inland
              from Hampton Beach.
            </p>

            <dl className="mt-10 space-y-5 text-sm">
              <div>
                <dt className="font-semibold uppercase tracking-[0.16em] text-salt">
                  From the beach
                </dt>
                <dd className="mt-1 text-base text-foam/90">
                  ~10 minutes from Hampton Beach · Route 27 / Towle Farm Road
                </dd>
              </div>
              <div>
                <dt className="font-semibold uppercase tracking-[0.16em] text-salt">
                  Parking
                </dt>
                <dd className="mt-1 text-base text-foam/90">
                  Free on-site lot at the brewery entrance — look for the red
                  building and silos.
                </dd>
              </div>
              <div>
                <dt className="font-semibold uppercase tracking-[0.16em] text-salt">
                  Backyard Club hours
                </dt>
                <dd className="mt-2 space-y-1 text-base text-foam/90">
                  {links.hoursRows.map((row) => (
                    <div
                      key={row.days}
                      className="flex justify-between gap-6 border-b border-foam/10 py-1.5 last:border-0"
                    >
                      <span>{row.days}</span>
                      <span className="text-foam/75">{row.time}</span>
                    </div>
                  ))}
                  <p className="pt-2 text-sm text-foam/65">{links.hoursKitchen}</p>
                </dd>
              </div>
              <div>
                <dt className="font-semibold uppercase tracking-[0.16em] text-salt">
                  Find us
                </dt>
                <dd className="mt-1 text-base text-foam/90">{links.address}</dd>
              </div>
              <div>
                <dt className="font-semibold uppercase tracking-[0.16em] text-salt">
                  Call
                </dt>
                <dd className="mt-1 space-y-1 text-base text-foam/90">
                  <p>
                    Backyard Club ·{" "}
                    <a
                      href={links.phone}
                      className="underline-offset-2 hover:underline"
                    >
                      {links.phoneDisplay}
                    </a>
                  </p>
                  <p>
                    Brewery ·{" "}
                    <a
                      href={links.phoneBrewery}
                      className="underline-offset-2 hover:underline"
                    >
                      {links.phoneBreweryDisplay}
                    </a>
                  </p>
                </dd>
              </div>
            </dl>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={links.backyard}
                target="_blank"
                rel="noreferrer"
                className="inline-flex bg-buoy px-5 py-3 text-sm font-semibold tracking-wide text-foam transition-transform duration-300 hover:-translate-y-0.5"
              >
                Visit the Backyard
              </a>
              <a
                href={links.waitlist}
                target="_blank"
                rel="noreferrer"
                className="inline-flex border border-foam/50 px-5 py-3 text-sm font-semibold tracking-wide text-foam transition-colors hover:bg-foam/10"
              >
                Join the waitlist
              </a>
              <a
                href={links.maps}
                target="_blank"
                rel="noreferrer"
                className="inline-flex border border-foam/50 px-5 py-3 text-sm font-semibold tracking-wide text-foam transition-colors hover:bg-foam/10"
              >
                Get directions
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-foam/10 px-5 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-site">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-salt">
                Map & directions
              </p>
              <h3 className="mt-2 font-display text-3xl font-bold uppercase tracking-wide">
                Easy from the beach
              </h3>
            </div>
            <p className="max-w-md text-sm text-foam/70">
              About a 10-minute drive from Hampton Beach. Free parking on campus
              — set GPS to Towle Farm Road.
            </p>
          </div>
          <div className="overflow-hidden border border-foam/15 bg-ink/30">
            <iframe
              title="Map to Smuttynose Brewing at 105 Towle Farm Road, Hampton, NH"
              src={links.mapsEmbed}
              className="h-[18rem] w-full md:h-[24rem]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
