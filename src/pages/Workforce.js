import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import SectionNav from "../components/SectionNav";
import { workforceSectionNav } from "../data/navigation";
import { workforceTracks } from "../data/siteContent";

const workforceLinks = {
  "Short-Term Healthcare Training": "/workforce/healthcare",
  "Culinary Arts & Sustainable Foodways": "/workforce/culinary",
  "Professional Development": "/workforce/professional-development",
  "Apprenticeships & WorkReadyNH": "/workforce/workready",
  "Corporate & Customized Training": "/workforce/corporate",
  "Police Testing Alliance": "/workforce/police-testing",
};

function Workforce() {
  return (
    <>
      <PageHero
        brand="Workforce Development"
        title="Train for the job. Grow the Seacoast."
        copy="The Business & Training Center is the region’s partner for short-term skills training, apprenticeships, and customized employer programs."
        image="/images/science-lab.jpg"
      />
      <SectionNav label="Workforce" items={workforceSectionNav} />

      <section className="section">
        <div className="container">
          <div className="section-intro">
            <p className="eyebrow">Business &amp; Training Center</p>
            <h2>Affordable, high-quality non-credit pathways.</h2>
            <p>
              Advance personal, organizational, and economic growth through
              programs recognized by the New England Commission of Higher
              Education’s non-credit quality framework.
            </p>
          </div>
          <div className="area-grid">
            {workforceTracks.map((track) => (
              <article key={track.title} className="area-item">
                <h3>{track.title}</h3>
                <p>{track.copy}</p>
                {workforceLinks[track.title] ? (
                  <Link className="text-link" to={workforceLinks[track.title]}>
                    Learn more
                  </Link>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-tint">
        <div className="container split">
          <div className="split-copy">
            <p className="eyebrow">How to register</p>
            <h2>Three easy ways to get started.</h2>
            <ol className="numbered-list">
              <li>Browse the course catalog and register online.</li>
              <li>
                Mail a registration form with payment to the GBCC Business
                Office at 320 Corporate Drive, Portsmouth, NH 03801.
              </li>
              <li>
                Register by phone with a credit card at{" "}
                <a href="tel:6034277653">(603) 427-7653</a>.
              </li>
            </ol>
            <p>
              Scholarships may be available through partners such as the NH
              Charitable Foundation and Bring Back the Trades.
            </p>
          </div>
          <div className="info-panel">
            <h3>Employer partnerships</h3>
            <p>
              We work with hospitals, manufacturers, municipalities, healthcare
              agencies, and Seacoast businesses — including Wentworth-Douglass,
              Exeter Hospital, Sig Sauer, Lonza, and more.
            </p>
            <ul>
              <li>
                <a href="tel:6034277653">(603) 427-7653</a>
              </li>
              <li>
                <a href="mailto:greatbaybtc@ccsnh.edu">greatbaybtc@ccsnh.edu</a>
              </li>
            </ul>
            <Link className="btn btn-gold" to="/contact">
              Request Training Info
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Workforce;
