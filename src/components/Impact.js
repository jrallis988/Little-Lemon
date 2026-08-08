const stats = [
  {
    value: "12K+",
    label: "Youth supported each year",
    note: "Guidance rooted in dignity, safety, and practical next steps.",
  },
  {
    value: "48",
    label: "Neighborhood resource hubs",
    note: "Local places for mentorship, family connection, and steady support.",
  },
  {
    value: "92%",
    label: "Report clearer life direction",
    note: "When young people feel supported, stability becomes possible.",
  },
  {
    value: "310+",
    label: "Civic mentors and partners",
    note: "Community relationships that walk alongside youth through change.",
  },
];

function Impact() {
  return (
    <section
      id="impact"
      className="section-pad relative overflow-hidden bg-gradient-to-b from-violet-field to-ink"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(91,43,179,0.35),transparent_42%,rgba(200,245,66,0.08))]" />

      <div className="container relative">
        <div className="max-w-3xl">
          <p className="eyebrow">Youth support by the numbers</p>
          <h2 className="display mt-4 text-4xl md:text-5xl">
            Progress that belongs to young people
          </h2>
          <p className="mt-5 font-body text-lg text-violet-mist">
            Civic Bound measures what matters for youth: stronger direction,
            safer connections, and the resources that help them move forward.
          </p>
        </div>

        <dl className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="font-display text-5xl font-extrabold text-chartreuse md:text-6xl">
                {stat.value}
              </dt>
              <dd className="mt-3 font-body text-sm uppercase tracking-[0.16em] text-white">
                {stat.label}
              </dd>
              <p className="mt-3 font-body text-sm leading-relaxed text-violet-mist">
                {stat.note}
              </p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export default Impact;
