export default function ProjectMeta({ meta }) {
  if (!meta) return null;

  const rows = [
    { label: "Role", value: meta.role },
    { label: "Timeline", value: meta.timeline },
    { label: "Platform", value: meta.platform },
    { label: "Project type", value: meta.projectType },
  ].filter((row) => row.value);

  return (
    <section className="border-y border-sand/14 bg-ink py-10 md:py-12">
      <div className="container">
        <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {rows.map((row) => (
            <div key={row.label} className="border-t border-foam/35 pt-4">
              <dt className="text-sm uppercase tracking-[0.16em] text-sand/60">{row.label}</dt>
              <dd className="mt-2 text-base text-chalk">{row.value}</dd>
            </div>
          ))}
        </dl>
        {meta.responsibilities?.length ? (
          <div className="mt-10 max-w-3xl">
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-foam">
              Responsibilities
            </h2>
            <ul className="mt-4 space-y-2 text-base text-sand/85">
              {meta.responsibilities.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foam" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}
