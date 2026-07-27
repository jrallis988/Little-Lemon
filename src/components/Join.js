function Join() {
  return (
    <section id="join" className="section-pad relative overflow-hidden bg-ink">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(107,47,160,0.35),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(201,162,39,0.12),transparent_40%)]" />
      <div className="container relative">
        <div className="mx-auto max-w-4xl border-y border-violet-bright/30 py-14 text-center md:py-20">
          <p className="eyebrow">Take action</p>
          <h2 className="display mt-4 text-4xl md:text-6xl">
            Give a year.{" "}
            <span className="text-gold">Change a lifetime.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl font-body text-lg text-violet-mist">
            Whether you serve, donate, or partner with a school, you help build
            classrooms where students and young leaders grow together.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://www.cityyear.org/"
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
            >
              Apply to Serve
            </a>
            <a
              href="https://www.cityyear.org/"
              target="_blank"
              rel="noreferrer"
              className="btn-ghost"
            >
              Support Our Work
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Join;
