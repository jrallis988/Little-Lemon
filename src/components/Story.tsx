import { useInView } from "../hooks/useInView";

export function Story() {
  const { ref, visible } = useInView<HTMLElement>();

  return (
    <section id="story" ref={ref} className="px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-site gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:items-end">
        <div
          className={`transition-all duration-700 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-forge">
            Our story
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-wide md:text-5xl">
            Built in a mill.
            <br />
            Brewed for the bank.
          </h2>
        </div>

        <div
          className={`space-y-5 text-lg leading-relaxed text-steel transition-all duration-700 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
          style={{ transitionDelay: visible ? "120ms" : "0ms" }}
        >
          <p>
            Millhouse started in a restored grain mill on the Mad River — same
            stone walls, new tanks, and a stubborn belief that beer should taste
            like the place it was made.
          </p>
          <p>
            We brew in small runs, source grain from nearby farms when we can,
            and keep the tap list honest. No gimmicks. Just clean fermentation
            and a good seat by the water.
          </p>
        </div>
      </div>
    </section>
  );
}
