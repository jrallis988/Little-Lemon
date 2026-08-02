import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { AwardBadgeRow } from "@/components/brand/AwardBadges";

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

        <AwardBadgeRow className="mb-s5" />

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
