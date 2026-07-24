import { testimonials } from "@/lib/testimonials";

export function Testimonials() {
  const featured = testimonials.find((t) => t.featured)!;
  const supporting = testimonials.filter((t) => !t.featured);

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="bg-snow"
    >
      <div className="mx-auto max-w-content section-pad">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-pine-600">
          What New Hampshire Is Saying
        </p>
        <h2
          id="testimonials-heading"
          className="mt-2 font-serif text-3xl font-bold text-granite-800 sm:text-4xl"
        >
          Real voices from across the Granite State.
        </h2>

        <blockquote className="mt-10 border border-granite-200 bg-mist p-6 sm:p-10">
          <p className="font-serif text-2xl italic leading-relaxed text-granite-800 sm:text-3xl">
            “{featured.quote}”
          </p>
          <footer className="mt-6 text-base font-semibold text-granite-600">
            — {featured.name}, {featured.town}
          </footer>
        </blockquote>

        <ul className="mt-6 grid gap-5 md:grid-cols-2">
          {supporting.map((t) => (
            <li key={t.id} className="border border-granite-200 bg-white p-6">
              <p className="font-serif text-lg italic leading-relaxed text-granite-700">
                “{t.quote}”
              </p>
              <p className="mt-4 text-sm font-semibold text-granite-500">
                — {t.name}, {t.town}
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-granite-400">
          Placeholder names — real testimonials from real NH supporters will replace these.
        </p>
      </div>
    </section>
  );
}
