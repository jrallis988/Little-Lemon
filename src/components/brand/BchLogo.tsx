import { cn } from "@/lib/cn";

type LogoProps = {
  className?: string;
  /** White mark for dark headers */
  variant?: "onDark" | "onLight";
  showWordmark?: boolean;
  showTagline?: boolean;
};

/** Placeholder brand mark inspired by the BCH nurse-and-child seal. */
export function BchMark({
  className,
  variant = "onDark",
}: {
  className?: string;
  variant?: "onDark" | "onLight";
}) {
  const oval = variant === "onDark" ? "#002060" : "#003087";
  const stroke = "#ffffff";

  return (
    <svg
      viewBox="0 0 56 72"
      fill="none"
      aria-hidden="true"
      className={cn("h-11 w-[34px]", className)}
    >
      <ellipse cx="28" cy="36" rx="26" ry="34" fill={oval} />
      <ellipse
        cx="28"
        cy="36"
        rx="26"
        ry="34"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="1.25"
      />
      {/* Nurse cradling child — simplified line illustration placeholder */}
      <g stroke={stroke} strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round" fill="none">
        {/* nurse cap */}
        <path d="M20 18h16" />
        <path d="M24 14c0-2.5 1.8-4.2 4-4.2s4 1.7 4 4.2" />
        {/* nurse head */}
        <circle cx="28" cy="24" r="4.2" />
        {/* nurse shoulders / arms cradling */}
        <path d="M18 44c2-8 5.5-13 10-13s8 5 10 13" />
        <path d="M22 40c3 4 5.5 7 6 10" />
        {/* child */}
        <circle cx="36" cy="38" r="3" />
        <path d="M30 42c2.2-1.2 4.5-1.4 7 0 1.4.8 2.2 2.6 2.2 4.6" />
        {/* lower gown */}
        <path d="M17 54c2.5-5 6-8.5 11-8.5 3.2 0 6 1.2 8.2 3.4" />
      </g>
    </svg>
  );
}

export function BchLogo({
  className,
  variant = "onDark",
  showWordmark = true,
  showTagline = false,
}: LogoProps) {
  const title = variant === "onDark" ? "text-white" : "text-blue";
  const tagline =
    variant === "onDark" ? "text-pink-onDark" : "text-pink-text";

  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <BchMark variant={variant} />
      {showWordmark ? (
        <span className="flex flex-col">
          <span
            className={cn(
              "text-[15px] font-bold leading-[1.15] tracking-[-0.01em]",
              title,
            )}
          >
            Boston Children&apos;s
            <br />
            Hospital
          </span>
          {showTagline ? (
            <span
              className={cn(
                "mt-1 text-[10px] font-bold tracking-[0.01em]",
                tagline,
              )}
            >
              Where the world comes for answers
            </span>
          ) : null}
        </span>
      ) : null}
    </span>
  );
}
