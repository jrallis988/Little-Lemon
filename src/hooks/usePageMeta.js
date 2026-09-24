import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE = "NHTI – Concord's Community College";
const DEFAULT_DESCRIPTION =
  "NHTI – Concord's Community College. Affordable pathways in healthcare, engineering, business, and more on a full riverside campus in Concord, NH.";
const DEFAULT_IMAGE = "/media/og-campus.jpg";

function absoluteUrl(path) {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  const origin =
    typeof window !== "undefined" && window.location?.origin
      ? window.location.origin
      : "https://www.nhti.edu";
  return `${origin}${path.startsWith("/") ? path : `/${path}`}`;
}

function ensureMeta(selector, attributes) {
  let node = document.head.querySelector(selector);
  if (!node) {
    node = document.createElement("meta");
    Object.entries(attributes).forEach(([key, value]) => {
      if (key !== "content") node.setAttribute(key, value);
    });
    document.head.appendChild(node);
  }
  if (attributes.content != null) {
    node.setAttribute("content", attributes.content);
  }
  return node;
}

function ensureLink(rel, href) {
  let node = document.head.querySelector(`link[rel="${rel}"]`);
  if (!node) {
    node = document.createElement("link");
    node.setAttribute("rel", rel);
    document.head.appendChild(node);
  }
  node.setAttribute("href", href);
  return node;
}

export default function usePageMeta({
  title,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
  type = "website",
} = {}) {
  const location = useLocation();

  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE}` : SITE;
    const url = absoluteUrl(`${location.pathname}${location.search}`);
    const imageUrl = absoluteUrl(image);

    document.title = fullTitle;

    ensureMeta('meta[name="description"]', {
      name: "description",
      content: description,
    });
    ensureMeta('meta[property="og:site_name"]', {
      property: "og:site_name",
      content: SITE,
    });
    ensureMeta('meta[property="og:type"]', {
      property: "og:type",
      content: type,
    });
    ensureMeta('meta[property="og:title"]', {
      property: "og:title",
      content: fullTitle,
    });
    ensureMeta('meta[property="og:description"]', {
      property: "og:description",
      content: description,
    });
    ensureMeta('meta[property="og:url"]', {
      property: "og:url",
      content: url,
    });
    ensureMeta('meta[property="og:image"]', {
      property: "og:image",
      content: imageUrl,
    });
    ensureMeta('meta[name="twitter:card"]', {
      name: "twitter:card",
      content: "summary_large_image",
    });
    ensureMeta('meta[name="twitter:title"]', {
      name: "twitter:title",
      content: fullTitle,
    });
    ensureMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: description,
    });
    ensureMeta('meta[name="twitter:image"]', {
      name: "twitter:image",
      content: imageUrl,
    });
    ensureLink("canonical", url);
  }, [title, description, image, type, location.pathname, location.search]);
}
