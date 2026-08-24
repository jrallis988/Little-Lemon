import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageShell from "../components/PageShell";
import ProjectHero from "../components/project/ProjectHero";
import ProjectMeta from "../components/project/ProjectMeta";
import TechStack from "../components/project/TechStack";
import CaseStudySection from "../components/project/CaseStudySection";
import ProjectLinks from "../components/project/ProjectLinks";
import ResponsivePreview from "../components/project/ResponsivePreview";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { getProjectBySlug } from "../data/projects";

export default function ProjectPage({ slug }) {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    const timer = window.setTimeout(() => {
      setProject(getProjectBySlug(slug));
      setLoading(false);
    }, 180);
    return () => window.clearTimeout(timer);
  }, [slug]);

  useEffect(() => {
    if (!project) return undefined;
    const previous = document.title;
    document.title = `${project.name} — James Rallis`;
    return () => {
      document.title = previous;
    };
  }, [project]);

  if (loading) {
    return (
      <PageShell>
        <section className="container pb-24 pt-32">
          <LoadingSkeleton lines={6} className="max-w-2xl" />
          <div className="mt-10">
            <LoadingSkeleton lines={4} className="max-w-3xl" />
          </div>
        </section>
      </PageShell>
    );
  }

  if (!project) {
    return (
      <PageShell>
        <section className="container pb-24 pt-32">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-foam">
            Project
          </p>
          <h1 className="font-display text-4xl font-bold text-chalk md:text-5xl">
            Project not found.
          </h1>
          <p className="mt-4 max-w-xl text-base text-sand/85">
            That case study isn’t available. Browse selected work instead.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/#work" className="btn-primary">
              View Work
            </Link>
            <Link to="/" className="btn-ghost">
              Return Home
            </Link>
          </div>
        </section>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <ProjectHero project={project} />
      <ProjectMeta meta={project.meta} />

      <section className="bg-ink py-12 md:py-16">
        <div className="container">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-foam">
            Tech stack
          </p>
          <TechStack items={project.stack} />
        </div>
      </section>

      <CaseStudySection eyebrow="The problem" title="What needed to change." className="bg-ink-soft">
        <p className="text-base leading-relaxed text-sand/85 md:text-lg">{project.problem}</p>
      </CaseStudySection>

      <CaseStudySection eyebrow="What I built" title="The product and my contribution." className="bg-ink">
        <p className="text-base leading-relaxed text-sand/85 md:text-lg">{project.whatIBuilt}</p>
      </CaseStudySection>

      <CaseStudySection
        eyebrow="Development approach"
        title="How the application was structured."
        className="bg-ink-soft"
      >
        <p className="text-base leading-relaxed text-sand/85 md:text-lg">
          {project.approach?.summary}
        </p>
        {project.approach?.points?.length ? (
          <ul className="mt-10 space-y-8">
            {project.approach.points.map((point) => (
              <li key={point.title} className="border-t border-foam/35 pt-5">
                <h3 className="font-display text-xl font-bold text-foam-soft">{point.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-sand/85">{point.body}</p>
              </li>
            ))}
          </ul>
        ) : null}
      </CaseStudySection>

      <CaseStudySection
        eyebrow="Design → development"
        title="From prototype to implementation."
        className="bg-ink"
      >
        <p className="text-base leading-relaxed text-sand/85 md:text-lg">{project.designToDev}</p>
      </CaseStudySection>

      <CaseStudySection
        eyebrow="Responsive implementation"
        title="Desktop, tablet, and mobile."
        className="bg-ink-soft"
      >
        <ResponsivePreview responsive={project.responsive} />
      </CaseStudySection>

      {project.accessibility?.length ? (
        <CaseStudySection eyebrow="Accessibility" title="Built to be usable." className="bg-ink">
          <ul className="space-y-3 text-base text-sand/85 md:text-lg">
            {project.accessibility.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foam" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </CaseStudySection>
      ) : null}

      {project.challenges?.length ? (
        <CaseStudySection
          eyebrow="Technical challenges"
          title="Hard parts and what they taught me."
          className="bg-ink-soft"
        >
          <ul className="space-y-10">
            {project.challenges.map((item) => (
              <li key={item.challenge} className="border-t border-foam/35 pt-5">
                <h3 className="font-display text-xl font-bold text-foam-soft">Challenge</h3>
                <p className="mt-2 text-base text-sand/85">{item.challenge}</p>
                <h4 className="mt-5 text-sm font-semibold uppercase tracking-[0.16em] text-sand/60">
                  Why it was difficult
                </h4>
                <p className="mt-2 text-base text-sand/85">{item.why}</p>
                <h4 className="mt-5 text-sm font-semibold uppercase tracking-[0.16em] text-sand/60">
                  Solution
                </h4>
                <p className="mt-2 text-base text-sand/85">{item.solution}</p>
                <h4 className="mt-5 text-sm font-semibold uppercase tracking-[0.16em] text-sand/60">
                  What I learned
                </h4>
                <p className="mt-2 text-base text-sand/85">{item.learned}</p>
              </li>
            ))}
          </ul>
        </CaseStudySection>
      ) : null}

      <CaseStudySection eyebrow="Results / outcome" title="What shipped." className="bg-ink">
        <p className="text-base leading-relaxed text-sand/85 md:text-lg">
          {project.results?.summary}
        </p>
        {project.results?.metrics?.length ? (
          <ul className="mt-6 space-y-2 text-base text-sand/85">
            {project.results.metrics.map((metric) => (
              <li key={metric}>{metric}</li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-sm text-sand/60">
            Measurable metrics will appear here when available.
          </p>
        )}
        {project.next?.body ? (
          <p className="mt-8 border-t border-sand/14 pt-6 text-base leading-relaxed text-sand/85">
            <span className="font-semibold text-foam-soft">Next: </span>
            {project.next.body}
          </p>
        ) : null}
      </CaseStudySection>

      <section className="border-t border-sand/14 bg-ink-soft py-16 md:py-20">
        <div className="container">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-foam">
            Project links
          </p>
          <ProjectLinks links={project.links} nextSlug={project.next?.projectSlug} />
          <div className="mt-8">
            <Link to="/#work" className="btn-ghost">
              ← Back to work
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
