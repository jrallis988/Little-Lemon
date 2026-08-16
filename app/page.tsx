import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";

export default function LandingPage() {
  return (
    <div className="relative min-h-dvh overflow-hidden stage-wash">
      <div className="pointer-events-none absolute inset-0 brick-noise opacity-60" />
      <div className="pointer-events-none absolute left-1/2 top-[-8%] h-[42vh] w-[90vw] -translate-x-1/2 rounded-full bg-spotlight/25 blur-3xl animate-glow" />

      <div className="relative mx-auto flex min-h-dvh max-w-lg flex-col px-5 pb-8 pt-6">
        <header className="flex items-center justify-between">
          <Logo size="md" />
          <Link
            href="/login"
            className="text-sm font-medium text-smoke transition hover:text-foam"
          >
            Sign in
          </Link>
        </header>

        <section className="relative mt-auto flex flex-1 flex-col justify-end pb-6 pt-16">
          <p className="animate-rise text-[11px] uppercase tracking-[0.28em] text-spotlight">
            For comics · by comics
          </p>
          <h1 className="animate-rise mt-3 font-display text-[4.35rem] leading-[0.88] tracking-[0.02em] text-foam sm:text-[5rem]" style={{ animationDelay: "80ms" }}>
            Green
            <span className="text-spotlight">room</span>
          </h1>
          <p
            className="animate-rise mt-5 max-w-[22rem] text-base leading-relaxed text-mic"
            style={{ animationDelay: "140ms" }}
          >
            Share bits, claim open-mic slots, and workshop with comics who actually read the room.
          </p>

          <div
            className="animate-rise mt-8 flex flex-col gap-3 sm:flex-row"
            style={{ animationDelay: "200ms" }}
          >
            <Link href="/signup" className="flex-1">
              <Button className="w-full animate-marquee-pulse" size="lg">
                Get on the list
              </Button>
            </Link>
            <Link href="/lineup" className="flex-1">
              <Button className="w-full" size="lg" variant="secondary">
                Peek the lineup
              </Button>
            </Link>
          </div>

          <p className="mt-6 text-xs text-smoke">
            Demo: <span className="text-mic">maya.kill@greenroom.app</span> /{" "}
            <span className="text-mic">demo1234</span>
          </p>
        </section>
      </div>
    </div>
  );
}
