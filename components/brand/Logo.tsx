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
          "grid h-8 w-8 place-items-center rounded-card border border-white/25 bg-white text-sm font-black text-brand shadow-soft",
          markClassName
        )}
        aria-hidden
      >
        V
      </span>
      <span className="font-display text-xl font-black tracking-tight text-white">
        {APP_NAME}
      </span>
    </span>
  );

  return (
    <Link href={href} aria-label={`${APP_NAME} home`}>
      {content}
    </Link>
  );
}
