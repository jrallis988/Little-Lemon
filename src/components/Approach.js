const pillars = [
  {
    title: "Community Youth Support Networks",
    copy: "Trusted local networks that walk with young people through transition—focused on stability, belonging, and practical next steps.",
  },
  {
    title: "Neighborhood Youth Development",
    copy: "Programs rooted in the places youth already live, learning life skills and confidence through constructive mentorship.",
  },
  {
    title: "Youth Guidance & Family Resources",
    copy: "Guidance centers that connect youth and families to tools for safety, direction, and everyday support—without stigma.",
  },
  {
    title: "Civic Partnership & Mentorship",
    copy: "Mentors and civic partners who prioritize the young person first—building relationships that restore hope and momentum.",
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
