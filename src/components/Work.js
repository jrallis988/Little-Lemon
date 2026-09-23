import { Link } from "react-router-dom";
import projects from "../data/projects";
import TechStack from "./project/TechStack";
import ProjectVisual from "./project/ProjectVisual";

const typeLabels = {
  "case-study": "Case study",
  professional: "Professional",
  personal: "Personal project",
  experiment: "Experiment",
};

function resolveHref(href) {
  if (!href) return href;
  if (href.endsWith(".html") && href.startsWith("/")) {
    return `${process.env.PUBLIC_URL || ""}${href}`;
  }
  return href;
}

function ProjectActions({ project }) {
  const actions = [
    {
      key: "case",
      label: "Case Study",
      href: project.links?.caseStudy || (project.slug ? `/work/${project.slug}` : null),
      primary: true,
    },
    { key: "live", label: "Live Site", href: project.links?.live },
    { key: "github", label: "GitHub", href: project.links?.github },
  ].filter((action) => action.href);

  return (
    <div className="mt-5 flex flex-wrap gap-3">
      {actions.map((action) => {
        const className = action.primary
          ? "text-sm font-semibold text-foam transition-colors hover:text-foam-soft"
          : "text-sm font-semibold text-chalk transition-colors hover:text-foam-soft";
        const href = resolveHref(action.href);
        const isAppRoute =
          action.href.startsWith("/") && !action.href.endsWith(".html");

        if (isAppRoute) {
          return (
            <Link key={action.key} to={action.href} className={className}>
              {action.label} →
            </Link>
          );
        }
        return (
          <a
            key={action.key}
            href={href}
            className={className}
            {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
          >
            {action.label} →
          </a>
        );
      })}
    </div>
  );
}

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
            Front-end UI work focused on responsive layouts, accessible interaction,
            and clean component systems—plus interactive experiments in the Lab.
          </p>
        </div>

        <ul className="stagger">
          {projects.map((project) => (
            <li key={project.id} className="project-row reveal">
              <div className="grid gap-6 py-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-10 lg:py-10">
                <ProjectVisual
                  label={project.heroVisual?.label || project.name}
                  src={project.heroVisual?.src}
                  tone={project.heroVisual?.tone}
                  className="min-h-[180px]"
                />
                <div>
                  <p className="text-sm uppercase tracking-[0.14em] text-foam">
                    {typeLabels[project.type] || project.category} · {project.year}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-bold text-chalk md:text-3xl">
                    {project.name}
                  </h3>
                  <p className="mt-2 text-sm text-sand/70">{project.role}</p>
                  <p className="mt-4 text-base leading-relaxed text-sand/85 md:max-w-xl">
                    {project.summary}
                  </p>
                  <TechStack items={project.stack} className="mt-4" />
                  <ProjectActions project={project} />
                </div>
              </div>
            </li>
          ))}
          <li className="border-t border-sand/14" aria-hidden="true" />
        </ul>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link to="/lab" className="btn-ghost">
            Visit the Lab
          </Link>
          <Link to="/engineering" className="btn-ghost">
            How I build
          </Link>
        </div>
      </div>
    </section>
  );
}
