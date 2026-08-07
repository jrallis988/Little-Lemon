export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] overflow-hidden text-chalk"
      aria-label="Introduction"
    >
      <div className="absolute inset-0 hero-wash" aria-hidden="true" />
      <div
        className="absolute inset-0 animate-drift bg-cover bg-center opacity-45"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=2400&q=80')",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/35"
        aria-hidden="true"
      />
      <div className="grain" aria-hidden="true" />

      <div className="relative z-10 container flex min-h-[100svh] flex-col justify-end pb-16 pt-28 md:justify-center md:pb-24 md:pt-32">
        <div className="max-w-3xl">
          <p
            className="mb-5 font-display text-4xl font-extrabold tracking-brand text-foam-soft sm:text-5xl md:text-6xl lg:text-7xl animate-fade-up"
            style={{ animationDelay: "0.05s" }}
          >
            James Rallis
          </p>
          <h1
            className="max-w-2xl font-display text-3xl font-bold leading-tight text-chalk sm:text-4xl md:text-5xl animate-fade-up"
            style={{ animationDelay: "0.18s" }}
          >
            Front-End Engineer & Multimedia Designer
          </h1>
          <p
            className="mt-5 max-w-xl text-base leading-relaxed text-sand/90 sm:text-lg animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            I build accessible, performance-focused web interfaces using modern
            frontend tools—clean UI, responsive layouts, and UX-driven design systems.
          </p>
          <div
            className="mt-9 flex flex-wrap gap-3 animate-fade-up"
            style={{ animationDelay: "0.42s" }}
          >
            <a href="#work" className="btn-primary">
              View selected work
            </a>
            <a href={`${process.env.PUBLIC_URL}/resume.html`} className="btn-ghost">
              View resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
