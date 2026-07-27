const stats = [
  { value: "2M+", label: "Children served since 1988" },
  { value: "29", label: "U.S. cities with City Year teams" },
  { value: "40K", label: "Alumni leading where they live" },
  { value: "57M+", label: "Hours of national service" },
];

function Impact() {
  return (
    <section
      id="impact"
      className="section-pad relative overflow-hidden bg-gradient-to-b from-ink-soft to-ink"
    >
      <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-violet-deep/40 blur-3xl" />
      <div className="absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />

      <div className="container relative">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">The impact</p>
          <h2 className="display mt-4 text-4xl md:text-5xl">
            Service that compounds across generations
          </h2>
          <p className="mt-5 font-body text-lg text-violet-mist">
            Research shows that more time with a City Year student success coach
            is linked to stronger academic, attendance, and interpersonal
            outcomes.
          </p>
        </div>

        <dl className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center sm:text-left">
              <dt className="font-display text-5xl font-extrabold text-gold md:text-6xl">
                {stat.value}
              </dt>
              <dd className="mt-3 font-body text-sm uppercase tracking-[0.16em] text-violet-mist">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export default Impact;
