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
    <section id="approach" className="section-pad relative bg-ink">
      <div className="container">
        <div className="max-w-3xl">
          <p className="eyebrow">How Civic Bound works</p>
          <h2 className="display mt-4 text-4xl md:text-5xl">
            Neighborhood support for critical life stages
          </h2>
          <p className="mt-5 font-body text-lg text-violet-mist">
            Civic Bound blends community-hub accessibility, mission-driven
            service, and character-building youth programming—so young people
            get open doors, trusted mentors, and real pathways forward.
          </p>
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-2 md:gap-x-10 md:gap-y-12">
          {pillars.map((pillar, index) => (
            <article key={pillar.title} className="relative pt-2">
              <span className="font-display text-5xl font-extrabold text-violet-deep">
                0{index + 1}
              </span>
              <h3 className="mt-4 font-display text-2xl font-bold text-chartreuse-light">
                {pillar.title}
              </h3>
              <p className="mt-3 font-body leading-relaxed text-violet-mist">
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
