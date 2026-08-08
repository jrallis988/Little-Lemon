function Mission() {
  return (
    <section
      id="mission"
      className="section-pad relative overflow-hidden bg-violet-field"
    >
      <div className="pointer-events-none absolute inset-0 bg-section-glow" />
      <div className="container relative grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p className="eyebrow">Child & student centered</p>
          <h2 className="display mt-4 text-4xl md:text-5xl">
            Built for young people—not committees
          </h2>
        </div>
        <div className="lg:col-span-7">
          <p className="font-body text-lg leading-relaxed text-violet-mist md:text-xl">
            Civic Bound is a community-embedded social and developmental support
            network for youth moving through critical life stages. We focus on
            community re-entry, life direction, and stability—centering youth
            themselves, not parent-teacher politics or administrative boards.
          </p>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            <div className="border-l-2 border-chartreuse pl-5">
              <h3 className="font-display text-xl font-bold text-white">
                For youth
              </h3>
              <p className="mt-3 font-body text-violet-mist">
                Mentorship, guidance, and local resource hubs that help each
                young person find footing, purpose, and a safer path forward.
              </p>
            </div>
            <div className="border-l-2 border-violet-bright pl-5">
              <h3 className="font-display text-xl font-bold text-white">
                For families & neighbors
              </h3>
              <p className="mt-3 font-body text-violet-mist">
                Family resource connections and civic partnerships that support
                youth without turning the work into adult-led bureaucracy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Mission;
