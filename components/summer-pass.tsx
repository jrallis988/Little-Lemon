import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";

export function SummerPass() {
  return (
    <section
      id="summer-pass"
      aria-labelledby="summer-pass-heading"
      className="scroll-mt-14 overflow-hidden bg-pf-purple text-white"
    >
      <div className="relative mx-auto grid max-w-5xl gap-6 px-4 py-10 md:grid-cols-[1.2fr_0.8fr] md:items-center md:px-6 md:py-12">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-pf-yellow/20 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 left-1/3 h-48 w-48 rounded-full bg-pf-yellow/10 blur-3xl"
        />

        <div className="relative">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-pf-yellow">
            High School Summer Pass® is here
          </p>
          <h2
            id="summer-pass-heading"
            className="mt-2 font-display text-3xl tracking-tight md:text-4xl"
          >
            Teens 14–19 work out free through August 31
          </h2>
          <p className="mt-2 max-w-xl text-sm text-white/85 md:text-base">
            Build strength where it counts this summer—with progress that’s all
            yours. Plus, enjoy 20% off Gymshark when you sign up.
          </p>
        </div>

        <div className="relative flex flex-col gap-3 sm:flex-row md:flex-col md:items-end">
          <Button asChild variant="app" size="lg" className="w-full sm:w-auto">
            <a
              href="https://www.planetfitness.com/SummerPass"
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                track("summer_pass_click", { source: "home_promo" })
              }
            >
              Sign Up Now
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full border-white/35 bg-transparent text-white hover:bg-white/10 hover:text-white sm:w-auto"
          >
            <a href="#clubs">Find a Club Near You</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
