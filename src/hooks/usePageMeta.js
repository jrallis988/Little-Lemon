import { useEffect } from "react";

const SITE = "NHTI – Concord's Community College";

export default function usePageMeta({ title, description }) {
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
    }

    ensureMeta('meta[property="og:title"]', {
      property: "og:title",
      content: fullTitle,
    });
  }, [title, description]);
}
