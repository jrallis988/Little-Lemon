import { Link } from "react-router-dom";

function isInternal(href) {
  return typeof href === "string" && href.startsWith("/") && !href.endsWith(".html");
}

function resolveHref(href) {
  if (!href) return href;
  if (href.endsWith(".html") && href.startsWith("/")) {
    return `${process.env.PUBLIC_URL || ""}${href}`;
  }
  return href;
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
      {items.map((item) => {
        const href = resolveHref(item.href);
        if (isInternal(item.href)) {
          return (
            <Link
              key={item.key}
              to={item.href}
              className={item.primary ? "btn-primary" : "btn-ghost"}
            >
              {item.label}
            </Link>
          );
        }
        return (
          <a
            key={item.key}
            href={href}
            className={item.primary ? "btn-primary" : "btn-ghost"}
          >
            {item.label}
          </a>
        );
      })}
      {nextHref ? (
        <Link to={nextHref} className="btn-ghost">
          Next Project →
        </Link>
      ) : null}
    </div>
  );
}
