import { useEffect } from "react";
import { Link } from "react-router-dom";
import PageShell from "../components/PageShell";
import ProcessStep from "../components/ProcessStep";
import SkillGroup from "../components/SkillGroup";
import engineering from "../data/engineering";

export default function EngineeringPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Engineering — James Rallis";
    return () => {
      document.title = "James Rallis — Front-End Engineer & Multimedia Designer";
    };
  }, []);

  return (
    <PageShell>
      <section className="relative overflow-hidden bg-ink-soft pb-16 pt-28 md:pb-20 md:pt-36">
        <div className="absolute inset-0 hero-wash opacity-40" aria-hidden="true" />
        <div className="grain" aria-hidden="true" />
        <div className="container relative max-w-3xl stagger">
          <p className="reveal mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-foam">
            Engineering
          </p>
          <h1 className="reveal font-display text-4xl font-bold text-chalk md:text-6xl">
            How I build for the web.
          </h1>
          <p className="reveal mt-5 text-base leading-relaxed text-sand/85 md:text-lg">
            Not just a list of tools—this is how I approach architecture, accessibility,
            responsive systems, and shipping clean front-end work.
          </p>
        </div>
      </section>

      <section className="bg-ink py-16 md:py-24">
        <div className="container">
          <div className="mb-10 max-w-2xl stagger">
            <p className="reveal mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-foam">
              Development workflow
            </p>
            <h2 className="reveal font-display text-3xl font-bold text-chalk md:text-4xl">
              From design to deployment.
            </h2>
          </div>
          <ProcessStep steps={engineering.workflow} />
        </div>
      </section>

      <section className="bg-ink-soft py-16 md:py-24">
        <div className="container">
          <div className="mb-10 max-w-2xl stagger">
            <p className="reveal mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-foam">
              Front-end architecture
            </p>
            <h2 className="reveal font-display text-3xl font-bold text-chalk md:text-4xl">
              Structure that stays extendable.
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2 stagger">
            {engineering.architecture.map((item) => (
              <article key={item.title} className="reveal border-t border-foam/35 pt-5">
                <h3 className="font-display text-xl font-bold text-foam-soft">{item.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-sand/85">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink py-16 md:py-24">
        <div className="container">
          <div className="mb-10 max-w-2xl stagger">
            <p className="reveal mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-foam">
              APIs & data
            </p>
            <h2 className="reveal font-display text-3xl font-bold text-chalk md:text-4xl">
              Fetching with honest UI states.
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3 stagger">
            {engineering.apis.map((item) => (
              <article key={item.title} className="reveal border-t border-foam/35 pt-5">
                <h3 className="font-display text-xl font-bold text-foam-soft">{item.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-sand/85">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink-soft py-16 md:py-24">
        <div className="container">
          <div className="mb-10 max-w-2xl stagger">
            <p className="reveal mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-foam">
              Responsive development
            </p>
            <h2 className="reveal font-display text-3xl font-bold text-chalk md:text-4xl">
              Interfaces that adapt with intent.
            </h2>
          </div>
          <ul className="grid gap-6 md:grid-cols-3 stagger">
            {engineering.responsive.map((item) => (
              <li key={item.label} className="reveal border-t border-foam/35 pt-5">
                <p className="font-display text-xl font-bold text-foam-soft">{item.label}</p>
                <p className="mt-3 text-base leading-relaxed text-sand/85">{item.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-ink py-16 md:py-24">
        <div className="container grid gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-foam">
              Accessibility
            </p>
            <h2 className="font-display text-3xl font-bold text-chalk md:text-4xl">
              Usability is part of the build.
            </h2>
            <ul className="mt-8 space-y-3 text-base text-sand/85">
              {engineering.accessibility.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foam" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-foam">
              Performance
            </p>
            <h2 className="font-display text-3xl font-bold text-chalk md:text-4xl">
              Fast enough to feel intentional.
            </h2>
            <div className="mt-8 space-y-6">
              {engineering.performance.map((item) => (
                <article key={item.title} className="border-t border-foam/35 pt-5">
                  <h3 className="font-display text-xl font-bold text-foam-soft">{item.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-sand/85">{item.body}</p>
                </article>
              ))}
            </div>
            <p className="mt-6 text-sm text-sand/60">
              Specific Lighthouse scores appear here only when measured for a project.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-ink-soft py-16 md:py-24">
        <div className="container">
          <div className="mb-10 max-w-2xl stagger">
            <p className="reveal mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-foam">
              Tools
            </p>
            <h2 className="reveal font-display text-3xl font-bold text-chalk md:text-4xl">
              Grouped by how I use them.
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 stagger">
            {engineering.tools.map((group) => (
              <SkillGroup key={group.title} title={group.title} items={group.items} />
            ))}
          </div>
          <div className="mt-12">
            <Link to="/#skills" className="btn-ghost">
              View skills overview →
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
