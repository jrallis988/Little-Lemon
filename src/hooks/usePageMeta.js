import { useEffect } from "react";

const SITE = "NHTI – Concord's Community College";
const DEFAULT_OG_IMAGE = "/media/og-share.jpg";

export default function usePageMeta({ title, description, image }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE}` : SITE;
    document.title = fullTitle;

    const ensureMeta = (selector, attributes) => {
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
    };

    if (description) {
      ensureMeta('meta[name="description"]', {
        name: "description",
        content: description,
      });
      ensureMeta('meta[property="og:description"]', {
        property: "og:description",
        content: description,
      });
      ensureMeta('meta[name="twitter:description"]', {
        name: "twitter:description",
        content: description,
      });
    }

    ensureMeta('meta[property="og:title"]', {
      property: "og:title",
      content: fullTitle,
    });
    ensureMeta('meta[property="og:type"]', {
      property: "og:type",
      content: "website",
    });
    ensureMeta('meta[property="og:site_name"]', {
      property: "og:site_name",
      content: SITE,
    });

    const imagePath = image || DEFAULT_OG_IMAGE;
    const absoluteImage = imagePath.startsWith("http")
      ? imagePath
      : `${window.location.origin}${imagePath}`;

    ensureMeta('meta[property="og:image"]', {
      property: "og:image",
      content: absoluteImage,
    });
    ensureMeta('meta[name="twitter:card"]', {
      name: "twitter:card",
      content: "summary_large_image",
    });
    ensureMeta('meta[name="twitter:title"]', {
      name: "twitter:title",
      content: fullTitle,
    });
    ensureMeta('meta[name="twitter:image"]', {
      name: "twitter:image",
      content: absoluteImage,
    });
  }, [title, description, image]);
}
