import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative isolate min-h-[78vh] overflow-hidden text-white">
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-[linear-gradient(125deg,#1a0a2e_0%,#3d1a63_38%,#5c2d91_68%,#7a45b0_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(245,197,24,0.28), transparent 28%), radial-gradient(circle at 80% 10%, rgba(255,255,255,0.14), transparent 24%), linear-gradient(to bottom, transparent 55%, rgba(26,10,46,0.55))",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-full bg-[url('data:image/svg+xml,%3Csvg width%3D%2260%22 height%3D%2260%22 viewBox%3D%220 0 60 60%22 xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg fill%3D%22none%22 fill-rule%3D%22evenodd%22%3E%3Cg fill%3D%22%23ffffff%22 fill-opacity%3D%220.05%22%3E%3Cpath d%3D%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] md:w-1/2"
      />

      <div className="container flex min-h-[78vh] flex-col justify-end pb-16 pt-28 md:justify-center md:pb-24 md:pt-20">
        <div className="max-w-3xl">
          <p className="animate-fade-up font-display text-5xl leading-none tracking-tight text-pf-yellow sm:text-6xl md:text-7xl">
            Planet Fitness
          </p>
          <h1 className="mt-5 max-w-2xl animate-fade-up text-3xl font-medium leading-tight tracking-tight text-white [animation-delay:90ms] md:text-4xl">
            Find a club. See the real price. Join without the runaround.
          </h1>
          <p className="mt-4 max-w-xl animate-fade-up text-base text-white/75 [animation-delay:160ms] md:text-lg">
            Lightning-fast local discovery and radical pricing transparency.
            Check-ins and workouts stay in the app—this site gets you through
            the door.
          </p>
          <div className="mt-8 flex animate-fade-up flex-wrap gap-3 [animation-delay:230ms]">
            <Button asChild size="lg">
              <a href="#clubs">Find a club</a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/35 bg-transparent text-white hover:border-white hover:bg-white/10 hover:text-white"
            >
              <Link href="#pricing">Compare memberships</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
