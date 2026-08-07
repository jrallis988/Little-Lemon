const pillars = [
  {
    title: "Accessible front-end craft",
    body: "I build responsive interfaces with HTML, CSS, JavaScript, and React—focused on clarity, performance, and WCAG-minded interaction patterns.",
  },
  {
    title: "UX-driven design systems",
    body: "I care about hierarchy, typography, and reusable UI patterns so products stay consistent as they grow—without visual clutter.",
  },
  {
    title: "Multimedia design background",
    body: "Through Artistic Fountain and digital media training, I bring studio-level visual thinking into component layouts and user journeys.",
  },
  {
    title: "Collaborative delivery",
    body: "I work cleanly in Git and GitHub, communicate clearly across design and engineering, and ship UI that teams can extend.",
  },
];

export default function Bring() {
  return (
    <section id="bring" className="bg-ink-soft py-24 md:py-32">
      <div className="container">
        <div className="mb-12 max-w-2xl stagger">
          <p className="reveal mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-foam">
            What I bring
          </p>
          <h2 className="reveal font-display text-3xl font-bold text-chalk md:text-5xl">
            What I bring to the table.
          </h2>
          <p className="reveal mt-4 text-base leading-relaxed text-sand/85 md:text-lg">
            Front-end engineering with a multimedia design foundation—so interfaces
            feel considered, usable, and ready to ship.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-2 stagger">
          {pillars.map((pillar) => (
            <article key={pillar.title} className="reveal border-t border-foam/35 pt-5">
              <h3 className="font-display text-xl font-bold text-foam-soft md:text-2xl">
                {pillar.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-sand/85">{pillar.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
