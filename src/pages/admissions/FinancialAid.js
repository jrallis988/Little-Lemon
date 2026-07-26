import { Link } from "react-router-dom";
import PageHero from "../../components/PageHero";
import SectionNav from "../../components/SectionNav";
import { admissionsNav } from "./admissionsNav";

function FinancialAid() {
  return (
    <>
      <PageHero
        brand="Admissions & Aid"
        title="Financial aid"
        copy="Many WMCC students receive financial aid. Start with the FAFSA and let our team guide the next steps."
        image="/images/campus-lobby.jpg"
      />
      <SectionNav label="Admissions section" items={admissionsNav} />

      <section className="section">
        <div className="container split">
          <div className="split-copy">
            <p className="eyebrow">Get started</p>
            <h2>Complete the FAFSA</h2>
            <ol className="numbered-list">
              <li>Create an FSA ID at StudentAid.gov.</li>
              <li>
                Log in and complete the Free Application for Federal Student Aid.
              </li>
              <li>
                Use White Mountains Community College school code{" "}
                <strong>005291</strong>.
              </li>
              <li>
                Watch for follow-up from the Financial Aid Office about
                verification or your aid offer.
              </li>
            </ol>
            <p>
              Aid may include grants (do not need to be repaid), loans (must be
              repaid), scholarships, and Federal Work-Study.
            </p>
          </div>
          <div className="info-panel">
            <h3>Financial Aid Office</h3>
            <p>Berlin Campus · Welcome Center</p>
            <ul>
              <li>
                <a href="tel:6037521113">(603) 752-1113</a>
              </li>
              <li>
                <a href="mailto:wmcc@ccsnh.edu">wmcc@ccsnh.edu</a>
              </li>
              <li>School code: 005291</li>
            </ul>
            <a
              className="btn btn-gold"
              href="https://studentaid.gov/h/apply-for-aid/fafsa"
              target="_blank"
              rel="noreferrer"
            >
              Start FAFSA
            </a>
          </div>
        </div>
      </section>

      <section className="section section-tint">
        <div className="container">
          <div className="section-intro">
            <p className="eyebrow">Good to know</p>
            <h2>Key aid reminders</h2>
          </div>
          <div className="area-grid">
            <article className="area-item">
              <h3>File every year</h3>
              <p>
                A new FAFSA is required each academic year. File early to maximize
                consideration for available aid.
              </p>
            </article>
            <article className="area-item">
              <h3>Acceptance required</h3>
              <p>
                You must be accepted into an eligible certificate or degree
                program before financial aid can be awarded.
              </p>
            </article>
            <article className="area-item">
              <h3>Attendance matters</h3>
              <p>
                You must attend class to remain eligible. Schedule changes can
                affect aid — call Financial Aid before adding or dropping.
              </p>
            </article>
            <article className="area-item">
              <h3>Ask for help</h3>
              <p>
                The Financial Aid Office can walk you through verification, award
                letters, and next steps after you file.
              </p>
            </article>
          </div>
          <div className="section-cta">
            <Link className="btn btn-navy" to="/admissions/tuition">
              View Tuition Rates
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default FinancialAid;
