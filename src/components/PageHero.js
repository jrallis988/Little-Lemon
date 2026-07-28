import { Link } from "react-router-dom";

function PageHero({
  brand,
  title,
  copy,
  image = "/images/campus-exterior.jpg",
  compact = false,
  actions = null,
}) {
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
        {actions ? (
          <div className="cta-actions">
            {actions.map((action) => {
              const isExternal = Boolean(action.external);
              const isHttp =
                typeof action.to === "string" &&
                /^https?:\/\//i.test(action.to);

              if (isExternal) {
                return (
                  <a
                    key={action.label}
                    className={action.className || "btn btn-gold"}
                    href={action.to}
                    {...(isHttp
                      ? { target: "_blank", rel: "noreferrer" }
                      : {})}
                  >
                    {action.label}
                  </a>
                );
              }

              return (
                <Link
                  key={action.label}
                  className={action.className || "btn btn-gold"}
                  to={action.to}
                >
                  {action.label}
                </Link>
              );
            })}
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default PageHero;
