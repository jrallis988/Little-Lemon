import Link from "next/link";
import Image from "next/image";
import { candidate } from "@/lib/candidate";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-ink"
    >
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <Image
          src="/images/nh-landscape.svg"
          alt=""
          fill
          priority
          className="object-cover object-center opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-navy/70" />
      </div>

      <div className="mx-auto max-w-content px-6 py-20 md:px-8 md:py-28">
        <p className="animate-fade-up font-display text-overline font-normal uppercase text-red">
          Independent Write-In Candidate · New Hampshire
        </p>
        <h1
          id="hero-heading"
          className="animate-fade-up animate-delay-1 mt-6 max-w-4xl font-display text-hero-display font-normal uppercase text-yellow"
        >
          {candidate.tagline}
        </h1>
        <p className="animate-fade-up animate-delay-2 mt-6 max-w-2xl text-lg leading-[1.75] text-white/85 sm:text-xl">
          {candidate.positioningLong}
        </p>
        <div className="animate-fade-up animate-delay-2 mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link href="/how-to-vote" className="btn-primary">
            How to Vote Write-In →
          </Link>
          <Link href="/meet-nick" className="btn-secondary-light">
            Meet Nick
          </Link>
        </div>
      </div>
    </section>
  );
}
