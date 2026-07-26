type LogoProps = {
  className?: string;
  light?: boolean;
};

export function Logo({ className = "", light = false }: LogoProps) {
  return (
    <a
      href="#top"
      className={`group inline-flex items-center gap-2.5 ${className}`}
      aria-label="Weight Watchers home"
    >
      <span
        className={`font-display text-[1.35rem] tracking-tight sm:text-[1.55rem] ${
          light ? "text-white" : "text-ink"
        }`}
        style={{ fontWeight: 800 }}
      >
        W
        <span className="mx-1.5 inline-flex w-7 items-center sm:w-9" aria-hidden="true">
          <span
            className={`progress-track !h-1 w-full ${
              light ? "bg-white/30" : "bg-cobalt-200/80"
            }`}
          >
            <span
              className={`progress-fill w-[68%] animate-fill-bar transition-all duration-500 group-hover:w-full ${
                light ? "bg-tide" : "bg-cobalt-600"
              }`}
            />
          </span>
        </span>
        W
      </span>
      <span
        className={`hidden font-sans text-[0.68rem] font-semibold uppercase tracking-[0.22em] sm:inline ${
          light ? "text-white/70" : "text-ink/50"
        }`}
      >
        Weight Watchers
      </span>
    </a>
  );
}
