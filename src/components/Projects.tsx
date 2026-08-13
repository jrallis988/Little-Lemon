import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <section
      id="projects"
      className="scroll-mt-24 border-t border-border bg-background-elevated"
    >
      <div className="mx-auto max-w-6xl px-6 py-24 md:px-8 md:py-32">
        <div className="mb-14 max-w-2xl md:mb-20">
          <p className="mb-4 text-xs tracking-[0.22em] text-accent uppercase">
            Projects
          </p>
          <h2 className="font-display text-4xl leading-tight text-foreground md:text-5xl">
            Features and series in motion.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            A focused slate of live-action work—each title tracked from
            development through delivery.
          </p>
        </div>

        <ul className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <li key={project.id} className="bg-background-elevated">
              <article className="group flex h-full flex-col justify-between border border-transparent bg-surface p-7 transition-colors hover:border-border hover:bg-background md:p-8">
                <div>
                  <div className="mb-8 flex items-center justify-between gap-4">
                    <span className="text-xs tracking-[0.18em] text-muted uppercase">
                      {project.genre}
                    </span>
                    <span className="text-xs tracking-[0.12em] text-accent uppercase">
                      {project.status}
                    </span>
                  </div>
                  <h3 className="font-display text-3xl leading-none text-foreground transition-colors group-hover:text-accent md:text-[2rem]">
                    {project.title}
                  </h3>
                  <p className="mt-5 text-sm leading-relaxed text-muted md:text-base">
                    {project.synopsis}
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
