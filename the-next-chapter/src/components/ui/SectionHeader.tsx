interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  dark = false,
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "";

  return (
    <header className={`max-w-2xl ${alignClass}`}>
      {eyebrow && (
        <p
          className={`font-display text-xs font-bold uppercase tracking-[0.2em] ${dark ? "text-amber" : "text-burgundy"}`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`mt-2 font-display text-3xl font-bold leading-tight tracking-tight md:text-4xl ${dark ? "text-cream" : "text-ink"}`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-base leading-relaxed md:text-lg ${dark ? "text-cream/75" : "text-ink-muted"}`}
        >
          {description}
        </p>
      )}
    </header>
  );
}
