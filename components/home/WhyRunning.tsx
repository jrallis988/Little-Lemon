import Link from "next/link";
import { Play } from "lucide-react";
import { candidate } from "@/lib/candidate";

export function WhyRunning() {
  return (
    <section
      id="why"
      aria-labelledby="why-heading"
      className="scroll-mt-28 bg-pine-800"
    >
      <div className="mx-auto grid max-w-content items-center gap-10 section-pad lg:grid-cols-2 lg:gap-14">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-amber-300">
            Why I’m Running
          </p>
          <h2
            id="why-heading"
            className="mt-3 font-serif text-3xl font-bold text-white sm:text-4xl"
          >
            The government has forgotten who it works for.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-pine-100">
            {candidate.coreStatement.split(". This campaign")[0]}.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-pine-100">
            This campaign doesn’t take corporate money. It doesn’t answer to party
            bosses. It’s built neighbor by neighbor — the only way a campaign for
            New Hampshire should be.
          </p>
          <Link
            href="/meet-nick"
            className="mt-8 inline-flex border-b-2 border-amber-300 pb-0.5 text-base font-semibold text-amber-300 hover:border-amber-200 hover:text-amber-200"
          >
            Read Nick’s Full Story →
          </Link>
        </div>

        <div className="flex aspect-video flex-col items-center justify-center border border-pine-600 bg-pine-900/60 text-center">
          <Play className="h-12 w-12 text-amber-300" strokeWidth={1.5} aria-hidden />
          <p className="mt-4 font-serif text-xl font-bold text-white">
            Nick’s Story
          </p>
          <p className="mt-2 text-sm text-pine-200">Video coming soon</p>
        </div>
      </div>
    </section>
  );
}
