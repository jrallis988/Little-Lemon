import Link from "next/link";
import Image from "next/image";
import { candidate } from "@/lib/candidate";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-granite-900"
    >
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <Image
          src="/images/nh-landscape.svg"
          alt=""
          fill
          priority
          className="object-cover object-center opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-granite-900 via-granite-900/90 to-granite-900/55" />
      </div>

      <div className="mx-auto max-w-content px-5 py-20 sm:px-8 md:py-28">
        <p className="animate-fade-up text-xs font-semibold uppercase tracking-[0.18em] text-amber-300 sm:text-sm">
          Independent Write-In Candidate · New Hampshire
        </p>
        <h1
          id="hero-heading"
          className="animate-fade-up animate-delay-1 mt-5 max-w-3xl font-serif text-5xl font-black leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl"
        >
          {candidate.tagline}
        </h1>
        <p className="animate-fade-up animate-delay-2 mt-6 max-w-2xl text-lg leading-relaxed text-granite-200 sm:text-xl">
          {candidate.positioningLong}
        </p>
        <div className="animate-fade-up animate-delay-2 mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link href="/how-to-vote" className="btn-accent">
            How to Vote Write-In
          </Link>
          <Link
            href="/meet-nick"
            className="btn border-2 border-white/70 bg-transparent text-white hover:bg-white hover:text-granite-800"
          >
            Meet Nick
          </Link>
        </div>
      </div>
    </section>
  );
}
