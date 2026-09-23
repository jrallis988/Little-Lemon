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
    <section id="impact" className="section-pad border-y border-paper-line bg-paper-soft">
      <div className="container">
        <div className="max-w-3xl">
          <p className="eyebrow-accent">Youth support by the numbers</p>
          <h2 className="display mt-5 text-3xl md:text-5xl">
            Progress that belongs to young people
          </h2>
          <p className="lede mt-5">
            Civic Bound measures what matters for youth: stronger direction,
            safer connections, and the resources that help them move forward.
          </p>
        </div>

        <dl className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="border-t border-paper-line pt-6">
              <dt className="font-display text-4xl font-semibold text-charcoal-deep md:text-5xl">
                {stat.value}
              </dt>
              <dd className="micro-label mt-3 text-chartreuse">
                {stat.label}
              </dd>
              <p className="mt-3 font-body text-sm leading-relaxed text-charcoal">
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
