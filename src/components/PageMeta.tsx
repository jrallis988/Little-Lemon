import { useEffect } from "react";

export type PageMetaProps = {
  title: string;
  description: string;
  path?: string;
  image?: string;
};

const SITE = "https://www.weightwatchers.com";
const DEFAULT_IMAGE = "/images/campaign/hero-cook.jpg";

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let node = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!node) {
    node = document.createElement("meta");
    node.setAttribute(attr, key);
    document.head.appendChild(node);
  }
  node.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let node = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!node) {
    node = document.createElement("link");
    node.rel = rel;
    document.head.appendChild(node);
  }
  node.href = href;
}

export function PageMeta({
  title,
  description,
  path = "/",
  image = DEFAULT_IMAGE,
}: PageMetaProps) {
  useEffect(() => {
    const absoluteImage = image.startsWith("http") ? image : `${window.location.origin}${image}`;
    const canonical = `${SITE}${path === "/" ? "" : path}`;

    document.title = title;
    upsertMeta("name", "description", description);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:url", canonical);
    upsertMeta("property", "og:image", absoluteImage);
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", absoluteImage);
    upsertLink("canonical", canonical);
  }, [title, description, path, image]);

  return null;
}
