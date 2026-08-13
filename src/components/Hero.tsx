export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-svh items-end overflow-hidden"
      aria-label="Studio introduction"
    >
      <div className="reel-frame absolute inset-0" aria-hidden="true">
        <div className="reel-scan absolute inset-0" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col justify-end px-6 pb-16 pt-28 md:px-8 md:pb-24 md:pt-32">
        <h1 className="animate-fade delay-1 mb-6 max-w-3xl font-display text-4xl leading-[1.05] text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
          The East Coast Motion Picture Company
        </h1>

        <p className="animate-rise delay-2 max-w-2xl text-lg leading-relaxed text-foreground/90 md:text-xl">
          Independent live-action cinema, produced with East Coast discipline.
        </p>

        <p className="animate-rise delay-3 mt-4 max-w-xl text-base leading-relaxed text-muted md:text-lg">
          Feature films and series rooted in regional story, rigorous craft, and
          a quiet refusal of studio noise.
        </p>

        <div className="animate-rise delay-4 mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#projects"
            className="inline-flex h-12 items-center justify-center bg-foreground px-7 text-sm tracking-[0.16em] text-background uppercase transition-opacity hover:opacity-85"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="inline-flex h-12 items-center justify-center border border-border px-7 text-sm tracking-[0.16em] text-foreground uppercase transition-colors hover:border-foreground"
          >
            Inquire
          </a>
        </div>

        <div
          className="animate-fade delay-4 mt-14 flex items-center gap-4 text-xs tracking-[0.22em] text-muted uppercase"
          aria-label="Studio reel placeholder"
        >
          <span className="h-px w-10 bg-accent/50" />
          Studio Reel — Placeholder
        </div>
      </div>
    </section>
  );
}
