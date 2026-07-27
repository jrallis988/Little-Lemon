export default function PageHero({
  eyebrow,
  title,
  summary,
  image,
  imageAlt = "",
}) {
  return (
    <section className="relative overflow-hidden pt-28 text-white">
      {image ? (
        <>
          <img
            src={image}
            alt={imageAlt}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-river-deep/95 via-river-deep/82 to-river-deep/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-river-deep/50 via-transparent to-river-deep/30" />
        </>
      ) : (
        <div className="absolute inset-0 bg-river-deep">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(212,160,23,0.22),transparent_40%),linear-gradient(120deg,rgba(26,122,148,0.35),transparent_55%)]" />
        </div>
      )}

      <div className="relative section-shell pb-16 pt-8">
        <p className="eyebrow !text-sunrise animate-fade-in">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {summary ? (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85">
            {summary}
          </p>
        ) : null}
      </div>
    </section>
  );
}
