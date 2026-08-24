import { Link } from "react-router-dom";

function isInternal(href) {
  return typeof href === "string" && href.startsWith("/");
}

export default function ProjectLinks({ links = {}, nextSlug }) {
  const items = [
    { key: "live", label: "Live Site", href: links.live, primary: true },
    { key: "github", label: "GitHub", href: links.github },
    { key: "source", label: "Source Code", href: links.source },
    { key: "prototype", label: "Prototype", href: links.prototype },
  ].filter((item) => item.href);

  const nextHref = nextSlug ? `/work/${nextSlug}` : null;

  if (!items.length && !nextHref) return null;

  return (
    <div className="flex flex-wrap gap-3">
      {items.map((item) =>
        isInternal(item.href) ? (
          <Link
            key={item.key}
            to={item.href}
            className={item.primary ? "btn-primary" : "btn-ghost"}
          >
            {item.label}
          </Link>
        ) : (
          <a
            key={item.key}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className={item.primary ? "btn-primary" : "btn-ghost"}
          >
            {item.label}
          </a>
        )
      )}
      {nextHref ? (
        <Link to={nextHref} className="btn-ghost">
          Next Project →
        </Link>
      ) : null}
    </div>
  );
}
