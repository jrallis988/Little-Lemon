import Link from "next/link";
import { ArrowRight, HeartHandshake } from "lucide-react";
import { candidate } from "@/lib/candidate";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate min-h-[min(92vh,780px)] overflow-hidden"
    >
      {/* Full-bleed atmospheric landscape plane */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "linear-gradient(105deg, rgba(21,26,31,0.88) 0%, rgba(21,26,31,0.55) 42%, rgba(21,26,31,0.28) 100%), url('/images/nh-landscape.svg')",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,transparent_0%,rgba(15,26,24,0.35)_100%)]" />
      </div>

      <div className="mx-auto flex min-h-[min(92vh,780px)] max-w-content flex-col justify-end px-5 pb-16 pt-28 sm:px-8 sm:pb-20 md:justify-center md:pb-24 md:pt-20">
        <p className="animate-fade-up font-serif text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          {candidate.fullName}
        </p>
        <p className="animate-fade-up animate-delay-1 mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-amber-300 sm:text-base">
          for {candidate.office} · {candidate.state}
        </p>

        <h1
          id="hero-heading"
          className="animate-fade-up animate-delay-1 mt-6 max-w-xl font-serif text-2xl font-bold leading-snug text-white sm:text-3xl md:text-[2rem]"
        >
          Lower costs. Strong Main Streets. A New Hampshire worth keeping.
        </h1>

        <p className="animate-fade-up animate-delay-2 mt-4 max-w-lg text-base leading-relaxed text-granite-100 sm:text-lg">
          Built for independent and local voters who care about the economy,
          community, and the Granite State grit that got us here—not party
          talking points.
        </p>

        <div className="animate-fade-up animate-delay-2 mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link href="/#action" className="btn-primary">
            <HeartHandshake className="h-5 w-5" aria-hidden />
            Join the Movement
          </Link>
          <Link href="/#donate" className="btn-accent">
            Chip In
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
