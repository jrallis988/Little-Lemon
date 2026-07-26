const pathways = [
  {
    id: "core",
    title: "Core",
    eyebrow: "Points® Program",
    copy: "A flexible food framework that teaches balance without banning the meals you love.",
    image: "/images/food.jpg",
    alt: "Fresh vegetables and a prepared meal on a kitchen counter",
    cta: "See how Points work",
  },
  {
    id: "med",
    title: "Med+",
    eyebrow: "Clinical care",
    copy: "Board-certified physicians, GLP-1 guidance when appropriate, and coaching that stays with you beyond the prescription.",
    image: "/images/coach.jpg",
    alt: "A clinician speaking with warmth in a bright studio setting",
    cta: "Learn about Med+",
  },
  {
    id: "together",
    title: "Together",
    eyebrow: "Human support",
    copy: "Coach-led groups and a community that doubles results for members who show up for each other.",
    image: "/images/community.jpg",
    alt: "Friends laughing together outdoors",
    cta: "Meet the community",
  },
];

export function Pathways() {
  return (
    <section id="pathways" className="relative py-20 sm:py-28" aria-labelledby="pathways-heading">
      <div className="section-shell">
        <div className="max-w-2xl">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-cobalt-600">
            Your path
          </p>
          <h2
            id="pathways-heading"
            className="mt-3 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl"
            style={{ fontWeight: 700 }}
          >
            One platform. Three ways forward.
          </h2>
          <p className="mt-4 max-w-xl font-serif text-lg leading-relaxed text-ink/65 sm:text-xl">
            Whether you want structure, medication support, or people in your corner—start where you are.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:gap-10">
          {pathways.map((item, index) => (
            <article
              key={item.id}
              className={`grid items-center gap-6 md:grid-cols-2 md:gap-10 ${
                index % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""
              }`}
            >
              <div className="relative overflow-hidden rounded-[1.75rem]">
                <img
                  src={item.image}
                  alt={item.alt}
                  className={`h-64 w-full object-cover sm:h-80 ${
                    item.id === "med" || item.id === "together" ? "grayscale" : ""
                  }`}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/35 to-transparent" />
              </div>

              <div className="md:py-4">
                <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-tide">
                  {item.eyebrow}
                </p>
                <h3
                  className="mt-2 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl"
                  style={{ fontWeight: 700 }}
                >
                  {item.title}
                </h3>
                <p className="mt-4 max-w-md font-sans text-base leading-relaxed text-ink/70 sm:text-lg">
                  {item.copy}
                </p>
                <a
                  href="#join"
                  className="link-underline mt-6 inline-flex font-sans text-sm font-semibold text-cobalt-700"
                >
                  {item.cta}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
