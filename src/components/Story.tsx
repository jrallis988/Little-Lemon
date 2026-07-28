import { useInView } from "../hooks/useInView";
import { asset } from "../lib/asset";

export function Story() {
  const { ref, visible } = useInView<HTMLElement>();

  return (
    <section id="story" ref={ref} className="overflow-hidden">
      <div className="grid lg:grid-cols-2">
        <div className="order-2 flex flex-col justify-center px-5 py-20 md:px-12 md:py-28 lg:order-1">
          <div
            className={`mx-auto w-full max-w-xl transition-all duration-700 ${
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
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-steel">
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
        </div>

        <div className="relative order-1 min-h-[18rem] lg:order-2 lg:min-h-full">
          <img
            src={asset("images/campus-patio.jpg")}
            alt="Outdoor patio seating at Smuttynose Towle Farm campus"
            className={`h-full w-full object-cover transition-transform duration-[1.4s] ease-out ${
              visible ? "scale-100" : "scale-105"
            }`}
          />
        </div>
      </div>
    </section>
  );
}
