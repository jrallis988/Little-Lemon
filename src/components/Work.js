import projects from "../data/projects";

export default function Work() {
  return (
    <section id="work" className="bg-ink py-24 md:py-32">
      <div className="container">
        <div className="mb-12 max-w-2xl stagger">
          <p className="reveal mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-foam">
            Selected work
          </p>
          <h2 className="reveal font-display text-3xl font-bold text-chalk md:text-5xl">
            Projects that put clarity first.
          </h2>
          <p className="reveal mt-4 text-base leading-relaxed text-sand/85 md:text-lg">
            Selected builds across product UI, FastAPI services, RAG apps, and
            playable web prototypes—kept clear, shippable, and easy to extend.
          </p>
        </div>

        <ul className="stagger">
          {projects.map((project) => (
            <li key={project.id} className="project-row reveal">
              <a
                href={project.href}
                className="group grid gap-4 py-8 md:grid-cols-[1fr_1.4fr_auto] md:items-end md:gap-8 md:py-10"
              >
                <div>
                  <div className="flex items-baseline gap-3">
                    <h3 className="font-display text-2xl font-bold text-chalk transition-colors group-hover:text-foam-soft md:text-3xl">
                      {project.name}
                    </h3>
                    <span className="text-sm text-sand/60">{project.year}</span>
                  </div>
                  <p className="mt-2 text-sm text-sand/70">{project.role}</p>
                </div>
                <p className="text-base leading-relaxed text-sand/85 md:max-w-xl">
                  {project.summary}
                </p>
                <div className="md:text-right">
                  <p className="text-sm text-foam-soft">{project.stack}</p>
                  <p className="mt-2 text-sm font-semibold text-chalk transition-transform group-hover:translate-x-1">
                    {project.href === "#play" ? "Open demo →" : "Discuss project →"}
                  </p>
                </div>
              </a>
            </li>
          ))}
          <li className="border-t border-sand/14" aria-hidden="true" />
        </ul>
      </div>
    </section>
  );
}
