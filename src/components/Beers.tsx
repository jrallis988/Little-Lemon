import { beers } from "../data/beers";
import { useInView } from "../hooks/useInView";

export function Beers() {
  const { ref, visible } = useInView<HTMLElement>();

  return (
    <section id="beers" ref={ref} className="px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-site">
        <div
          className={`max-w-2xl transition-all duration-700 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-forge">
            On tap
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-wide md:text-5xl">
            Current pours
          </h2>
          <p className="mt-4 max-w-lg text-steel">
            Four year-round beers, rotated seasonals, and the occasional barrel
            experiment from the mill floor.
          </p>
        </div>

        <ul className="mt-12 divide-y divide-ink/10 border-y border-ink/10">
          {beers.map((beer, index) => (
            <li
              key={beer.name}
              className={`grid gap-3 py-6 transition-all duration-700 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)_auto] md:items-end md:gap-8 ${
                visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
              style={{ transitionDelay: visible ? `${120 + index * 90}ms` : "0ms" }}
            >
              <div>
                <h3 className="font-display text-3xl font-bold tracking-wide md:text-4xl">
                  {beer.name}
                </h3>
                <p className="mt-1 text-sm font-medium uppercase tracking-[0.14em] text-forge">
                  {beer.style}
                </p>
              </div>
              <p className="text-steel md:pb-1">{beer.note}</p>
              <p className="font-display text-2xl font-bold text-ink/80 md:text-right">
                {beer.abv}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
