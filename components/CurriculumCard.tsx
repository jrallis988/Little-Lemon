import Image from "next/image";

export type CurriculumCardProps = {
  title: string;
  description: string;
  kind: "feature" | "plan" | "workflow";
  items?: string[];
  href?: string;
  imageSrc?: string;
  imageAlt?: string;
  ctaLabel?: string;
};

const kindLabel: Record<CurriculumCardProps["kind"], string> = {
  feature: "Feature",
  plan: "Plan",
  workflow: "Workflow",
};

export function CurriculumCard({
  title,
  description,
  kind,
  items = [],
  href = "#features",
  imageSrc,
  imageAlt = "",
  ctaLabel = "Learn more",
}: CurriculumCardProps) {
  return (
    <a
      href={href}
      className="group flex h-full flex-col overflow-hidden rounded bg-white shadow-card transition-shadow duration-200 hover:shadow-card-hover"
    >
      {imageSrc ? (
        <div className="relative aspect-[16/10] overflow-hidden bg-paper-warm">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      ) : (
        <div className="aspect-[16/10] bg-gradient-to-br from-navy to-navy-deep" />
      )}

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <span className="text-xs font-bold uppercase tracking-[0.1em] text-accent">
          {kindLabel[kind]}
        </span>
        <h3 className="mt-2 text-xl font-bold leading-snug tracking-tight text-navy">
          {title}
        </h3>
        <p className="mt-2 flex-1 text-base leading-relaxed text-mute">
          {description}
        </p>

        {items.length > 0 ? (
          <ul className="mt-4 space-y-1.5 border-t border-line pt-4">
            {items.slice(0, 3).map((item) => (
              <li key={item} className="text-sm text-ink-soft">
                {item}
              </li>
            ))}
          </ul>
        ) : null}

        <span className="link-arrow mt-5">
          {ctaLabel}
          <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5">
            →
          </span>
        </span>
      </div>
    </a>
  );
}
