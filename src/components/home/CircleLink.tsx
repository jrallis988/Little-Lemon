import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function CircleLink({
  href,
  children,
  className,
  light = false,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  light?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-s2 text-base font-bold no-underline",
        light ? "text-white hover:text-white/90" : "text-ocean hover:text-ocean-dark",
        className,
      )}
    >
      {children}
      <span
        className={cn(
          "inline-flex h-7 w-7 items-center justify-center rounded-full border transition-colors",
          light
            ? "border-white/70 group-hover:bg-white/10"
            : "border-ocean group-hover:bg-ocean group-hover:text-white",
        )}
        aria-hidden="true"
      >
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M5 12h14M13 5l7 7-7 7" />
        </svg>
      </span>
    </Link>
  );
}
