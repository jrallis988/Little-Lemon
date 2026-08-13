import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-24 bg-background">
      <div className="border-y border-white/10 bg-background-elevated">
        <div className="overflow-hidden py-3">
          <div className="marquee-track flex w-max gap-10 whitespace-nowrap font-[family-name:var(--font-credit)] text-sm tracking-[0.28em] text-muted uppercase">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex gap-10 px-5">
                {projects.map((project) => (
                  <span key={`${copy}-${project.id}`}>
                    {project.title}
                    <span className="mx-4 text-accent/70">●</span>
                    {project.status}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="mb-3 font-[family-name:var(--font-credit)] text-sm tracking-[0.3em] text-accent uppercase">
              Current Slate
            </p>
            <h2 className="font-display text-4xl leading-tight text-foreground md:text-5xl">
              Films & series in production.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted md:text-base">
            A selective slate of live-action titles—from development through
            post—produced along the Atlantic seaboard.
          </p>
        </div>

        <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {projects.map((project) => (
            <li key={project.id} id={project.id} className="scroll-mt-28">
              <article className="group">
                <div className="relative aspect-[2/3] overflow-hidden bg-surface">
                  <div
                    className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    style={{ background: project.poster }}
                    aria-hidden="true"
                  />
                  <div className="poster-shine absolute inset-0" aria-hidden="true" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />

                  <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3 md:p-4">
                    <span className="font-[family-name:var(--font-credit)] text-[11px] tracking-[0.2em] text-white/75 uppercase md:text-xs">
                      {project.format}
                    </span>
                    <span className="bg-black/50 px-2 py-1 font-[family-name:var(--font-credit)] text-[11px] tracking-[0.16em] text-accent uppercase backdrop-blur-sm md:text-xs">
                      {project.status}
                    </span>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-3 md:p-5">
                    <p className="font-[family-name:var(--font-credit)] text-[11px] tracking-[0.22em] text-white/55 uppercase md:text-xs">
                      {project.genre} · {project.year}
                    </p>
                    <h3 className="mt-2 font-display text-[1.65rem] leading-[0.95] text-foreground md:text-3xl lg:text-[2.15rem]">
                      {project.title}
                    </h3>
                    <div className="mt-4 h-px w-8 bg-accent/70 transition-all duration-500 group-hover:w-14" />
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-white/70 opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:text-[0.95rem]">
                      {project.synopsis}
                    </p>
                    <p className="mt-4 font-[family-name:var(--font-credit)] text-[10px] tracking-[0.28em] text-white/35 uppercase md:text-[11px]">
                      ECMCo.
                    </p>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
