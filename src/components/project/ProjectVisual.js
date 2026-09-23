export default function ProjectVisual({
  label,
  tone = "default",
  src,
  className = "",
}) {
  const tones = {
    mediterranean: "from-foam/25 via-ink-mist to-ink-soft",
    play: "from-foam-deep/40 via-ink-soft to-ink",
    default: "from-ink-mist via-ink-soft to-ink",
  };

  const publicSrc = src
    ? `${process.env.PUBLIC_URL || ""}${src.startsWith("/") ? src : `/${src}`}`
    : null;

  return (
    <div
      className={`relative overflow-hidden border border-sand/15 bg-ink-soft ${className}`}
      role={publicSrc ? undefined : "img"}
      aria-label={publicSrc ? undefined : label}
    >
      {publicSrc ? (
        <img
          src={publicSrc}
          alt={label}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      ) : (
        <>
          <div
            className={`absolute inset-0 bg-gradient-to-br ${tones[tone] || tones.default}`}
            aria-hidden="true"
          />
          <div className="grain opacity-30" aria-hidden="true" />
          <div className="relative flex min-h-[220px] items-end p-6 md:min-h-[320px] md:p-8">
            <p className="font-display text-xl font-bold text-chalk md:text-2xl">{label}</p>
          </div>
        </>
      )}
    </div>
  );
}
