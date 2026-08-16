import { cn } from "@/lib/utils";

export function Avatar({
  initials,
  hue,
  size = "md",
  className,
}: {
  initials: string;
  hue: number;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full font-display tracking-wide text-foam",
        size === "sm" && "h-8 w-8 text-[11px]",
        size === "md" && "h-10 w-10 text-xs",
        size === "lg" && "h-14 w-14 text-base",
        size === "xl" && "h-20 w-20 text-xl",
        className,
      )}
      style={{
        background: `linear-gradient(145deg, hsl(${hue} 45% 28%), hsl(${hue} 55% 18%))`,
        boxShadow: "inset 0 0 0 1px rgba(246,239,230,0.12)",
      }}
      aria-hidden
    >
      {initials}
    </div>
  );
}
