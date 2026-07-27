function Mission() {
  return (
    <section
      id="mission"
      className="section-pad relative overflow-hidden bg-ink-soft"
    >
      <div className="pointer-events-none absolute inset-0 bg-section-glow" />
      <div className="container relative grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p className="eyebrow">Why we serve</p>
          <h2 className="display mt-4 text-4xl md:text-5xl">
            A dual mission for students and leaders
          </h2>
        </div>
        <div className="lg:col-span-7">
          <p className="font-body text-lg leading-relaxed text-violet-mist md:text-xl">
            City Year partners with public schools to put AmeriCorps members
            beside students as tutors, mentors, and role models. Together we
            advance academic outcomes and develop young adults for a lifetime of
            leadership and civic engagement.
          </p>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            <div className="border-l-2 border-gold pl-5">
              <h3 className="font-display text-xl font-bold text-white">
                For students
              </h3>
              <p className="mt-3 font-body text-violet-mist">
                Extra relationships and support so every learner can stay on
                track, engage deeply, and graduate ready for what comes next.
              </p>
            </div>
            <div className="border-l-2 border-violet-bright pl-5">
              <h3 className="font-display text-xl font-bold text-white">
                For corps members
              </h3>
              <p className="mt-3 font-body text-violet-mist">
                A demanding year of service that builds workforce skills,
                purpose, and a network of people committed to community.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Mission;
