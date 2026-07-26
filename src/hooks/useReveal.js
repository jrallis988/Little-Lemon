import { useEffect, useRef } from "react";

export default function useReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const targets = Array.from(node.querySelectorAll("[data-reveal]"));

    if (typeof IntersectionObserver === "undefined") {
      targets.forEach((el) => el.classList.add("is-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    );

    targets.forEach((el, index) => {
      el.style.transitionDelay = `${Math.min(index * 0.08, 0.32)}s`;
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return ref;
}
