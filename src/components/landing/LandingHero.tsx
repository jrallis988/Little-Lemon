import Link from "next/link";
import { Music, Sparkles, Stars } from "lucide-react";

import { PLATFORM_DESCRIPTION } from "@/lib/constants";
import { cn } from "@/lib/utils/cn";

export interface LandingHeroProps {
  animate?: boolean;
  className?: string;
}

const buttonBase =
  "inline-flex min-h-10 items-center justify-center gap-2 rounded-[4px] border px-4 py-2 text-sm font-bold shadow-[0_1px_2px_rgba(15,39,68,0.08)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3b6ea5]";

export function LandingHero({ animate = true, className }: LandingHeroProps) {
  return (
    <section
      className={cn(
        "grid items-center gap-8 py-10 md:grid-cols-[1fr_0.85fr] md:py-16",
        animate && "animate-fade-up",
        className
      )}
    >
      <div>
        <p className="mb-3 inline-flex items-center gap-2 rounded-[4px] border border-[#c5d0dc] bg-white px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#0f2744]">
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          MyPlace is open
        </p>
        <h1 className="max-w-3xl text-4xl font-black tracking-tight text-[#0f2744] sm:text-5xl lg:text-6xl">
          Your profile should feel like your place.
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-[#1a2332]">
          {PLATFORM_DESCRIPTION}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/signup"
            className={cn(
              buttonBase,
              "border-[#0f2744] bg-[#0f2744] text-white hover:bg-[#0a1b30]"
            )}
          >
            Create Your Profile
          </Link>
          <Link
            href="/login"
            className={cn(
              buttonBase,
              "border-[#3b6ea5] bg-white text-[#0f2744] hover:bg-[#d7e4f3]"
            )}
          >
            Sign In
          </Link>
        </div>
      </div>

      <div className="mp-card relative overflow-hidden p-4">
        <div className="absolute right-4 top-4 rounded-[4px] bg-white/80 px-2 py-1 text-xs font-bold text-[#0f2744] shadow-sm">
          preview
        </div>
        <div className="rounded-[4px] border border-[#c5d0dc] bg-gradient-to-br from-[#d7e4f3] via-white to-[#f7d7e8] p-3">
          <div className="h-24 rounded-[4px] bg-gradient-to-r from-[#0f2744] to-[#3b6ea5]" />
          <div className="-mt-8 flex items-end gap-3 px-3">
            <div className="flex h-20 w-20 items-center justify-center rounded-[4px] border-4 border-white bg-[#f7d7e8] text-2xl font-black text-[#0f2744] shadow">
              N
            </div>
            <div className="mb-2">
              <h2 className="text-xl font-black text-[#0f2744]">Nova</h2>
              <p className="text-sm font-semibold text-[#5b6b7c]">@nova</p>
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-[4px] border border-[#c5d0dc] bg-white/80 p-3">
              <h3 className="flex items-center gap-2 text-sm font-black text-[#0f2744]">
                <Stars className="h-4 w-4" aria-hidden="true" />
                About my place
              </h3>
              <p className="mt-2 text-sm text-[#1a2332]">
                Web rings, late-night playlists, tiny photo albums, and friends
                who leave actual comments.
              </p>
            </div>
            <div className="rounded-[4px] border border-[#c5d0dc] bg-white/80 p-3">
              <h3 className="flex items-center gap-2 text-sm font-black text-[#0f2744]">
                <Music className="h-4 w-4" aria-hidden="true" />
                Currently playing
              </h3>
              <div className="mt-3 h-2 rounded-[4px] bg-[#d7e4f3]">
                <div className="h-2 w-2/3 rounded-[4px] bg-[#3b6ea5]" />
              </div>
              <p className="mt-2 text-xs font-semibold text-[#5b6b7c]">
                The midnight demo tape
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LandingHero;
