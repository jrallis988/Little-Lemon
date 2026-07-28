import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import { REQUEST_INFO_URL } from "../data/links";

function NotFound({
  title = "Page not found",
  copy = "That URL doesn’t match a page on this White Mountains Community College site. Try one of the links below or search our programs.",
}) {
  return (
    <>
      <PageHero
        brand="404"
        title={title}
        copy={copy}
        image="/images/mountains.jpg"
        compact
        actions={[
          {
            label: "Back to Home",
            to: "/",
            className: "btn btn-gold",
          },
          {
            label: "Browse Programs",
            to: "/academics",
            className: "btn btn-ghost-light",
          },
        ]}
      />

      <section className="section">
        <div className="container not-found-panel">
          <div className="section-intro">
            <p className="eyebrow">Helpful next steps</p>
            <h2>Let’s get you back on path.</h2>
            <p>
              Looking for a specific major, campus, or admissions step? These
              shortcuts cover the most common destinations.
            </p>
          </div>

          <div className="area-grid">
            <article className="area-item">
              <h3>Academic programs</h3>
              <p>
                Search degrees and certificates across Berlin, Littleton, North
                Conway, and online.
              </p>
              <Link className="text-link" to="/academics">
                Explore programs
              </Link>
            </article>
            <article className="area-item">
              <h3>Search by focus area</h3>
              <p>
                Jump straight into health sciences, trades, culinary, business,
                or STEM pathways.
              </p>
              <Link
                className="text-link"
                to="/academics?category=health-sciences-and-services"
              >
                Search health sciences
              </Link>
            </article>
            <article className="area-item">
              <h3>Admissions</h3>
              <p>
                Learn how to apply, visit campus, or review tuition and financial
                aid.
              </p>
              <Link className="text-link" to="/admissions">
                Start admissions
              </Link>
            </article>
            <article className="area-item">
              <h3>Request information</h3>
              <p>
                Ask Admissions a question through WMCC’s official inquiry form.
              </p>
              <a
                className="text-link"
                href={REQUEST_INFO_URL}
                target="_blank"
                rel="noreferrer"
              >
                Open request form
              </a>
            </article>
          </div>

          <div className="section-cta cta-actions">
            <Link className="btn btn-primary" to="/">
              Homepage
            </Link>
            <Link className="btn btn-gold" to="/academics">
              Academic Programs
            </Link>
            <Link className="btn btn-primary" to="/contact">
              Locations &amp; Contact
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default NotFound;
