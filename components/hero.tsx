import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden text-white">
      <div className="relative min-h-[48vh] md:min-h-[52vh]">
        <Image
          src="/images/hero-gym.jpg"
          alt="Free weights and benches on a gym floor"
          fill
          priority
          className="object-cover object-[center_30%] animate-[hero-zoom_18s_ease-out_forwards]"
          sizes="100vw"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(100deg,rgba(20,8,31,0.94)_0%,rgba(47,18,74,0.78)_48%,rgba(20,8,31,0.55)_100%)]"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#14081f] to-transparent"
        />

        <div className="container relative flex min-h-[48vh] flex-col justify-end pb-8 pt-20 md:min-h-[52vh] md:pb-10 md:pt-24">
          <div className="max-w-2xl">
            <p className="animate-fade-up font-display text-5xl leading-none tracking-tight text-pf-yellow sm:text-6xl">
              Planet Fitness
            </p>
            <h1 className="mt-2 max-w-xl animate-fade-up text-xl font-medium leading-snug tracking-tight text-white [animation-delay:70ms] md:text-2xl">
              A nearby gym. Clear membership pricing. Ready when you are.
            </h1>
            <div className="mt-4 flex animate-fade-up flex-wrap gap-2 [animation-delay:140ms]">
              <Button asChild>
                <a href="#clubs">Find a club near you</a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-white/40 bg-black/25 text-white backdrop-blur-sm hover:border-white hover:bg-white/10 hover:text-white"
              >
                <Link href="#pricing">See membership options</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
