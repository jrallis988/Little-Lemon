function PageHero({
  brand,
  title,
  copy,
  image = "/images/campus-lobby.jpg",
  compact = false,
  priority = false,
}) {
  return (
    <section className={`page-hero ${compact ? "compact" : ""}`}>
      <div className="page-hero-media" aria-hidden="true">
        <img
          src={image}
          alt=""
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
        />
        <div className="hero-veil" />
      </div>
      <div className="container page-hero-content">
        {brand ? <p className="hero-brand">{brand}</p> : null}
        <h1>{title}</h1>
        {copy ? <p>{copy}</p> : null}
      </div>
    </section>
  );
}

export default PageHero;
