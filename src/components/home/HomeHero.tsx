import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function HomeHero() {
  return (
    <section
      className="relative min-h-[560px] overflow-hidden max-md:min-h-[480px]"
      aria-labelledby="hero-heading"
    >
      <Image
        src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=2000&q=80"
        alt="A young child outdoors near a hospital campus"
        fill
        priority
        className="object-cover object-[center_30%]"
        sizes="100vw"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-nav-dark/75 via-blue/45 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-nav-dark/50 via-transparent to-nav-dark/35"
        aria-hidden="true"
      />

      <div className="wrap relative z-[2] flex min-h-[560px] flex-col justify-end pb-s9 pt-s10 max-md:min-h-[480px] max-md:pb-s7 max-md:pt-s8">
        <p className="mb-s3 text-xs font-extrabold uppercase tracking-[0.12em] text-white">
          Top ranked pediatric hospital in the nation
        </p>

        <div className="mb-s5 flex flex-wrap items-center gap-s3">
          <div className="flex h-[72px] w-[72px] flex-col items-center justify-center rounded-full border-2 border-[#c9a227] bg-gradient-to-b from-[#1a3a7a] to-blue text-center shadow-md">
            <span className="text-[8px] font-extrabold uppercase leading-tight tracking-wide text-[#c9a227]">
              U.S. News
            </span>
            <span className="px-1 text-[9px] font-bold leading-tight text-white">
              Honor Roll
            </span>
            <span className="text-[8px] font-semibold text-white/85">
              2025–26
            </span>
          </div>
          <div className="flex h-[72px] min-w-[120px] flex-col items-center justify-center rounded-sm border border-white/80 bg-white px-s3 text-center shadow-md">
            <span className="text-[9px] font-extrabold uppercase tracking-wide text-emergency">
              ★★★★★
            </span>
            <span className="text-[9px] font-extrabold uppercase leading-tight text-blue">
              World&apos;s Best
            </span>
            <span className="text-[8px] font-bold leading-tight text-text">
              Specialized Hospitals
            </span>
            <span className="text-[8px] text-text-meta">Newsweek 2024</span>
          </div>
        </div>

        <h1
          id="hero-heading"
          className="mb-s5 max-w-[640px] text-[clamp(28px,4.2vw,48px)] font-bold leading-[1.12] tracking-[-0.02em] text-white"
        >
          Trusted by families. Where the world comes for answers.
        </h1>

        <div>
          <Button href="/appointments/request" variant="pink" size="lg">
            Make an Appointment
          </Button>
        </div>
      </div>
    </section>
  );
}
