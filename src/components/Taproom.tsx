import { useInView } from "../hooks/useInView";

export function Taproom() {
  const { ref, visible } = useInView<HTMLElement>();

  return (
    <section id="taproom" ref={ref} className="bg-forge-deep text-foam">
      <div className="grid min-h-[34rem] lg:grid-cols-2">
        <div className="relative min-h-[18rem] overflow-hidden lg:min-h-full">
          <img
            src="/images/taproom-glass.jpg"
            alt="Freshly poured pint with a thick foam head at Millhouse"
            className={`h-full w-full object-cover transition-transform duration-[1.4s] ease-out ${
              visible ? "scale-100" : "scale-110"
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forge-deep/50 to-transparent lg:bg-gradient-to-r" />
        </div>

        <div className="flex flex-col justify-center px-5 py-16 md:px-12 md:py-24">
          <div
            className={`max-w-md transition-all duration-700 ${
              visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-grain">
              Taproom
            </p>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-wide md:text-5xl">
              Come sit by the river.
            </h2>
            <p className="mt-4 leading-relaxed text-foam/80">
              Sixteen taps, a mill-view patio, and a kitchen that keeps things
              simple — pretzels, smoked cheese boards, and local sausages.
            </p>

            <dl className="mt-10 space-y-5 text-sm">
              <div>
                <dt className="font-semibold uppercase tracking-[0.16em] text-grain">
                  Hours
                </dt>
                <dd className="mt-1 text-base text-foam/90">
                  Wed–Thu 3–9 · Fri–Sat 12–10 · Sun 12–7
                </dd>
              </div>
              <div>
                <dt className="font-semibold uppercase tracking-[0.16em] text-grain">
                  Find us
                </dt>
                <dd className="mt-1 text-base text-foam/90">
                  48 Mill Race Road, Waterbury, VT
                </dd>
              </div>
            </dl>

            <a
              href="mailto:hello@millhousebrewing.example"
              className="mt-10 inline-flex bg-ember px-5 py-3 text-sm font-semibold tracking-wide text-ink transition-transform duration-300 hover:-translate-y-0.5"
            >
              Book a tasting
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
