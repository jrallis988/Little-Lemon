import { useEffect } from "react";

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

/**
 * Updates document.title, description, and Open Graph / Twitter tags.
 */
export function useDocumentMeta({ title, description }) {
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

    const pageUrl = `${window.location.origin}${window.location.pathname}${window.location.search}`;

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
  }, [title, description]);
}

export default useDocumentMeta;
