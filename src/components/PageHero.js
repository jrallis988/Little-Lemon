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

      <div className="relative section-shell pb-10 pt-6 sm:pb-12 sm:pt-8">
        <p className="eyebrow !text-sunrise animate-fade-in">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl font-display text-3xl font-semibold tracking-tight sm:mt-4 sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {summary ? (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/85 sm:mt-5 sm:text-lg">
            {summary}
          </p>
        ) : null}
      </div>
    </section>
  );
}
