import Link from "next/link";
import Image from "next/image";
import { candidate } from "@/lib/candidate";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate min-h-[78vh] overflow-hidden bg-ink md:min-h-[86vh]"
    >
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <Image
          src="/images/newmarket-hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_35%]"
        />
        {/* Scrim keeps white headline readable over downtown Newmarket aerial */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/55 to-ink/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-ink/35" />
      </div>

      <div className="mx-auto flex min-h-[78vh] max-w-content flex-col justify-end px-6 pb-16 pt-28 md:min-h-[86vh] md:px-8 md:pb-24 md:pt-32">
        <p className="animate-fade-up font-display text-overline font-normal uppercase tracking-[0.14em] text-white">
          Independent Write-In · Newmarket, NH
        </p>
        <h1
          id="hero-heading"
          className="animate-fade-up animate-delay-1 mt-5 max-w-4xl font-display text-hero-display font-normal uppercase text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.45)]"
        >
          {candidate.tagline}
        </h1>
        <p className="animate-fade-up animate-delay-2 mt-6 max-w-xl text-lg leading-[1.75] text-white/90 sm:text-xl">
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
