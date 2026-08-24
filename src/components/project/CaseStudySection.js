export default function CaseStudySection({ eyebrow, title, children, className = "" }) {
  return (
    <section className={`py-16 md:py-24 ${className}`}>
      <div className="container max-w-3xl">
        {eyebrow ? (
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-foam">
            {eyebrow}
          </p>
        ) : null}
        {title ? (
          <h2 className="font-display text-3xl font-bold text-chalk md:text-4xl">{title}</h2>
        ) : null}
        <div className={title ? "mt-5" : ""}>{children}</div>
      </div>
    </section>
  );
}
