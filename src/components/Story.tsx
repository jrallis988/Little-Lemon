import { useInView } from "../hooks/useInView";

export function Story() {
  const { ref, visible } = useInView<HTMLElement>();

  return (
    <section id="story" ref={ref} className="px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-site gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-end lg:gap-16">
        <div
          className={`transition-all duration-700 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-tide">
            Our story
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold uppercase tracking-wide md:text-5xl">
            Named for an island.
            <br />
            Brewed for New Hampshire.
          </h2>
        </div>

        <div
          className={`space-y-5 text-lg leading-relaxed text-steel transition-all duration-700 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
          style={{ transitionDelay: visible ? "120ms" : "0ms" }}
        >
          <p>
            Smuttynose takes its name from Smuttynose Island in the Isles of
            Shoals — a rocky outpost off the New Hampshire coast. Founded in
            1994, the brewery grew from Portsmouth roots to a LEED Gold campus
            on historic Towle Farm in Hampton.
          </p>
          <p>
            Today the farm hosts production, pours, food, and events — still
            shipping unfiltered New England beer with the same irreverent
            spirit that started it all.
          </p>
        </div>
      </div>
    </section>
  );
}
