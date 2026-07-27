import { useInView } from "../hooks/useInView";

export function Taproom() {
  const { ref, visible } = useInView<HTMLElement>();

  return (
    <section id="visit" ref={ref} className="bg-tide-deep text-foam">
      <div className="grid min-h-[34rem] lg:grid-cols-2">
        <div className="relative min-h-[18rem] overflow-hidden lg:min-h-full">
          <img
            src="/images/towle-farm.jpg"
            alt="Golden grain fields at sunset on a New Hampshire farm"
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
                  Backyard hours
                </dt>
                <dd className="mt-1 text-base text-foam/90">
                  Wed–Thu 3–8 · Fri–Sun 12–8
                </dd>
              </div>
              <div>
                <dt className="font-semibold uppercase tracking-[0.16em] text-salt">
                  Find us
                </dt>
                <dd className="mt-1 text-base text-foam/90">
                  105 Towle Farm Road, Hampton, NH 03842
                </dd>
              </div>
              <div>
                <dt className="font-semibold uppercase tracking-[0.16em] text-salt">
                  Call
                </dt>
                <dd className="mt-1 text-base text-foam/90">
                  <a href="tel:+16036018300" className="underline-offset-2 hover:underline">
                    (603) 601-8300
                  </a>
                </dd>
              </div>
            </dl>

            <a
              href="https://smuttynose.com/visit-the-backyard/"
              target="_blank"
              rel="noreferrer"
              className="mt-10 inline-flex bg-buoy px-5 py-3 text-sm font-semibold tracking-wide text-foam transition-transform duration-300 hover:-translate-y-0.5"
            >
              Visit the Backyard
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
