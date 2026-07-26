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
        copy="White Mountains Community College provides a quality education at an affordable price. Rates below are for the 2025–2026 academic year."
        image="/images/graduation.jpg"
      />
      <SectionNav label="Admissions section" items={admissionsNav} />

      <section className="section">
        <div className="container">
          <div className="section-intro">
            <p className="eyebrow">Per-credit rates</p>
            <h2>Transparent pricing by residency.</h2>
            <p>
              All courses include a comprehensive student service fee of{" "}
              <strong>$20 per credit</strong> in addition to the tuition rate.
              Academic instruction fees may apply for lab and clinical courses.
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
                Eligible border-town students from neighboring Vermont or Maine
                communities within 50 miles of Berlin or Littleton
              </li>
              <li>Eligible military members, veterans, and covered family members</li>
              <li>
                New England Regional applicants who meet program requirements
              </li>
            </ul>
          </div>
          <div>
            <h2>Plan your costs</h2>
            <p>
              Program-specific expenses may include books, tools, uniforms, and
              equipment. Contact the Welcome Center for estimates and next steps.
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
