import { Link } from "react-router-dom";

const bridges = [
  {
    title: "Community",
    copy: "Belonging was the original technology—coaching, circles, and shared encouragement.",
    image: "/images/campaign/meeting.jpg",
    imageAlt: "Two people hiking together—community as shared progress",
    to: "/stories",
    cta: "See community stories",
  },
  {
    title: "Science",
    copy: "Nutrition, behavior, habits, and modern medical support kept human—not clinical theater.",
    image: "/images/campaign/science.jpg",
    imageAlt: "Research-informed wellness without procedure imagery",
    to: "/research",
    cta: "Explore research",
  },
  {
    title: "Innovation",
    copy: "From paper journals to intelligent guidance. Tools changed; the commitment did not.",
    image: "/images/campaign/phone.jpg",
    imageAlt: "Modern WW tools on a phone in everyday life",
    to: "/innovation",
    cta: "See innovation",
  },
] as const;

/** Compact bridge replacing three long homepage chapters. */
export function ChapterPresent() {
  return (
    <section
      id="present-63"
      className="relative py-16 sm:py-20"
      aria-labelledby="present63-heading"
    >
      <div className="section-shell">
        <div className="max-w-3xl">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-cobalt-600">
            Present · What still holds
          </p>
          <h2
            id="present63-heading"
            className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl"
            style={{ fontWeight: 700 }}
          >
            Community, science, and tools—still one story.
          </h2>
          <p className="mt-3 font-serif text-lg leading-relaxed text-ink/65">
            The middle of the campaign is simple: people, evidence, and livable innovation. Dive
            deeper on dedicated pages.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {bridges.map((item) => (
            <article key={item.title} className="overflow-hidden rounded-[1.5rem] bg-white">
              <img
                src={item.image}
                alt={item.imageAlt}
                className="campaign-photo aspect-[16/10] w-full"
                loading="lazy"
              />
              <div className="p-5">
                <h3 className="font-display text-xl font-bold text-ink" style={{ fontWeight: 700 }}>
                  {item.title}
                </h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-ink/65">{item.copy}</p>
                <Link
                  to={item.to}
                  className="mt-4 inline-flex font-sans text-sm font-semibold text-cobalt-700"
                >
                  {item.cta} →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
