"use client";

import Link from "next/link";

import { APP_NAME, cn } from "@/lib/utils";

export interface LogoProps {
  href?: string;
  className?: string;
  markClassName?: string;
}

export function Logo({ href = "/", className, markClassName }: LogoProps) {
  const content = (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span
        className={cn(
          "grid h-8 w-8 place-items-center rounded-full border border-white/30 bg-white text-lg text-brand shadow-soft [font-family:var(--font-script)]",
          markClassName
        )}
        aria-hidden
      >
        V
      </span>
      <span className="leading-none">
        <span className="block text-2xl leading-none text-white [font-family:var(--font-script)]">
          {APP_NAME}
        </span>
        <span className="mt-0.5 hidden text-[10px] font-bold uppercase tracking-[0.18em] text-navy-200 sm:block">
          Student vibes
        </span>
      </span>
    </span>
  );

  return (
    <Link href={href} aria-label={`${APP_NAME} home`}>
      {content}
    </Link>
  );
}
