import { useEffect } from "react";
import { siteConfig } from "../data/siteConfig";

/**
 * Sets document title + basic meta/OG tags for each route.
 */
function Seo({
  title,
  description = siteConfig.defaultDescription,
  path = "/",
}) {
  useEffect(() => {
    const fullTitle = title
      ? `${title} | ${siteConfig.name}`
      : siteConfig.name;
    document.title = fullTitle;

    const ensureMeta = (selector, attributes) => {
      let node = document.head.querySelector(selector);
      if (!node) {
        node = document.createElement("meta");
        document.head.appendChild(node);
      }
      Object.entries(attributes).forEach(([key, value]) => {
        node.setAttribute(key, value);
      });
    };

    ensureMeta('meta[name="description"]', {
      name: "description",
      content: description,
    });
    ensureMeta('meta[property="og:title"]', {
      property: "og:title",
      content: fullTitle,
    });
    ensureMeta('meta[property="og:description"]', {
      property: "og:description",
      content: description,
    });
    ensureMeta('meta[property="og:type"]', {
      property: "og:type",
      content: "website",
    });
    ensureMeta('meta[property="og:url"]', {
      property: "og:url",
      content: `${siteConfig.url}${path}`,
    });
    ensureMeta('meta[name="twitter:card"]', {
      name: "twitter:card",
      content: "summary_large_image",
    });
  }, [title, description, path]);

  return null;
}

export default Seo;
