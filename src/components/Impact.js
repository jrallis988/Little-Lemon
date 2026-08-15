const stats = [
  {
    value: "11",
    suffix: "pt",
    label: "Average lift in grades & confidence",
    note: "When students get social and academic coaching together.",
  },
  {
    value: "3",
    suffix: "×",
    label: "Higher graduation odds",
    note: "For youth who stay on track by 10th grade with steady support.",
  },
  {
    value: "90",
    suffix: "%",
    label: "Parents want tech guidance",
    note: "Families ask for digital literacy—not just bans—to protect wellbeing.",
  },
  {
    value: "48",
    suffix: "",
    label: "Neighborhood resource hubs",
    note: "Local places for belonging, mentorship, and family connection.",
  },
];

function Impact() {
  return (
    <section id="impact" className="section-pad bg-charcoal-deep text-white">
      <div className="container">
        <div className="max-w-3xl">
          <p className="eyebrow-accent !text-chartreuse after:!bg-chartreuse">
            Impact
          </p>
          <h2 className="display mt-5 text-3xl text-white md:text-5xl">
            What change looks like
          </h2>
          <p className="mt-5 font-body text-lg leading-relaxed text-white/80 md:text-xl">
            When belonging, learning support, and wellbeing move together,
            outcomes rise—for students, families, and neighborhoods.
          </p>
        </div>

        <dl className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="border-t border-white/20 pt-6">
              <dt className="font-display text-4xl font-semibold text-chartreuse md:text-5xl">
                {stat.value}
                <span className="text-[0.55em]">{stat.suffix}</span>
              </dt>
              <dd className="micro-label mt-3 !text-white/70">{stat.label}</dd>
              <p className="mt-3 font-body text-sm leading-relaxed text-white/75">
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
