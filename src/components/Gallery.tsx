import { useInView } from "../hooks/useInView";
import { asset } from "../lib/asset";

const shots = [
  {
    src: asset("images/campus-silos.jpg"),
    alt: "Grain silos outside the Smuttynose brewery building",
  },
  {
    src: asset("images/campus-sign.jpg"),
    alt: "Smuttynose Brewing Company stone entrance sign",
  },
  {
    src: asset("images/campus-patio.jpg"),
    alt: "Outdoor patio seating at Towle Farm",
  },
  {
    src: asset("images/campus-entrance.jpg"),
    alt: "Campus entrance and lawn at Towle Farm",
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

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {shots.map((shot, index) => (
            <figure
              key={shot.src}
              className={`overflow-hidden transition-all duration-700 ${
                visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
              style={{ transitionDelay: visible ? `${80 + index * 70}ms` : "0ms" }}
            >
              <img
                src={shot.src}
                alt={shot.alt}
                loading="lazy"
                className="aspect-[4/5] h-full w-full object-cover"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
