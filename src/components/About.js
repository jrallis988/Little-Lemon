import { Link } from "react-router-dom";

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-ink-soft py-24 md:py-32">
      <div
        className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-foam/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="container relative grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        <div className="stagger max-w-2xl">
          <p className="reveal mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-foam">
            About me
          </p>
          <h2 className="reveal font-display text-3xl font-bold text-chalk md:text-5xl">
            Hey, I&apos;m James.
          </h2>
          <p className="reveal mt-5 text-base leading-relaxed text-sand/85 md:text-lg">
            I build accessible, performance-focused web interfaces with modern
            frontend tools. My work focuses on clean UI, responsive layouts, and
            UX-driven design systems.
          </p>
          <p className="reveal mt-4 text-base leading-relaxed text-sand/85 md:text-lg">
            My foundation is digital media and professional communication—design,
            storytelling, and user experience—brought directly into front-end
            engineering. Through Artistic Fountain, my independent multimedia and
            design studio, I practice visual systems that translate cleanly into
            component-driven interfaces.
          </p>
          <p className="reveal mt-4 text-base leading-relaxed text-sand/85 md:text-lg">
            When I sit down to build something, the goal is simple: make it fast,
            make it clean, and get out of the user&apos;s way.
          </p>
          <div className="reveal mt-8">
            <Link to="/about" className="btn-primary">
              Learn more about me
            </Link>
          </div>
        </div>

        <aside className="reveal border-l border-foam/40 pl-6 md:pl-8 lg:mt-14">
          <p className="font-display text-xl font-semibold leading-snug text-chalk md:text-2xl">
            Seeking front-end engineering roles where design craft and accessible UI
            matter.
          </p>
          <p className="mt-4 text-sm uppercase tracking-[0.16em] text-sand/65">
            Available for new work
          </p>
        </aside>
      </div>
    </section>
  );
}
