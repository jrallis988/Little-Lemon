import { Link } from "react-router-dom";

type LogoProps = {
  className?: string;
  light?: boolean;
  variant?: "default" | "anniversary";
  homePath?: string;
};

export function Logo({
  className = "",
  light = false,
  variant = "default",
  homePath = "/",
}: LogoProps) {
  const ink = light ? "text-white" : "text-ink";
  const muted = light ? "text-white/70" : "text-ink/50";

  return (
    <Link
      to={homePath}
      className={`group inline-flex items-center gap-2.5 ${className}`}
      aria-label="Weight Watchers 63 home"
    >
      <span className={`font-display text-[1.35rem] tracking-tight sm:text-[1.55rem] ${ink}`} style={{ fontWeight: 800 }}>
        W
        <span className="mx-1.5 inline-flex w-7 items-center sm:w-9" aria-hidden="true">
          <span className={`progress-track !h-1 w-full ${light ? "bg-white/30" : "bg-cobalt-200/80"}`}>
            <span
              className={`progress-fill w-[68%] animate-fill-bar transition-all duration-500 group-hover:w-full ${
                light ? "bg-tide" : "bg-cobalt-600"
              }`}
            />
          </span>
        </span>
        W
      </span>
      {variant === "anniversary" ? (
        <span className="inline-flex items-baseline gap-1.5">
          <span className={`font-display text-lg font-bold ${light ? "text-tide" : "text-cobalt-600"}`} style={{ fontWeight: 700 }}>
            63
          </span>
          <span className={`hidden font-sans text-[0.62rem] font-semibold uppercase tracking-[0.18em] sm:inline ${muted}`}>
            Years of You
          </span>
        </span>
      ) : (
        <span className={`hidden font-sans text-[0.68rem] font-semibold uppercase tracking-[0.22em] sm:inline ${muted}`}>
          Weight Watchers
        </span>
      )}
    </Link>
  );
}

export function AnniversaryBadge({
  className = "",
  light = false,
}: {
  className?: string;
  light?: boolean;
}) {
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 ${
        light
          ? "border-white/25 bg-white/10 text-white backdrop-blur-sm"
          : "border-cobalt-200/80 bg-white/90"
      } ${className}`}
      aria-label="Weight Watchers 63 anniversary badge"
    >
      <span
        className={`font-display text-sm font-bold ${light ? "text-white" : "text-cobalt-700"}`}
        style={{ fontWeight: 700 }}
      >
        WW 63
      </span>
      <span className="h-1 w-6 origin-left rounded-full bg-gradient-to-r from-cobalt-600 to-tide" />
      <span
        className={`font-sans text-[0.6rem] font-semibold uppercase tracking-[0.16em] ${
          light ? "text-white/70" : "text-ink/50"
        }`}
      >
        1963–2026
      </span>
    </div>
  );
}
