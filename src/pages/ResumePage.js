import { useEffect } from "react";
import { Link } from "react-router-dom";
import PageShell from "../components/PageShell";
import profile from "../data/profile";
import experience from "../data/experience";
import certifications from "../data/certifications";
import projects from "../data/projects";
import skillGroups from "../data/skills";

export default function ResumePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Resume — James Rallis";
    return () => {
      document.title = "James Rallis — Front-End Engineer & Multimedia Designer";
    };
  }, []);

  const jobs = experience.filter((item) => item.kind === "Experience");
  const education = experience.filter((item) => item.kind === "Education");
  const selected = projects.filter((project) => project.type !== "experiment" || project.id === "foam-drift");

  return (
    <PageShell>
      <section className="relative overflow-hidden bg-ink-soft pb-16 pt-28 md:pb-20 md:pt-36">
        <div className="absolute inset-0 hero-wash opacity-40" aria-hidden="true" />
        <div className="grain" aria-hidden="true" />
        <div className="container relative max-w-3xl stagger">
          <p className="reveal mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-foam">
            Resume
          </p>
          <h1 className="reveal font-display text-4xl font-bold text-chalk md:text-6xl">
            {profile.name}
          </h1>
          <p className="reveal mt-3 text-lg font-semibold text-foam-soft md:text-xl">
            {profile.title}
          </p>
          <p className="reveal mt-5 text-base leading-relaxed text-sand/85 md:text-lg">
            {profile.summary}
          </p>
          <div className="reveal mt-8 flex flex-wrap gap-3">
            <a href={`${process.env.PUBLIC_URL}/resume.html`} className="btn-primary">
              Download Resume
            </a>
            <a href={`mailto:${profile.email}`} className="btn-ghost">
              Email
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn-ghost">
              LinkedIn
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="btn-ghost">
              GitHub
            </a>
          </div>
        </div>
      </section>

      <section className="bg-ink py-16 md:py-24">
        <div className="container max-w-3xl">
          <h2 className="font-display text-3xl font-bold text-chalk">Experience</h2>
          <ul className="mt-8">
            {jobs.map((item) => (
              <li key={item.id} className="border-t border-sand/14 py-7">
                <h3 className="font-display text-2xl font-bold text-chalk">{item.org}</h3>
                <p className="mt-2 text-base text-sand/85">{item.role}</p>
                {item.bullets ? (
                  <ul className="mt-4 space-y-2 text-sm text-sand/75 md:text-base">
                    {item.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foam" aria-hidden="true" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-ink-soft py-16 md:py-24">
        <div className="container max-w-3xl">
          <h2 className="font-display text-3xl font-bold text-chalk">Education</h2>
          <ul className="mt-8">
            {education.map((item) => (
              <li key={item.id} className="border-t border-sand/14 py-7">
                <h3 className="font-display text-2xl font-bold text-chalk">{item.org}</h3>
                <p className="mt-2 text-base text-sand/85">{item.role}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-ink py-16 md:py-24">
        <div className="container">
          <h2 className="font-display text-3xl font-bold text-chalk">Technical skills</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {skillGroups.slice(0, 6).map((group) => (
              <article key={group.id} className="border-t border-foam/35 pt-5">
                <h3 className="font-display text-xl font-bold text-foam-soft">{group.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-sand/80">{group.items.join(" · ")}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink-soft py-16 md:py-24">
        <div className="container max-w-3xl">
          <h2 className="font-display text-3xl font-bold text-chalk">Certifications</h2>
          <ul className="mt-8">
            {certifications.map((cert) => (
              <li key={cert.id} className="border-t border-sand/14 py-6">
                <h3 className="font-display text-xl font-bold text-chalk">{cert.name}</h3>
                <p className="mt-2 text-sm text-foam-soft">
                  {cert.issuer} · {cert.year}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-ink py-16 md:py-24">
        <div className="container max-w-3xl">
          <h2 className="font-display text-3xl font-bold text-chalk">Selected projects</h2>
          <ul className="mt-8">
            {selected.map((project) => (
              <li key={project.id} className="border-t border-sand/14 py-6">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="font-display text-xl font-bold text-chalk">{project.name}</h3>
                  <span className="text-sm text-sand/60">{project.year}</span>
                </div>
                <p className="mt-2 text-base text-sand/85">{project.summary}</p>
                <Link to={`/work/${project.slug}`} className="mt-3 inline-block text-sm font-semibold text-foam">
                  View case study →
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <Link to="/#contact" className="btn-primary">
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
