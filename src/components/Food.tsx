import { links } from "../data/links";
import { useInView } from "../hooks/useInView";

export function Food() {
  const { ref, visible } = useInView<HTMLElement>();

  return (
    <section id="food" ref={ref} className="bg-ink text-foam">
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[18rem] overflow-hidden lg:min-h-[34rem]">
          <img
            src="/images/hayseed-plate.jpg"
            alt="Fried chicken plate and Hayseed glass on the Smuttynose patio"
            className={`h-full w-full object-cover transition-transform duration-[1.4s] ease-out ${
              visible ? "scale-100" : "scale-110"
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent lg:bg-gradient-to-r" />
        </div>

        <div className="flex flex-col justify-center px-5 py-16 md:px-12 md:py-24">
          <div
            className={`max-w-md transition-all duration-700 ${
              visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-salt">
              Eat & drink
            </p>
            <h2 className="mt-3 font-display text-4xl font-bold uppercase tracking-wide md:text-5xl">
              Restaurant + rotating trucks
            </h2>
            <p className="mt-4 leading-relaxed text-foam/80">
              Grab a bite at the Smuttynose Restaurant, or catch the rotating
              local food-truck lineup that keeps campus menus fresh week to week.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={links.restaurant}
                target="_blank"
                rel="noreferrer"
                className="bg-buoy px-5 py-3 text-sm font-semibold tracking-wide text-foam transition-transform duration-300 hover:-translate-y-0.5"
              >
                View restaurant menu
              </a>
              <a
                href={links.facebook}
                target="_blank"
                rel="noreferrer"
                className="border border-foam/50 px-5 py-3 text-sm font-semibold tracking-wide text-foam transition-colors hover:bg-foam/10"
              >
                Truck schedule
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
