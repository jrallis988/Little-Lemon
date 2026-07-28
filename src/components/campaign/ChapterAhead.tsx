export function ChapterAhead() {
  return (
    <section id="ahead" className="relative overflow-hidden py-20 sm:py-28" aria-labelledby="ahead-heading">
      <div className="absolute inset-0">
        <img
          src="/images/campaign/future.jpg"
          alt=""
          className="h-full w-full object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/70 to-cobalt-900/50" />
      </div>
      <div className="section-shell relative text-white">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-tide">
          Chapter 7 · 63 Years Ahead
        </p>
        <h2
          id="ahead-heading"
          className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-tight sm:text-5xl"
          style={{ fontWeight: 700 }}
        >
          Optimism, not nostalgia.
        </h2>
        <p className="mt-4 max-w-2xl font-serif text-lg leading-relaxed text-white/75 sm:text-xl">
          AI-assisted wellness, personalized nutrition, predictive insights, smarter coaching, and
          connected devices—still in service of people choosing healthier lives.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "AI-assisted wellness that stays human",
            "Personalized nutrition that respects real kitchens",
            "Predictive health insights with room for grace",
            "Smarter coaching across screens and rooms",
            "Connected devices that quiet the noise",
            "A future of healthy living written together",
          ].map((item) => (
            <p
              key={item}
              className="rounded-2xl border border-white/15 bg-white/5 px-5 py-4 font-sans text-sm leading-relaxed text-white/85"
            >
              {item}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
