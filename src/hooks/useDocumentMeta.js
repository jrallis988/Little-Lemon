import { useEffect } from "react";

const DEFAULT_OG_IMAGE = "/images/campus-exterior.jpg";
const DEFAULT_OG_ALT =
  "Berlin campus of White Mountains Community College";

function upsertMeta(selector, attributes) {
  let el = document.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    Object.entries(attributes).forEach(([key, value]) => {
      if (key !== "content") el.setAttribute(key, value);
    });
    document.head.appendChild(el);
  }
  if (attributes.content != null) {
    el.setAttribute("content", attributes.content);
  }
  return el;
}

function upsertLink(rel, href) {
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
  return el;
}

/**
 * Updates document.title, description, canonical, and Open Graph / Twitter tags.
 */
export function useDocumentMeta({
  title,
  description,
  image = DEFAULT_OG_IMAGE,
  imageAlt = DEFAULT_OG_ALT,
}) {
  useEffect(() => {
    if (title) {
      document.title = title;
    }

    if (description) {
      upsertMeta('meta[name="description"]', {
        name: "description",
        content: description,
      });
    }

    const origin = window.location.origin;
    const pageUrl = `${origin}${window.location.pathname}${window.location.search}`;
    const absoluteImage = image.startsWith("http")
      ? image
      : `${origin}${image.startsWith("/") ? image : `/${image}`}`;

    upsertLink("canonical", `${origin}${window.location.pathname}`);

    upsertMeta('meta[property="og:title"]', {
      property: "og:title",
      content: title || document.title,
    });
    upsertMeta('meta[property="og:description"]', {
      property: "og:description",
      content: description || "",
    });
    upsertMeta('meta[property="og:type"]', {
      property: "og:type",
      content: "website",
    });
    upsertMeta('meta[property="og:url"]', {
      property: "og:url",
      content: pageUrl,
    });
    upsertMeta('meta[property="og:site_name"]', {
      property: "og:site_name",
      content: "White Mountains Community College",
    });
    upsertMeta('meta[property="og:image"]', {
      property: "og:image",
      content: absoluteImage,
    });
    upsertMeta('meta[property="og:image:alt"]', {
      property: "og:image:alt",
      content: imageAlt,
    });
    upsertMeta('meta[name="twitter:card"]', {
      name: "twitter:card",
      content: "summary_large_image",
    });
    upsertMeta('meta[name="twitter:title"]', {
      name: "twitter:title",
      content: title || document.title,
    });
    upsertMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: description || "",
    });
    upsertMeta('meta[name="twitter:image"]', {
      name: "twitter:image",
      content: absoluteImage,
    });
  }, [title, description, image, imageAlt]);
}

export default useDocumentMeta;
