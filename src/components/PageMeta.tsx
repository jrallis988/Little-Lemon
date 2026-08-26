import { useEffect } from "react";
import { absoluteUrl } from "../lib/site";

type PageMetaProps = {
  title: string;
  description: string;
  /** Path under site root, e.g. `/shop` */
  path?: string;
  image?: string;
};

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function PageMeta({
  title,
  description,
  path = "/",
  image = "/og.jpg",
}: PageMetaProps) {
  useEffect(() => {
    const fullTitle =
      title === "Smuttynose Brewing | Hampton, NH"
        ? title
        : `${title} · Smuttynose Brewing`;
    document.title = fullTitle;
    setMeta("name", "description", description);
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", absoluteUrl(path));
    setMeta("property", "og:image", absoluteUrl(image));
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", absoluteUrl(image));

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", absoluteUrl(path));
  }, [title, description, path, image]);

  return null;
}
