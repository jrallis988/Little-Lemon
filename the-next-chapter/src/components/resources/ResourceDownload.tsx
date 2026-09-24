interface ResourceDownloadProps {
  title: string;
  description: string;
  type: string;
  meta?: string;
  href?: string;
}

export function ResourceDownload({
  title,
  description,
  type,
  meta,
  href = "/resources/sample",
}: ResourceDownloadProps) {
  return (
    <article className="flex flex-col border border-line bg-paper p-6">
      <div className="flex items-start justify-between gap-3">
        <span className="inline-block border border-forest/20 bg-forest/10 px-2.5 py-0.5 font-display text-[0.65rem] font-bold uppercase tracking-wider text-forest">
          {type}
        </span>
        {meta && (
          <span className="font-display text-[0.65rem] font-bold uppercase tracking-wider text-ink-muted">
            {meta}
          </span>
        )}
      </div>
      <h3 className="mt-3 font-display text-base font-bold text-ink">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
        {description}
      </p>
      <a
        href={href}
        className="mt-4 self-start font-display text-xs font-bold uppercase tracking-wider text-burgundy underline-offset-2 hover:underline"
      >
        View / Print Sample
      </a>
    </article>
  );
}
