function Mission() {
  return (
    <section
      id="mission"
      className="section-pad relative overflow-hidden bg-violet-field"
    >
      <div className="pointer-events-none absolute inset-0 bg-section-glow" />
      <div className="container relative grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p className="eyebrow">Why we exist</p>
          <h2 className="display mt-4 text-4xl md:text-5xl">
            Spaces where people grow into what comes next
          </h2>
        </div>
        <div className="lg:col-span-7">
          <p className="font-body text-lg leading-relaxed text-violet-mist md:text-xl">
            Civic Bound creates open, campus-inspired environments where young
            people can learn, reconnect, and move forward with support. We focus
            on practical skills, steady relationships, and community pathways
            that feel welcoming—not institutional.
          </p>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            <div className="border-l-2 border-chartreuse pl-5">
              <h3 className="font-display text-xl font-bold text-white">
                For young people
              </h3>
              <p className="mt-3 font-body text-violet-mist">
                Mentorship, learning labs, and daily routines that help each
                person build momentum toward school, work, and community life.
              </p>
            </div>
            <div className="border-l-2 border-violet-bright pl-5">
              <h3 className="font-display text-xl font-bold text-white">
                For neighborhoods
              </h3>
              <p className="mt-3 font-body text-violet-mist">
                Local partnerships that strengthen belonging, opportunity, and
                shared spaces where everyone can contribute and thrive.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Mission;
