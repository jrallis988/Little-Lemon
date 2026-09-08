import Image from "next/image";
import Link from "next/link";

export type CurriculumCardProps = {
  title: string;
  description: string;
  kind?: "feature" | "plan" | "workflow";
  eyebrow?: string;
  items?: string[];
  href?: string;
  imageSrc?: string;
  imageAlt?: string;
  ctaLabel?: string;
};

export function CurriculumCard({
  title,
  description,
  eyebrow,
  items = [],
  href = "/features",
  imageSrc,
  imageAlt = "",
  ctaLabel = "Learn more",
}: CurriculumCardProps) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col overflow-hidden rounded bg-white shadow-card transition-shadow duration-200 hover:shadow-card-hover"
    >
      {imageSrc ? (
        <div className="relative aspect-[16/10] overflow-hidden bg-paper-warm">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      ) : (
        <div className="aspect-[16/10] bg-gradient-to-br from-navy to-navy-deep" />
      )}

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {eyebrow ? (
          <span className="text-xs font-bold uppercase tracking-[0.1em] text-accent">
            {eyebrow}
          </span>
        ) : null}
        <h3
          className={`text-xl font-bold leading-snug tracking-tight text-navy ${
            eyebrow ? "mt-2" : ""
          }`}
        >
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
          <span
            aria-hidden
            className="transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
          >
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
