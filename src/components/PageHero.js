import { Link } from "react-router-dom";
import ExternalLink from "./ExternalLink";

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
          <img
            src={image}
            alt=""
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
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
                if (isHttp) {
                  return (
                    <ExternalLink
                      key={action.label}
                      className={action.className || "btn btn-gold"}
                      href={action.to}
                      trackName={
                        /apply/i.test(action.label)
                          ? "apply_click"
                          : /request|info|inquiry/i.test(action.label)
                            ? "request_info_click"
                            : "outbound_click"
                      }
                      trackProps={{ location: "page_hero", label: action.label }}
                    >
                      {action.label}
                    </ExternalLink>
                  );
                }
                return (
                  <a
                    key={action.label}
                    className={action.className || "btn btn-gold"}
                    href={action.to}
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
