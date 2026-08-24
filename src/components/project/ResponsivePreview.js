export default function ResponsivePreview({ responsive }) {
  if (!responsive?.breakpoints?.length) return null;

  return (
    <div>
      {responsive.summary ? (
        <p className="text-base leading-relaxed text-sand/85 md:text-lg">{responsive.summary}</p>
      ) : null}
      <ul className="mt-8 grid gap-6 md:grid-cols-3">
        {responsive.breakpoints.map((item) => (
          <li key={item.label} className="border-t border-foam/35 pt-4">
            <p className="font-display text-xl font-bold text-foam-soft">{item.label}</p>
            <div
              className="mt-4 border border-sand/15 bg-ink-soft p-3"
              aria-hidden="true"
            >
              <div
                className={`mx-auto border border-sand/20 bg-ink ${
                  item.label === "Mobile"
                    ? "h-28 w-16"
                    : item.label === "Tablet"
                      ? "h-24 w-28"
                      : "h-20 w-full"
                }`}
              />
            </div>
            <p className="mt-3 text-sm leading-relaxed text-sand/75">{item.note}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
