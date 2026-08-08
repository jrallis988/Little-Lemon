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
            Unlike school-based academic coaching models, Civic Bound operates
            in the community—offering developmental support for youth
            re-entering daily life with dignity, direction, and care.
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

      <div className="container mt-20">
        <div className="relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=2000&q=80"
            alt="Mentor offering guidance to a young person"
            className="h-[48vh] w-full object-cover md:h-[56vh]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-violet-deep/55 to-transparent" />
          <div className="absolute inset-0 flex items-end p-8 md:p-12">
            <blockquote className="max-w-lg">
              <p className="font-display text-2xl font-bold text-white md:text-3xl">
                “I finally have people who see me—and help me move forward.”
              </p>
              <footer className="mt-4 font-body text-sm uppercase tracking-[0.16em] text-chartreuse">
                Youth reflecting on Civic Bound mentorship
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Approach;
