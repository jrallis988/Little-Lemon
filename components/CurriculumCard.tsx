export type CurriculumCardProps = {
  title: string;
  description: string;
  kind: "module" | "diagnostic" | "structure";
  items?: string[];
  href?: string;
};

const kindLabel: Record<CurriculumCardProps["kind"], string> = {
  module: "Module",
  diagnostic: "Diagnostic",
  structure: "Structure",
};

export function CurriculumCard({
  title,
  description,
  kind,
  items = [],
  href,
}: CurriculumCardProps) {
  const content = (
    <>
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-accent">
          {kindLabel[kind]}
        </span>
        {href ? (
          <span
            aria-hidden
            className="font-sans text-sm text-mute transition-transform duration-200 group-hover:translate-x-0.5"
          >
            →
          </span>
        ) : null}
      </div>

      <h3 className="mt-3 font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl">
        {title}
      </h3>

      <p className="mt-2 font-body text-base leading-relaxed text-ink-soft">
        {description}
      </p>

      {items.length > 0 ? (
        <ul className="mt-5 space-y-2 border-t border-line pt-4">
          {items.map((item) => (
            <li
              key={item}
              className="flex gap-2.5 font-sans text-sm leading-snug text-ink-soft"
            >
              <span
                aria-hidden
                className="mt-2 h-1 w-1 shrink-0 rounded-sm bg-accent"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );

  const className =
    "group block h-full border border-line bg-white/70 p-5 shadow-tactile transition-[border-color,background-color,transform] duration-200 hover:border-accent/35 hover:bg-white sm:p-6";

  if (href) {
    return (
      <a href={href} className={className}>
        {content}
      </a>
    );
  }

  return <article className={className}>{content}</article>;
}
