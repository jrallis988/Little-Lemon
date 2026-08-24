import ProjectVisual from "./ProjectVisual";

export default function ProjectHero({ project }) {
  return (
    <section className="relative overflow-hidden bg-ink-soft pb-16 pt-28 md:pb-24 md:pt-36">
      <div className="absolute inset-0 hero-wash opacity-45" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <div className="container relative grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
        <div className="stagger max-w-2xl">
          <p className="reveal mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-foam">
            {project.category} · {project.year}
          </p>
          <h1 className="reveal font-display text-4xl font-bold text-chalk md:text-6xl">
            {project.name}
          </h1>
          <p className="reveal mt-5 text-base leading-relaxed text-sand/85 md:text-lg">
            {project.description || project.summary}
          </p>
        </div>
        <div className="reveal">
          <ProjectVisual
            label={project.heroVisual?.label || project.name}
            tone={project.heroVisual?.tone}
          />
        </div>
      </div>
    </section>
  );
}
