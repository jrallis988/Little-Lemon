import { Link } from "react-router-dom";
import usePageMeta from "../hooks/usePageMeta";

function NotFound() {
  usePageMeta({
    title: "Page not found",
    description:
      "The page you requested was not found on the NHTI – Concord's Community College website.",
  });

  return (
    <>
      <section className="page-hero">
        <p className="eyebrow">404</p>
        <h1>This page took a wrong turn</h1>
        <p className="page-hero__lede">
          The link may be outdated, or the page moved. Use the shortcuts below
          to get back on track.
        </p>
      </section>

      <section className="section section--tight">
        <div className="not-found-actions">
          <Link to="/" className="btn btn--solid">
            Back to home
          </Link>
          <Link to="/academics" className="btn btn--ghost-dark">
            Browse programs
          </Link>
          <Link to="/admissions" className="btn btn--ghost-dark">
            Apply / request info
          </Link>
          <Link to="/contact" className="btn btn--ghost-dark">
            Contact
          </Link>
        </div>
      </section>
    </>
  );
}

export default NotFound;
