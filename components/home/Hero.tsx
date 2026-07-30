import Link from "next/link";
import { candidate } from "@/lib/candidate";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-navy"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy via-ink to-footer-navy" aria-hidden />

      <div className="mx-auto flex min-h-[70vh] max-w-content flex-col justify-center px-6 py-20 md:min-h-[78vh] md:px-8 md:py-28">
        <p className="animate-fade-up font-display text-overline font-normal uppercase tracking-[0.14em] text-white">
          Independent Write-In · Newmarket, NH
        </p>
        <h1
          id="hero-heading"
          className="animate-fade-up animate-delay-1 mt-5 max-w-4xl font-display text-hero-display font-normal uppercase text-white"
        >
          {candidate.tagline}
        </h1>
        <p className="animate-fade-up animate-delay-2 mt-6 max-w-xl text-lg leading-[1.75] text-white/90 sm:text-xl">
          {candidate.positioningLong}
        </p>
        <div className="animate-fade-up animate-delay-2 mt-8">
          <Link href="/how-to-vote" className="btn-primary">
            How to Vote Write-In →
          </Link>
        </div>
      </div>
    </section>
  );
}
