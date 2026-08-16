import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  href = "/",
  size = "md",
}: {
  className?: string;
  href?: string;
  size?: "sm" | "md" | "lg" | "hero";
}) {
  return (
    <Link
      href={href}
      className={cn(
        "font-display uppercase tracking-[0.08em] text-foam",
        size === "sm" && "text-xl",
        size === "md" && "text-2xl",
        size === "lg" && "text-4xl",
        size === "hero" && "text-6xl sm:text-7xl",
        className,
      )}
    >
      Green<span className="text-spotlight">room</span>
    </Link>
  );
}
