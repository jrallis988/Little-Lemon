import Link from "next/link";
import { Music, ShieldCheck, Sparkles, Stars } from "lucide-react";

import {
  PLATFORM_AUDIENCE,
  PLATFORM_DESCRIPTION,
  PLATFORM_NAME,
  PLATFORM_TAGLINE,
} from "@/lib/constants";
import { cn } from "@/lib/utils/cn";

export interface LandingHeroProps {
  animate?: boolean;
  className?: string;
}

const buttonBase =
  "inline-flex min-h-10 items-center justify-center gap-2 rounded-[4px] border px-4 py-2 text-sm font-bold shadow-[0_1px_2px_rgba(34,34,34,0.08)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF7A18]";

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
        <p className="mb-3 inline-flex items-center gap-2 rounded-[4px] border border-[#E5E5E5] bg-white px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#222222]">
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          {PLATFORM_AUDIENCE}
        </p>
        <h1 className="max-w-3xl text-4xl font-black tracking-tight text-[#222222] sm:text-5xl lg:text-6xl">
          {PLATFORM_TAGLINE}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-[#222222]">
          {PLATFORM_DESCRIPTION}
        </p>
        <p className="mt-3 flex items-start gap-2 text-sm text-[#6E6E6E]">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#1E824C]" aria-hidden="true" />
          Built for teens only — customize your page, keep friends close, and stay in
          control of what you share.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/signup"
            className={cn(
              buttonBase,
              "border-[#FF7A18] bg-[#FF7A18] text-white hover:bg-[#E5670A]"
            )}
          >
            Create Your Profile
          </Link>
          <Link
            href="/login"
            className={cn(
              buttonBase,
              "border-[#7B61FF] bg-white text-[#222222] hover:bg-[#EEE9FF]"
            )}
          >
            Sign In
          </Link>
        </div>
      </div>

      <div className="mp-card relative overflow-hidden p-4">
        <div className="absolute right-4 top-4 rounded-[4px] bg-white/80 px-2 py-1 text-xs font-bold text-[#222222] shadow-sm">
          teen preview
        </div>
        <div className="rounded-[4px] border border-[#E5E5E5] bg-gradient-to-br from-[#EEE9FF] via-white to-[#f7d7e8] p-3">
          <div className="h-24 rounded-[4px] bg-gradient-to-r from-[#FF7A18] to-[#7B61FF]" />
          <div className="-mt-8 flex items-end gap-3 px-3">
            <div className="flex h-20 w-20 items-center justify-center rounded-[4px] border-4 border-white bg-[#f7d7e8] text-2xl font-black text-[#222222] shadow">
              N
            </div>
            <div className="mb-2">
              <h2 className="text-xl font-black text-[#222222]">Nova</h2>
              <p className="text-sm font-semibold text-[#6E6E6E]">@nova_skye · 15</p>
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-[4px] border border-[#E5E5E5] bg-white/80 p-3">
              <h3 className="flex items-center gap-2 text-sm font-black text-[#222222]">
                <Stars className="h-4 w-4" aria-hidden="true" />
                About me
              </h3>
              <p className="mt-2 text-sm text-[#222222]">
                Sophomore energy. Sticker maxxing. Playlist in the bio. Featured
                Friends that actually matter.
              </p>
            </div>
            <div className="rounded-[4px] border border-[#E5E5E5] bg-white/80 p-3">
              <h3 className="flex items-center gap-2 text-sm font-black text-[#222222]">
                <Music className="h-4 w-4" aria-hidden="true" />
                On repeat
              </h3>
              <div className="mt-3 h-2 rounded-[4px] bg-[#FFF1E6]">
                <div className="h-2 w-2/3 rounded-[4px] bg-[#FF7A18]" />
              </div>
              <p className="mt-2 text-xs font-semibold text-[#6E6E6E]">
                Late-night locker mix
              </p>
            </div>
          </div>
          <p className="mt-3 text-center text-xs font-semibold text-[#6E6E6E]">
            {PLATFORM_NAME} · profiles that feel like you, not a template
          </p>
        </div>
      </div>
    </section>
  );
}

export default LandingHero;
