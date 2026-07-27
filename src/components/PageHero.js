function PageHero({ brand, title, copy, image = "/images/campus-lobby.jpg", compact = false }) {
  return (
    <section className={`page-hero ${compact ? "compact" : ""}`}>
      <div className="page-hero-media" aria-hidden="true">
        <img src={image} alt="" />
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
