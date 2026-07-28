import { Link } from "react-router-dom";
import { stories } from "../../data/campaign";
import { useInView } from "../../hooks/motion";

export function ChapterYearsOfYou() {
  const { ref, visible } = useInView<HTMLElement>(0.15);

  return (
    <section
      id="years-of-you"
      ref={ref}
      className="relative overflow-hidden bg-mist/50 py-20 sm:py-28"
      aria-labelledby="you-heading"
    >
      <div className="section-shell">
        <div className="max-w-3xl">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-cobalt-600">
            Chapter 3 · 63 Years of You
          </p>
          <h2
            id="you-heading"
            className="mt-3 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl"
            style={{ fontWeight: 700 }}
          >
            Customer needs are the whole plot.
          </h2>
          <p className="mt-4 font-serif text-lg leading-relaxed text-ink/65 sm:text-xl">
            Different ages, schedules, bodies, and goals. The campaign exists because those
            priorities come first—Weight Watchers is the guide, not the hero.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {stories.map((story, index) => (
            <article
              key={story.id}
              className={`overflow-hidden rounded-[1.75rem] bg-white transition duration-700 ${
                visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <img
                src={story.image}
                alt={`Portrait representing ${story.name}`}
                className="aspect-[4/5] w-full object-cover object-top"
                loading="lazy"
              />
              <div className="p-6 sm:p-7">
                <p className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-ink/40">
                  {story.name} · {story.ageRange} · {story.place}
                </p>
                <blockquote className="mt-3 font-serif text-xl leading-snug text-ink sm:text-2xl">
                  “{story.quote}”
                </blockquote>
                <p className="mt-3 font-sans text-sm leading-relaxed text-ink/60">{story.moment}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10">
          <Link
            to="/stories"
            className="font-sans text-sm font-semibold text-cobalt-700 transition hover:text-cobalt-800"
          >
            Explore more success stories →
          </Link>
        </div>
      </div>
    </section>
  );
}
