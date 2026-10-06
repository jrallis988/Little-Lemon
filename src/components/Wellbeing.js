const factors = [
  "Social isolation and the need for real-world belonging",
  "Device use, digital literacy, and healthy tech habits",
  "Family and economic stress that follows kids into school",
  "Learning environments where every student can stay on track",
];

function Wellbeing() {
  return (
    <section id="wellbeing" className="section-pad border-y border-paper-line bg-paper-soft">
      <div className="container grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <p className="eyebrow-accent">Youth mental wellbeing</p>
          <h2 className="display mt-5 text-3xl md:text-5xl">
            Convening a fuller conversation
          </h2>
          <p className="lede mt-5">
            Youth wellbeing is shaped by more than any single issue. Civic Bound
            brings parents, students, mental health experts, educators, and
            neighbors into one urgent conversation—then turns insight into local
            hub support.
          </p>
          <ul className="mt-8 space-y-3">
            {factors.map((item) => (
              <li
                key={item}
                className="flex gap-3 font-body text-charcoal before:mt-2 before:h-2 before:w-2 before:shrink-0 before:rounded-full before:bg-chartreuse before:content-['']"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <aside className="surface-card p-8 lg:col-span-5 lg:p-10">
          <blockquote className="font-display text-xl font-semibold leading-snug text-charcoal-deep md:text-2xl">
            “There are no shortcuts. When we invest in belonging, coaching, and
            care together, young people show us what becomes possible.”
          </blockquote>
          <p className="micro-label mt-6 text-chartreuse">
            — Civic Bound Coalition
          </p>
          <p className="mt-6 font-body text-sm leading-relaxed text-charcoal">
            Parents across states ask for nuance: more digital literacy, more
            adult guidance, and caution about one-size technology bans.
          </p>
        </aside>
      </div>
    </section>
  );
}

export default Wellbeing;
