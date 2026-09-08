const pillars = [
  {
    title: "Community Youth Support Networks",
    copy: "Grassroots webs of reliable adults and peers for immediate stabilization—people who show up when life shifts.",
  },
  {
    title: "Neighborhood Youth Development Programs",
    copy: "Hyper-local initiatives focused on skill-building, confidence, and character through everyday community practice.",
  },
  {
    title: "Youth Guidance and Family Resource Centers",
    copy: "Accessible physical and digital hubs offering practical navigation for youth and the families walking with them.",
  },
  {
    title: "Civic Partnership and Mentorship Initiatives",
    copy: "Collaborative frameworks connecting youth with local leaders, mentors, and community pathways that open doors.",
  },
];

function Approach() {
  return (
    <section id="approach" className="section-pad border-y border-paper-line bg-paper-soft">
      <div className="container">
        <div className="max-w-3xl">
          <p className="eyebrow-accent">Our Solutions</p>
          <h2 className="display mt-5 text-3xl md:text-5xl">
            Neighborhood support for critical life stages
          </h2>
          <p className="lede mt-5">
            Civic Bound blends community-hub accessibility, mission-driven
            service, and character-building youth programming—so young people
            get open doors, trusted mentors, and real pathways forward.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {pillars.map((pillar, index) => (
            <article key={pillar.title} className="surface-card p-8">
              <span className="micro-label text-chartreuse">0{index + 1}</span>
              <h3 className="mt-4 font-display text-2xl font-semibold text-charcoal-deep">
                {pillar.title}
              </h3>
              <p className="mt-3 font-body leading-relaxed text-charcoal">
                {pillar.copy}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Approach;
