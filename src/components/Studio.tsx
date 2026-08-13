const pillars = [
  {
    title: "Independent",
    copy: "We develop and produce outside the franchise machine—work owned by intention, not algorithm.",
  },
  {
    title: "Live-action",
    copy: "Our focus is performance, place, and practical craft. Cameras, crews, and real locations first.",
  },
  {
    title: "East Coast",
    copy: "Stories drawn from New England weather, Atlantic cities, and the working landscapes between them.",
  },
];

export default function Studio() {
  return (
    <section id="studio" className="scroll-mt-24 border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-16 px-6 py-24 md:grid-cols-12 md:gap-12 md:px-8 md:py-32">
        <div className="md:col-span-5">
          <p className="mb-4 text-xs tracking-[0.22em] text-accent uppercase">
            Studio
          </p>
          <h2 className="font-display text-4xl leading-tight text-foreground md:text-5xl">
            A lean production house with regional roots.
          </h2>
        </div>

        <div className="md:col-span-7 md:pt-10">
          <p className="text-lg leading-relaxed text-foreground/90 md:text-xl">
            The East Coast Motion Picture Company makes live-action features and
            series with a clear brief: tell precise stories, hire serious crews,
            and keep the work close to the places that shaped it.
          </p>
          <p className="mt-6 text-base leading-relaxed text-muted md:text-lg">
            We are not a content farm. We are a film studio—measured, selective,
            and committed to independent production on the Atlantic seaboard.
          </p>

          <dl className="mt-14 grid gap-10 sm:grid-cols-3">
            {pillars.map((pillar) => (
              <div key={pillar.title}>
                <dt className="font-display text-2xl text-foreground">
                  {pillar.title}
                </dt>
                <dd className="mt-3 text-sm leading-relaxed text-muted">
                  {pillar.copy}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
