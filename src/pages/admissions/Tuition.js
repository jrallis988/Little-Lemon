import { Link } from "react-router-dom";
import PageHero from "../../components/PageHero";
import SectionNav from "../../components/SectionNav";
import { tuitionRates } from "../../data/siteContent";
import { admissionsNav } from "./admissionsNav";

function Tuition() {
  return (
    <>
      <PageHero
        brand="Admissions & Aid"
        title="Tuition & fees"
        copy="Great Bay provides a quality education at an affordable price. Rates below are for the 2026–2027 academic year, effective Fall 2026."
        image="/images/graduation.jpg"
      />
      <SectionNav label="Admissions section" items={admissionsNav} />

      <section className="section">
        <div className="container">
          <div className="section-intro">
            <p className="eyebrow">Per-credit rates</p>
            <h2>Transparent pricing by residency.</h2>
            <p>
              All courses include a comprehensive fee of <strong>$25 per credit</strong>{" "}
              in addition to the tuition rate. Evening and fully online classes
              are offered at the in-state rate regardless of residency.
            </p>
          </div>

          <div className="rate-table" role="table" aria-label="Tuition rates">
            <div className="rate-row rate-head" role="row">
              <span role="columnheader">Residency</span>
              <span role="columnheader">Per credit tuition</span>
            </div>
            {tuitionRates.map((row) => (
              <div className="rate-row" role="row" key={row.residency}>
                <span role="cell">{row.residency}</span>
                <span role="cell">{row.rate}</span>
              </div>
            ))}
          </div>

          <p className="fine-print">
            Tuition rates are set by the CCSNH Board of Trustees and are subject
            to change without notice. New England Regional rates require
            admission into a degree or certificate program.
          </p>
        </div>
      </section>

      <section className="section section-tint">
        <div className="container support-grid">
          <div>
            <h2>Who qualifies for in-state tuition?</h2>
            <ul className="check-list">
              <li>New Hampshire residents</li>
              <li>
                Students in degree/certificate programs living within 50 miles of
                a GBCC campus
              </li>
              <li>Eligible military members, veterans, and covered family members</li>
              <li>
                New England Regional applicants from CT, MA, ME, RI, or VT who
                meet program requirements
              </li>
            </ul>
          </div>
          <div>
            <h2>Save thousands</h2>
            <p>
              Full-time NH resident tuition and fees at Great Bay are a fraction
              of many four-year colleges — roughly <strong>$6,120</strong> per
              academic year in recent comparative figures, before aid.
            </p>
            <Link className="btn btn-navy" to="/admissions/financial-aid">
              Explore Financial Aid
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Tuition;
