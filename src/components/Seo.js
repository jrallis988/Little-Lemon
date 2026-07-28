import { useEffect } from "react";

const DEFAULT_DESCRIPTION =
  "River Valley Community College — affordable degrees and certificates across Claremont, Keene, and Lebanon, New Hampshire. Soar into your future.";

function upsertMeta(attr, key, content) {
  if (typeof document === "undefined" || !content) return;
  let node = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!node) {
    node = document.createElement("meta");
    node.setAttribute(attr, key);
    document.head.appendChild(node);
  }
  node.setAttribute("content", content);
}

export default function Seo({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "",
  image = "/og-image.jpg",
}) {
  useEffect(() => {
    const fullTitle = title
      ? `${title} | River Valley Community College`
      : "River Valley Community College";
    document.title = fullTitle;

    const origin =
      process.env.REACT_APP_SITE_URL ||
      (typeof window !== "undefined" ? window.location.origin : "");
    const url = origin ? `${origin.replace(/\/$/, "")}${path || "/"}` : path;
    const imageUrl = origin
      ? `${origin.replace(/\/$/, "")}${image}`
      : image;

    upsertMeta("name", "description", description);
    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:image", imageUrl);
    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", imageUrl);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    if (url) canonical.setAttribute("href", url);
  }, [title, description, path, image]);

  return null;
}
