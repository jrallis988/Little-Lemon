import Image from "next/image";
import { company, writer } from "@/data/scripts";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-svh items-center overflow-hidden"
      aria-label="Introduction"
    >
      <div className="hero-desk absolute inset-0" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,61,184,0.12),transparent_55%),radial-gradient(ellipse_at_70%_40%,rgba(92,240,255,0.08),transparent_45%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,11,13,0.35)_0%,rgba(10,11,13,0.55)_55%,rgba(10,11,13,0.96)_100%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-5 pb-16 pt-28 text-center md:px-8 md:pb-24 md:pt-32">
        <p className="animate-fade delay-1 mb-8 font-[family-name:var(--font-script)] text-sm tracking-wide text-accent md:text-base">
          FADE IN:
        </p>

        <h1 className="sr-only">{company.name}</h1>

        <div className="animate-rise delay-2 relative mx-auto aspect-[3/2] w-full max-w-3xl">
          <Image
            src={company.logo}
            alt={company.name}
            fill
            className="object-contain drop-shadow-[0_0_40px_rgba(255,61,184,0.25)]"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
          />
        </div>

        <p className="animate-rise delay-3 mt-10 font-[family-name:var(--font-script)] text-base text-foreground/90 type-cursor md:text-lg">
          {writer.name} · {writer.role}
        </p>

        <p className="animate-rise delay-3 mt-4 max-w-xl text-base leading-relaxed text-muted md:text-lg">
          {writer.tagline}
        </p>

        <div className="animate-rise delay-4 mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#work"
            className="inline-flex h-12 items-center justify-center bg-foreground px-7 text-sm tracking-[0.16em] text-background uppercase transition-opacity hover:opacity-85"
          >
            View Work
          </a>
          <a
            href="#contact"
            className="inline-flex h-12 items-center justify-center border border-white/20 px-7 text-sm tracking-[0.16em] text-foreground uppercase transition-colors hover:border-neon-pink"
          >
            Request Pages
          </a>
        </div>
      </div>
    </section>
  );
}
