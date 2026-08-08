const stats = [
  { value: "12K+", label: "Participants supported each year" },
  { value: "48", label: "Community campuses and hubs" },
  { value: "92%", label: "Report stronger life direction" },
  { value: "310+", label: "Local partners and mentors" },
];

function Impact() {
  return (
    <section
      id="impact"
      className="section-pad relative overflow-hidden bg-gradient-to-b from-violet-field to-ink"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(91,43,179,0.35),transparent_42%,rgba(200,245,66,0.08))]" />

      <div className="container relative">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">The impact</p>
          <h2 className="display mt-4 text-4xl md:text-5xl">
            Growth that shows up in everyday life
          </h2>
          <p className="mt-5 font-body text-lg text-violet-mist">
            Civic Bound tracks progress through skills gained, connections made,
            and the confidence people carry into their next chapter.
          </p>
        </div>

        <dl className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center sm:text-left">
              <dt className="font-display text-5xl font-extrabold text-chartreuse md:text-6xl">
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
