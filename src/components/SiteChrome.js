import { useEffect, useRef } from "react";
import Nav from "./Nav";
import BookingBar from "./BookingBar";

/** Fixed top stack: nav + booking bar. Sets --chrome-h for page offset. */
export default function SiteChrome() {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const sync = () => {
      document.documentElement.style.setProperty(
        "--chrome-h",
        `${node.offsetHeight}px`
      );
    };

    sync();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", sync);
      return () => window.removeEventListener("resize", sync);
    }

    const observer = new ResizeObserver(sync);
    observer.observe(node);
    window.addEventListener("resize", sync);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", sync);
    };
  }, []);

  return (
    <div className="site-chrome" ref={ref}>
      <Nav />
      <BookingBar />
    </div>
  );
}
