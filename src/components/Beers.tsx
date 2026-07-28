import { classics, pouringNow, tapListUpdatedLabel } from "../data/beers";
import { links } from "../data/links";
import { useInView } from "../hooks/useInView";

function statusLabel(status?: string) {
  if (status === "limited") return "Limited";
  if (status === "pouring") return "Pouring";
  if (status === "classic") return "Classic";
  return null;
}

function BeerRows({
  items,
  visible,
  startDelay = 0,
  showStatus = false,
}: {
  items: typeof pouringNow;
  visible: boolean;
  startDelay?: number;
  showStatus?: boolean;
}) {
  return (
    <ul className="divide-y divide-ink/10 border-y border-ink/10">
      {items.map((beer, index) => {
        const label = statusLabel(beer.status);
        return (
          <li
            key={beer.name}
            className={`grid gap-3 py-6 transition-all duration-700 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.95fr)_auto] md:items-end md:gap-8 ${
              visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
            style={{
              transitionDelay: visible ? `${startDelay + index * 80}ms` : "0ms",
            }}
          >
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="font-display text-3xl font-bold uppercase tracking-wide md:text-4xl">
                  {beer.name}
                </h3>
                {showStatus && label ? (
                  <span
                    className={`text-[0.7rem] font-semibold uppercase tracking-[0.14em] ${
                      beer.status === "limited"
                        ? "text-buoy"
                        : "text-tide"
                    }`}
                  >
                    {label}
                  </span>
                ) : null}
              </div>
              <p className="mt-1 text-sm font-medium uppercase tracking-[0.14em] text-tide">
                {beer.style}
              </p>
            </div>
            <p className="text-steel md:pb-1">{beer.note}</p>
            <p className="font-display text-2xl font-bold text-ink/80 md:text-right">
              {beer.abv}
            </p>
          </li>
        );
      })}
    </ul>
  );
}

export function Beers() {
  const { ref, visible } = useInView<HTMLElement>();
  const updated = tapListUpdatedLabel();

  return (
    <section id="beers" ref={ref} className="px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-site">
        <div
          className={`flex flex-col gap-6 md:flex-row md:items-end md:justify-between ${
            visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          } transition-all duration-700`}
        >
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-tide">
                What’s pouring
              </p>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-buoy">
                <span className="h-1.5 w-1.5 rounded-full bg-buoy" aria-hidden="true" />
                Updated {updated}
              </span>
            </div>
            <h2 className="mt-3 font-display text-4xl font-bold uppercase tracking-wide md:text-5xl">
              On tap now
            </h2>
            <p className="mt-4 max-w-lg text-steel">
              Today’s featured draft board. The full list rotates — check the
              live board before you head over.
            </p>
          </div>
          <a
            href={links.restaurant}
            target="_blank"
            rel="noreferrer"
            className="inline-flex self-start bg-buoy px-5 py-3 text-sm font-semibold tracking-wide text-foam transition-transform duration-300 hover:-translate-y-0.5"
          >
            See live tap list
          </a>
        </div>

        <div className="mt-12">
          <BeerRows items={pouringNow} visible={visible} showStatus />
        </div>

        <div
          className={`mt-16 transition-all duration-700 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
          style={{ transitionDelay: visible ? "280ms" : "0ms" }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-tide">
            Year-round classics
          </p>
          <h3 className="mt-2 font-display text-3xl font-bold uppercase tracking-wide md:text-4xl">
            Always in the rotation
          </h3>
        </div>

        <div className="mt-8">
          <BeerRows items={classics} visible={visible} startDelay={320} />
        </div>
      </div>
    </section>
  );
}
