import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import Seo from "../components/Seo";

function Accessibility() {
  return (
    <>
      <Seo
        title="Accessibility"
        description="Great Bay Community College accessibility commitment, accommodations, and how to request support."
        path="/accessibility"
      />
      <PageHero
        brand="Campus"
        title="Accessibility commitment"
        copy="Great Bay is committed to an inclusive digital and campus experience for students, employees, and visitors."
        image="/images/campus-lobby.jpg"
        compact
        priority
      />

      <section className="section">
        <div className="container article-layout">
          <article className="article-main">
            <h2>Our standard</h2>
            <p>
              This website targets WCAG 2.2 AA practices: semantic landmarks, keyboard
              access, visible focus states, descriptive labels, and reduced-motion support.
            </p>
            <ul className="check-list">
              <li>Skip-to-content link on every page</li>
              <li>Keyboard-accessible navigation and forms</li>
              <li>Text alternatives for meaningful imagery</li>
              <li>Color contrast aligned to navy/gold branding</li>
            </ul>

            <h2>Request accommodations</h2>
            <p>
              Students seeking academic accommodations should contact Accessibility Services
              early so supports are ready before the term begins.
            </p>
            <div className="article-actions">
              <Link className="btn btn-gold" to="/academics/support/accessibility">
                Accessibility Services
              </Link>
              <Link className="btn btn-navy" to="/contact">
                Report a barrier
              </Link>
            </div>
          </article>
          <aside className="article-aside content-page-card">
            <h3>Feedback welcome</h3>
            <p>
              If you find content that is difficult to use with assistive technology,
              tell us so we can fix it quickly.
            </p>
            <a className="text-link" href="mailto:askgreatbay@ccsnh.edu">
              askgreatbay@ccsnh.edu
            </a>
          </aside>
        </div>
      </section>
    </>
  );
}

export default Accessibility;
