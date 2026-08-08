const pillars = [
  {
    title: "Learning & mentorship",
    copy: "Small-group coaching and skill-building sessions help participants grow at their own pace—with guides who listen first.",
  },
  {
    title: "Community pathways",
    copy: "We connect people to education, work, and civic opportunities through partnerships that feel collaborative and clear.",
  },
  {
    title: "Open campus culture",
    copy: "Shared studios, gardens, and gathering spaces invite curiosity, creativity, and everyday belonging.",
  },
];

function Approach() {
  return (
    <section id="approach" className="section-pad relative bg-ink">
      <div className="container">
        <div className="max-w-3xl">
          <p className="eyebrow">The experience</p>
          <h2 className="display mt-4 text-4xl md:text-5xl">
            A modern campus for community transition
          </h2>
          <p className="mt-5 font-body text-lg text-violet-mist">
            Join a community that helps you grow by helping others grow. Civic
            Bound brings together mentors, educators, and neighbors in spaces
            that feel welcoming—not institutional.
          </p>
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
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
            alt="Mentor collaborating with a young learner"
            className="h-[48vh] w-full object-cover md:h-[56vh]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-violet-deep/55 to-transparent" />
          <div className="absolute inset-0 flex items-end p-8 md:p-12">
            <blockquote className="max-w-lg">
              <p className="font-display text-2xl font-bold text-white md:text-3xl">
                “They motivate me. They’re always there—pushing me forward.”
              </p>
              <footer className="mt-4 font-body text-sm uppercase tracking-[0.16em] text-chartreuse">
                Participant reflecting on a Civic Bound mentor
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Approach;
