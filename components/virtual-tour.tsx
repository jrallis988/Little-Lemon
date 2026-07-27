import Image from "next/image";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

export function VirtualTour() {
  return (
    <section
      id="tour"
      aria-labelledby="tour-heading"
      className="scroll-mt-14 bg-pf-mist"
    >
      <div className="mx-auto grid max-w-5xl gap-6 px-4 py-10 md:grid-cols-2 md:items-center md:px-6 md:py-12">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-pf-purple">
            Inside the club
          </p>
          <h2
            id="tour-heading"
            className="mt-2 font-display text-3xl tracking-tight text-pf-ink md:text-4xl"
          >
            Take a virtual club tour
          </h2>
          <p className="mt-2 text-sm text-pf-ink/65 md:text-base">
            See the cardio floor, free weights, 30-minute circuit, and Black Card
            Spa areas before you visit. Then find your home club and review
            plans.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Button asChild variant="purple">
              <a href="#tour-player">Watch the tour</a>
            </Button>
            <Button asChild variant="outline">
              <a href="#clubs">Find a Club Near You</a>
            </Button>
          </div>
        </div>

        <div
          id="tour-player"
          className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-[0_12px_32px_-16px_rgba(61,9,88,0.45)]"
        >
          <Image
            src="/images/floor-gym.jpg"
            alt="Planet Fitness club floor preview for virtual tour"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 40vw"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-pf-purple-ink/70 via-pf-purple/25 to-transparent" />
          <a
            href="https://www.planetfitness.com/"
            target="_blank"
            rel="noreferrer"
            className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white transition hover:bg-black/10"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-pf-purple shadow-lg">
              <Play className="h-7 w-7 fill-current" aria-hidden />
            </span>
            <span className="text-sm font-semibold">Virtual club tour</span>
          </a>
        </div>
      </div>
    </section>
  );
}
