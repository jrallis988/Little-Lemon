const pillars = [
  {
    title: "Student success coaching",
    copy: "Trained AmeriCorps members serve full-time in classrooms—tutoring, mentoring, and modeling the skills students need to thrive.",
  },
  {
    title: "Whole-school partnership",
    copy: "We collaborate with teachers and principals to strengthen learning environments where every student feels connected and capable.",
  },
  {
    title: "Research, practice & policy",
    copy: "From school innovation to national service policy, City Year works to expand what public education and civic leadership can be.",
  },
];

function Approach() {
  return (
    <section id="approach" className="section-pad relative bg-ink">
      <div className="container">
        <div className="max-w-3xl">
          <p className="eyebrow">How we work</p>
          <h2 className="display mt-4 text-4xl md:text-5xl">
            Idealism, put to work every school day
          </h2>
          <p className="mt-5 font-body text-lg text-violet-mist">
            Founded in 1988, City Year has grown from one city into a national
            network—and international affiliates—united by service in schools.
          </p>
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {pillars.map((pillar, index) => (
            <article key={pillar.title} className="relative pt-2">
              <span className="font-display text-5xl font-extrabold text-violet-deep">
                0{index + 1}
              </span>
              <h3 className="mt-4 font-display text-2xl font-bold text-gold-light">
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
            alt="Mentor working alongside a student"
            className="h-[48vh] w-full object-cover md:h-[56vh]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-violet-deep/50 to-transparent" />
          <div className="absolute inset-0 flex items-end p-8 md:p-12">
            <p className="max-w-md font-display text-2xl font-bold text-white md:text-3xl">
              Where young people lead, schools and communities rise together.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Approach;
