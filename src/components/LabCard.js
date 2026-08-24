import { Link } from "react-router-dom";
import TechStack from "./project/TechStack";
import ProjectVisual from "./project/ProjectVisual";

function Action({ href, label, primary = false }) {
  if (!href) return null;
  const className = primary ? "btn-primary" : "btn-ghost";
  if (href.startsWith("/")) {
    return (
      <Link to={href} className={className}>
        {label}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      {label}
    </a>
  );
}

export default function LabCard({ project }) {
  return (
    <article className="reveal border-t border-sand/14 py-8 md:py-10">
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <ProjectVisual
          label={project.visual?.label || project.name}
          tone={project.visual?.tone}
          className="min-h-[180px]"
        />
        <div>
          <div className="flex flex-wrap items-baseline gap-3">
            <h2 className="font-display text-2xl font-bold text-chalk md:text-3xl">
              {project.name}
            </h2>
            {project.status ? (
              <span className="text-sm uppercase tracking-[0.14em] text-foam">{project.status}</span>
            ) : null}
          </div>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-sand/85">
            {project.description}
          </p>
          <TechStack items={project.technologies} className="mt-5" />
          <div className="mt-6 flex flex-wrap gap-3">
            <Action href={project.links?.demo} label="Live Demo" primary />
            <Action href={project.links?.source} label="Source" />
            <Action href={project.links?.details} label="Details" />
          </div>
        </div>
      </div>
    </article>
  );
}
