function Mission() {
  return (
    <section id="mission" className="section-pad bg-paper">
      <div className="container grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p className="eyebrow-accent">About Us</p>
          <h2 className="display mt-5 text-3xl md:text-5xl">
            Built for young people—not committees
          </h2>
        </div>
        <div className="lg:col-span-7">
          <p className="lede">
            Civic Bound is a nonprofit community-embedded social and
            developmental support network for youth moving through critical life
            stages. We focus on community re-entry, life direction, and
            stability—centering youth themselves, not parent-teacher politics,
            administrative boards, or court-ordered supervision. Young people
            choose to show up because they want to.
          </p>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            <div className="border-l-2 border-chartreuse pl-5">
              <h3 className="font-display text-xl font-semibold text-charcoal-deep">
                For youth
              </h3>
              <p className="mt-3 font-body text-charcoal">
                Mentorship, guidance, and local resource hubs that help each
                young person find footing, purpose, and a safer path forward.
              </p>
            </div>
            <div className="border-l border-paper-line pl-5">
              <h3 className="font-display text-xl font-semibold text-charcoal-deep">
                For families & neighbors
              </h3>
              <p className="mt-3 font-body text-charcoal">
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
