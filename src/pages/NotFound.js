import { Link } from "react-router-dom";
import usePageMeta from "../hooks/usePageMeta";

function NotFound() {
  usePageMeta({
    title: "Page not found",
    description:
      "That page isn’t on the NHTI site. Browse programs, admissions, or return home.",
  });

  return (
    <>
      <section className="page-hero">
        <p className="eyebrow">404</p>
        <h1>Page not found</h1>
        <p className="page-hero__lede">
          That URL doesn&apos;t match a page on this NHTI site. Try one of the
          shortcuts below or search programs from the header.
        </p>
        <div className="hero__actions">
          <Link to="/" className="btn btn--solid">
            Back to home
          </Link>
          <Link to="/academics" className="btn btn--ghost-dark">
            Browse programs
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="section-intro">
          <h2>Helpful next steps</h2>
          <p>These cover the most common destinations for prospective students.</p>
        </div>
        <div className="highlight-grid">
          <article className="highlight-card">
            <h3>Academics</h3>
            <p>Search 82+ degrees and certificates built for work and transfer.</p>
            <Link className="text-link" to="/academics">
              Explore programs
            </Link>
          </article>
          <article className="highlight-card">
            <h3>Admissions</h3>
            <p>Learn how to apply, request info, or plan a campus visit.</p>
            <Link className="text-link" to="/admissions">
              Start admissions
            </Link>
          </article>
          <article className="highlight-card">
            <h3>Campus life</h3>
            <p>Residence halls, Lynx athletics, and student community on the Merrimack.</p>
            <Link className="text-link" to="/campus">
              See campus life
            </Link>
          </article>
          <article className="highlight-card">
            <h3>Contact</h3>
            <p>Reach Admissions, departments, and campus offices.</p>
            <Link className="text-link" to="/contact">
              Get in touch
            </Link>
          </article>
        </div>
      </section>
    </>
  );
}

export default NotFound;
