export default function PageHero({
  eyebrow,
  title,
  summary,
  image,
  imageAlt = "",
  children,
  priority = true,
}) {
  return (
    <section className="relative overflow-hidden pt-28 text-white">
      {image ? (
        <>
          <img
            src={image}
            alt={imageAlt}
            className="absolute inset-0 h-full w-full object-cover"
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            fetchpriority={priority ? "high" : "auto"}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-river-deep/88 via-river-deep/68 to-river-deep/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-river-deep/45 via-transparent to-river-deep/25" />
        </>
      ) : (
        <div className="absolute inset-0 bg-river-deep">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(212,160,23,0.22),transparent_40%),linear-gradient(120deg,rgba(26,122,148,0.35),transparent_55%)]" />
        </div>
      )}

      <div className="relative section-shell pb-8 pt-5 sm:pb-10 sm:pt-7">
        {eyebrow ? (
          <p className="eyebrow !text-sunrise animate-fade-in">{eyebrow}</p>
        ) : null}
        <h1 className="mt-3 max-w-3xl font-display text-3xl font-semibold tracking-tight drop-shadow-sm sm:mt-4 sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {summary ? (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/90 sm:mt-5 sm:text-lg">
            {summary}
          </p>
        ) : null}
        {children ? <div className="mt-6">{children}</div> : null}
      </div>
    </section>
  );
}
