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
        copy="Most full-time Great Bay students receive financial aid. Start with the FAFSA and let our Welcome Center team guide the next steps."
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
              <li>Log in and complete the Free Application for Federal Student Aid.</li>
              <li>
                Use Great Bay Community College school code{" "}
                <strong>002583</strong>.
              </li>
              <li>
                Watch for follow-up from the Financial Aid Office about
                verification or your aid offer.
              </li>
            </ol>
            <p>
              Aid may include grants (do not need to be repaid), loans (must be
              repaid), and Federal Work-Study.
            </p>
          </div>
          <div className="info-panel">
            <h3>Financial Aid Office</h3>
            <p>Welcome Center · First floor, Portsmouth campus</p>
            <ul>
              <li>Monday–Friday, 8:00 AM – 4:00 PM</li>
              <li>
                <a href="tel:6034277600">(603) 427-7600 ext. 7501</a>
              </li>
              <li>
                <a href="mailto:greatbayfinancialaid@ccsnh.edu">
                  greatbayfinancialaid@ccsnh.edu
                </a>
              </li>
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
                A new FAFSA is required each academic year. For Fall 2026,
                target filing by June 1, 2026 when possible.
              </p>
            </article>
            <article className="area-item">
              <h3>Accept your offer in SIS</h3>
              <p>
                Review your aid offer carefully, then accept or decline awards
                in the Student Information System.
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
              <h3>Books &amp; refunds</h3>
              <p>
                Eligible students may use aid for bookstore purchases and
                receive refunds when aid exceeds charges.
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
