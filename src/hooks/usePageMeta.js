import { useEffect } from "react";

const DEFAULT_DESCRIPTION =
  "Civic Bound is a nonprofit youth support network for belonging, learning, mental wellbeing, and positive community re-entry.";

function upsertMeta(attr, key, content) {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function usePageMeta({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  image = "/images/hero-community.jpg",
} = {}) {
  useEffect(() => {
    const fullTitle =
      title && title.length
        ? `${title} | Civic Bound`
        : "Civic Bound | Youth Support. Belonging. Wellbeing.";
    document.title = fullTitle;

    const origin = window.location.origin;
    const url = `${origin}${path}`;
    const imageUrl = image.startsWith("http") ? image : `${origin}${image}`;

    upsertMeta("name", "description", description);
    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:image", imageUrl);
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", imageUrl);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);
  }, [title, description, path, image]);
}

export default usePageMeta;
