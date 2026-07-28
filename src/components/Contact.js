export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-ink-soft py-24 md:py-32">
      <div className="absolute inset-0 hero-wash opacity-60" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <div className="container relative">
        <div className="max-w-3xl stagger">
          <p className="reveal mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-foam">
            Contact
          </p>
          <h2 className="reveal font-display text-3xl font-bold text-chalk md:text-5xl">
            Let&apos;s build something people enjoy using.
          </h2>
          <p className="reveal mt-5 max-w-xl text-base leading-relaxed text-sand/85 md:text-lg">
            Tell me about your product, site, prototype, or team. I&apos;m especially
            interested in React/Next frontends, FastAPI backends, RAG apps, and
            web-based interactive builds.
          </p>
          <div className="reveal mt-9 flex flex-wrap gap-3">
            <a href="mailto:jjrallis@unh.edu" className="btn-primary">
              Email James
            </a>
            <a
              href="https://github.com/jrallis988"
              target="_blank"
              rel="noreferrer"
              className="btn-ghost"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
