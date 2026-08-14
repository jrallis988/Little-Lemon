import { writer } from "@/data/scripts";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-svh items-end overflow-hidden"
      aria-label="Introduction"
    >
      <div className="hero-desk absolute inset-0" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(10,11,13,0.92)_100%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-20 pt-28 md:px-8 md:pb-28 md:pt-32">
        <p className="animate-fade delay-1 mb-5 font-[family-name:var(--font-script)] text-sm tracking-wide text-accent md:text-base">
          FADE IN:
        </p>

        <h1 className="animate-rise delay-2 max-w-4xl font-display text-5xl leading-[0.95] text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
          {writer.name}
        </h1>

        <p className="animate-rise delay-3 mt-5 font-[family-name:var(--font-script)] text-base text-foreground/85 type-cursor md:text-lg">
          {writer.role}. {writer.location}.
        </p>

        <p className="animate-rise delay-3 mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
          {writer.tagline}
        </p>

        <div className="animate-rise delay-4 mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#work"
            className="inline-flex h-12 items-center justify-center bg-foreground px-7 text-sm tracking-[0.16em] text-background uppercase transition-opacity hover:opacity-85"
          >
            View Work
          </a>
          <a
            href="#contact"
            className="inline-flex h-12 items-center justify-center border border-border px-7 text-sm tracking-[0.16em] text-foreground uppercase transition-colors hover:border-foreground"
          >
            Request Pages
          </a>
        </div>
      </div>
    </section>
  );
}
