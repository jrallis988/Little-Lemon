import { Link } from "react-router-dom";
import PageHero from "../../components/PageHero";
import SectionNav from "../../components/SectionNav";
import { admissionsSteps } from "../../data/siteContent";
import { admissionsNav } from "./admissionsNav";

function HowToApply() {
  return (
    <>
      <PageHero
        brand="Admissions & Aid"
        title="How to apply"
        copy="Applying is straightforward — whether you are a first-time college student, a transfer student, or someone who just wants to take a course or two."
        image="/images/students.jpg"
      />
      <SectionNav label="Admissions section" items={admissionsNav} />

      <section className="section">
        <div className="container">
          <ol className="content-steps">
            {admissionsSteps.map((step, index) => (
              <li key={step.title}>
                <span className="step-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2>{step.title}</h2>
                  <p>{step.copy}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section-tint">
        <div className="container support-grid">
          <div>
            <h2>Special applicant pathways</h2>
            <p>
              GBCC welcomes military/veteran students, international applicants,
              and non-degree students taking individual courses.
            </p>
          </div>
          <ul className="support-list">
            <li>
              <strong>Non-degree students</strong>
              <span>
                No admission application needed for individual courses. Contact
                Advising at (603) 427-7728. Not eligible for financial aid.
              </span>
            </li>
            <li>
              <strong>Military &amp; veterans</strong>
              <span>
                Admissions helps active, veteran, retired service members and
                military families navigate benefits and next steps.
              </span>
            </li>
            <li>
              <strong>International students</strong>
              <span>
                Additional requirements include application fee, English
                proficiency, translated transcripts, and financial documentation.
              </span>
            </li>
            <li>
              <strong>Transcripts</strong>
              <span>
                Mail or email to Great Bay Community College, 320 Corporate
                Drive, Portsmouth, NH 03801 · greatbayadmissions@ccsnh.edu
              </span>
            </li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container callout-row">
          <div>
            <h2>Ready to move forward?</h2>
            <p>
              Explore programs, plan a visit, or start your FAFSA with school
              code <strong>002583</strong>.
            </p>
          </div>
          <div className="cta-actions">
            <Link className="btn btn-gold" to="/academics">
              Browse Programs
            </Link>
            <Link className="btn btn-navy" to="/admissions/financial-aid">
              Financial Aid
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default HowToApply;
