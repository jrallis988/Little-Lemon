import { useEffect } from "react";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import certifications from "../data/certifications";
import experience from "../data/experience";
import useReveal from "../hooks/useReveal";

const chapters = [
  {
    title: "Design roots, front-end craft",
    body: "I come from digital media and professional communication—learning how hierarchy, typography, and flow shape trust. That foundation drives how I build interfaces: fewer obstacles, clearer paths, and components that feel intentional.",
  },
  {
    title: "Studio practice",
    body: "Through Artistic Fountain, my independent multimedia and design studio, I explore visual systems and brand storytelling that translate into clean, component-driven UI.",
  },
  {
    title: "How I like to work",
    body: "I prefer shipping clear vertical slices: a solid layout, accessible interaction, and a design system that teams can extend. Good front-end work, for me, is removing friction—not stacking features for their own sake.",
  },
];

export default function AboutPage() {
  const revealRef = useReveal();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "About James Rallis — Front-End Engineer";
    return () => {
      document.title = "James Rallis — Front-End Engineer & Multimedia Designer";
    };
  }, []);

  return (
    <div ref={revealRef} className="min-h-screen bg-ink font-body">
      <Nav />
      <main>
        <section className="relative overflow-hidden bg-ink-soft pb-20 pt-28 md:pb-28 md:pt-36">
          <div className="absolute inset-0 hero-wash opacity-50" aria-hidden="true" />
          <div className="grain" aria-hidden="true" />
          <div className="container relative max-w-3xl stagger">
            <p className="reveal mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-foam">
              About the developer
            </p>
            <h1 className="reveal font-display text-4xl font-bold text-chalk md:text-6xl">
              More about how I build.
            </h1>
            <p className="reveal mt-5 text-base leading-relaxed text-sand/85 md:text-lg">
              Front-end engineering with a multimedia design foundation—accessible
              UI, responsive layouts, and UX-driven systems.
            </p>
            <div className="reveal mt-8 flex flex-wrap gap-3">
              <Link to="/#contact" className="btn-primary">
                Get in touch
              </Link>
              <a href={`${process.env.PUBLIC_URL}/resume.html`} className="btn-ghost">
                View resume
              </a>
            </div>
          </div>
        </section>

        <section className="bg-ink py-20 md:py-28">
          <div className="container max-w-3xl space-y-12 stagger">
            {chapters.map((chapter) => (
              <article key={chapter.title} className="reveal border-t border-foam/35 pt-6">
                <h2 className="font-display text-2xl font-bold text-foam-soft md:text-3xl">
                  {chapter.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-sand/85 md:text-lg">
                  {chapter.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-ink-soft py-20 md:py-28">
          <div className="container">
            <div className="mb-12 max-w-2xl stagger">
              <p className="reveal mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-foam">
                Experience & education
              </p>
              <h2 className="reveal font-display text-3xl font-bold text-chalk md:text-5xl">
                Path so far.
              </h2>
            </div>
            <ul className="stagger max-w-3xl">
              {experience.map((item) => (
                <li key={item.id} className="reveal border-t border-sand/14 py-7">
                  <p className="text-sm uppercase tracking-[0.16em] text-foam">{item.kind}</p>
                  <h3 className="mt-2 font-display text-2xl font-bold text-chalk">{item.org}</h3>
                  <p className="mt-2 text-base text-sand/85">{item.role}</p>
                  {item.bullets ? (
                    <ul className="mt-4 space-y-2 text-sm leading-relaxed text-sand/75 md:text-base">
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
              <li className="border-t border-sand/14" aria-hidden="true" />
            </ul>
          </div>
        </section>

        <section id="certifications" className="relative overflow-hidden bg-ink py-20 md:py-28">
          <div
            className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-foam/10 blur-3xl"
            aria-hidden="true"
          />
          <div className="container relative">
            <div className="mb-12 max-w-2xl stagger">
              <p className="reveal mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-foam">
                Certifications
              </p>
              <h2 className="reveal font-display text-3xl font-bold text-chalk md:text-5xl">
                Credentials that back the craft.
              </h2>
              <p className="reveal mt-4 text-base leading-relaxed text-sand/85 md:text-lg">
                Professional certificates and coursework that reinforce how I build for the web.
              </p>
            </div>

            <ul className="stagger max-w-3xl space-y-0">
              {certifications.map((cert) => (
                <li key={cert.id} className="reveal border-t border-sand/14 py-7">
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <h3 className="font-display text-xl font-bold text-chalk md:text-2xl">
                      {cert.name}
                    </h3>
                    <span className="text-sm text-sand/60">{cert.year}</span>
                  </div>
                  <p className="mt-2 text-sm font-semibold text-foam-soft">{cert.issuer}</p>
                  <p className="mt-3 max-w-2xl text-base leading-relaxed text-sand/85">
                    {cert.summary}
                  </p>
                  {cert.href ? (
                    <a
                      href={cert.href}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-block text-sm font-semibold text-foam transition-colors hover:text-foam-soft"
                    >
                      {cert.linkLabel || "View credential"} →
                    </a>
                  ) : null}
                </li>
              ))}
              <li className="border-t border-sand/14" aria-hidden="true" />
            </ul>

            <div className="reveal mt-12">
              <Link to="/#about" className="btn-ghost">
                ← Back to portfolio
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
