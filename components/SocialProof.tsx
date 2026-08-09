import { testimonials, trustStats } from "@/lib/site";

export function SocialProof() {
  return (
    <section className="border-y border-line bg-white">
      <div className="mx-auto max-w-site px-5 py-16 sm:px-8 sm:py-20">
        <p className="section-label">Trusted by educators</p>
        <h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight text-navy text-balance">
          Built for real classrooms — not slide decks.
        </h2>

        <dl className="mt-10 grid gap-6 sm:grid-cols-3">
          {trustStats.map((stat) => (
            <div key={stat.label} className="rounded bg-paper-warm p-5">
              <dt className="text-sm font-semibold uppercase tracking-[0.08em] text-mute">
                {stat.label}
              </dt>
              <dd className="mt-2 text-3xl font-bold text-navy">{stat.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((item) => (
            <figure
              key={item.name}
              className="flex h-full flex-col rounded border border-line bg-white p-6 shadow-card"
            >
              <blockquote className="flex-1 text-base leading-relaxed text-ink-soft">
                “{item.quote}”
              </blockquote>
              <figcaption className="mt-5 border-t border-line pt-4">
                <p className="font-bold text-navy">{item.name}</p>
                <p className="text-sm text-mute">
                  {item.role}, {item.org}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
