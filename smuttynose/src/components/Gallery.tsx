import { useInView } from "../hooks/useInView";
import { CampusImage } from "./CampusImage";

const shots = [
  {
    name: "campus-day",
    alt: "Smuttynose brewery and grain silos on Towle Farm in daylight",
    position: "center",
  },
  {
    name: "campus-silos",
    alt: "Grain silos outside the Smuttynose brewery building",
    position: "center",
  },
  {
    name: "campus-sign",
    alt: "Smuttynose Brewing Company stone entrance sign",
    position: "center",
  },
  {
    name: "campus-patio",
    alt: "Outdoor patio seating at Towle Farm",
    position: "center",
  },
  {
    name: "campus-entrance",
    alt: "Campus entrance and lawn at Towle Farm",
    position: "center",
  },
  {
    name: "campus-dusk",
    alt: "Towle Farm campus at golden hour",
    position: "70% center",
  },
];

export function Gallery() {
  const { ref, visible } = useInView<HTMLElement>(0.12);

  return (
    <section id="gallery" ref={ref} className="px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-site">
        <div
          className={`mb-8 max-w-2xl transition-all duration-700 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-tide">
            Campus
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold uppercase tracking-wide md:text-4xl">
            Towle Farm, for real
          </h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {shots.map((shot, index) => (
            <figure
              key={shot.name}
              className={`overflow-hidden transition-all duration-700 ${
                visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
              style={{
                transitionDelay: visible ? `${80 + index * 70}ms` : "0ms",
              }}
            >
              <CampusImage
                name={shot.name}
                alt={shot.alt}
                objectPosition={shot.position}
                className="aspect-[4/5] h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
