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
            When I sit down to build something, my goal is simple: make it fast, make
            it clean, and get out of the user&apos;s way.
          </p>
          <p className="reveal mt-4 text-base leading-relaxed text-sand/85 md:text-lg">
            My foundation is rooted in digital design and user experience, and over
            time I&apos;ve brought those principles directly into development. Today I
            build front-end web and mobile applications—but I don&apos;t stop at the UI.
            I&apos;ve expanded my toolkit to handle the full picture: wiring up Python
            backends, processing data, and spinning up serverless cloud architecture
            on AWS and Azure so the systems underneath are just as sharp as what you
            see on the screen.
          </p>
          <p className="reveal mt-4 text-base leading-relaxed text-sand/85 md:text-lg">
            I believe good development isn&apos;t about piling on features or adding
            algorithmic bloat—it&apos;s about removing friction. Whether I&apos;m crafting
            a component-driven web app, designing a touch-optimized mobile experience,
            or building a data pipeline, I care about performance, precision, and
            building things that actually last.
          </p>
          <div className="reveal mt-8">
            <Link to="/about" className="btn-primary">
              Learn more about me
            </Link>
          </div>
        </div>

        <aside className="reveal border-l border-foam/40 pl-6 md:pl-8 lg:mt-14">
          <p className="font-display text-xl font-semibold leading-snug text-chalk md:text-2xl">
            Fast. Clean. Out of the way—so people can get on with what they came to do.
          </p>
          <p className="mt-4 text-sm uppercase tracking-[0.16em] text-sand/65">
            Available for new work
          </p>
          <p className="mt-6 text-sm leading-relaxed text-sand/70">
            Path, working style, and certifications live on the full about page.
          </p>
        </aside>
      </div>
    </section>
  );
}
