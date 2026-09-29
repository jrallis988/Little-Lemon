import { Link } from "react-router-dom";
import { useEffect } from "react";

function injectBreadcrumbJsonLd(items) {
  const id = "wmcc-jsonld-breadcrumb";
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement("script");
    el.id = id;
    el.type = "application/ld+json";
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.to
        ? `${window.location.origin}${item.to}`
        : window.location.href,
    })),
  });
  return () => document.getElementById(id)?.remove();
}

/**
 * Visible trail + BreadcrumbList JSON-LD.
 * Pass items like [{ label: "Home", to: "/" }, { label: "Current" }].
 */
function Breadcrumbs({ items = [] }) {
  useEffect(() => {
    if (!items.length) return undefined;
    return injectBreadcrumbJsonLd(items);
  }, [items]);

  if (!items.length) return null;

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`}>
              {isLast || !item.to ? (
                <span aria-current={isLast ? "page" : undefined}>
                  {item.label}
                </span>
              ) : (
                <Link to={item.to}>{item.label}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;
