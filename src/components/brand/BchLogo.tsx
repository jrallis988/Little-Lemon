import { cn } from "@/lib/cn";

type LogoProps = {
  className?: string;
  /** White mark for dark headers */
  variant?: "onDark" | "onLight";
  showWordmark?: boolean;
  showTagline?: boolean;
};

/**
 * BCH nurse-and-child seal — circular brand mark for dark/light surfaces.
 * Brand-faithful recreation pending authorized logo files.
 */
export function BchMark({
  className,
  variant = "onDark",
}: {
  className?: string;
  variant?: "onDark" | "onLight";
}) {
  const fill = variant === "onDark" ? "#ffffff" : "#003087";
  const ring = variant === "onDark" ? "rgba(255,255,255,0.35)" : "rgba(0,48,135,0.25)";

  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      aria-hidden="true"
      className={cn("h-11 w-11", className)}
    >
      <circle cx="40" cy="40" r="38" stroke={ring} strokeWidth="1.5" fill="none" />
      <circle cx="40" cy="40" r="34.5" stroke={fill} strokeWidth="1.25" fill="none" />

      {/* Nurse in profile facing left, holding child */}
      <g
        stroke={fill}
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        {/* Cap */}
        <path d="M28 18h18" />
        <path d="M32 14c0-2.8 2-4.6 4.4-4.6S41 11.2 41 14" />
        {/* Nurse head / neck */}
        <circle cx="36" cy="24" r="5" />
        <path d="M36 29v4" />
        {/* Shoulders / gown */}
        <path d="M22 52c2.5-10 7-16 14-16 4.5 0 8 2.2 10.5 5.5" />
        <path d="M24 58c3-7 8-12 14-12" />
        {/* Arms cradling */}
        <path d="M30 42c4 3 7 7 8 11" />
        <path d="M42 40c3.5 1.5 6 4.5 8 8" />
        {/* Child head + body */}
        <circle cx="48" cy="38" r="4" />
        <path d="M44 43c2.5-1 5.5-1 8 .4 1.5.8 2.4 2.4 2.6 4.2" />
        <path d="M46 48c2 3 3.5 6 3.8 9" />
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
              "font-sans text-[15px] font-bold leading-[1.12] tracking-[-0.01em]",
              title,
            )}
          >
            Boston
            <br />
            Children&apos;s
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
