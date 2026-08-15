const offerings = [
  {
    title: "Drop-in safe spaces",
    copy: "Open neighborhood rooms where young people can arrive as they are—find calm, connection, and a steady place to land without an appointment.",
  },
  {
    title: "Mentorship circles",
    copy: "Small groups guided by trusted mentors who listen first, build character through relationship, and walk with youth through real-life decisions.",
  },
  {
    title: "Stability navigation",
    copy: "Practical help mapping next steps—housing leads, school and work pathways, family resources—so transition feels clearer, not overwhelming.",
  },
  {
    title: "Open studio & creative labs",
    copy: "Hands-on spaces for art, making, and expression where youth build confidence, community, and a sense of belonging through creativity.",
  },
];

function HubInside() {
  return (
    <section
      id="hubs"
      className="section-pad relative overflow-hidden bg-violet-field"
    >
      <div className="pointer-events-none absolute inset-0 bg-section-glow" />
      <div className="container relative">
        <div className="max-w-3xl">
          <p className="eyebrow">Inside a hub</p>
          <h2 className="display mt-4 text-4xl md:text-5xl">
            What a Neighborhood Resource Hub looks like
          </h2>
          <p className="mt-5 font-body text-lg text-violet-mist">
            Think community-hub accessibility, mission-driven service, and
            character-building youth programming—woven into one local place
            young people can actually walk into.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {offerings.map((item, index) => (
            <article
              key={item.title}
              className="border border-violet-bright/25 bg-ink/35 p-7 md:p-8"
            >
              <span className="font-display text-sm font-bold uppercase tracking-[0.2em] text-chartreuse">
                0{index + 1}
              </span>
              <h3 className="mt-4 font-display text-2xl font-bold text-white">
                {item.title}
              </h3>
              <p className="mt-3 font-body leading-relaxed text-violet-mist">
                {item.copy}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HubInside;
