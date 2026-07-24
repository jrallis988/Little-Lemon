import Link from "next/link";
import { Play } from "lucide-react";
import { SectionIntro } from "@/components/SectionIntro";

export function WhyRunning() {
  return (
    <section
      id="why"
      aria-labelledby="why-heading"
      className="scroll-mt-28 bg-slate"
    >
      <div className="mx-auto grid max-w-content items-center gap-10 section-pad lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionIntro
            overline="Why I’m Running"
            title="The government has forgotten who it works for."
            tone="dark"
            titleId="why-heading"
          />
          <p className="mt-5 text-body-lg text-white/85">
            Nick Varga isn’t a career politician. He’s a Granite Stater who
            watched Washington stop listening a long time ago — and decided that
            if nobody else was going to run, he would.
          </p>
          <p className="mt-4 text-body-lg text-white/85">
            This campaign doesn’t take corporate money. It doesn’t answer to party
            bosses. It’s built neighbor by neighbor — the only way a campaign for
            New Hampshire should be.
          </p>
          <Link href="/meet-nick" className="link-cta mt-8">
            Read Nick’s Full Story →
          </Link>
        </div>

        <div className="flex aspect-video flex-col items-center justify-center border border-white/15 bg-ink/30 text-center">
          <Play className="h-12 w-12 text-red" strokeWidth={1.5} aria-hidden />
          <p className="mt-4 font-display text-xl font-normal text-white">
            Nick’s Story
          </p>
          <p className="mt-2 text-sm text-white/60">Video coming soon</p>
        </div>
      </div>
    </section>
  );
}
