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
        actions={[
          {
            label: "Browse Programs",
            to: "/academics",
            className: "btn btn-gold",
          },
          {
            label: "Financial Aid",
            to: "/admissions/financial-aid",
            className: "btn btn-ghost-light",
          },
        ]}
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
              WMCC welcomes military/veteran students, adult learners, and
              non-degree students taking individual courses.
            </p>
          </div>
          <ul className="support-list">
            <li>
              <strong>Non-degree students</strong>
              <span>
                Individual courses may be available without a full program
                application. Contact Admissions for guidance. Not all options are
                eligible for financial aid.
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
              <strong>Early College</strong>
              <span>
                High school students can get a head start on college credit
                through Early College opportunities.
              </span>
            </li>
            <li>
              <strong>Transcripts</strong>
              <span>
                Mail or email to White Mountains Community College, 2020 Riverside
                Drive, Berlin, NH 03570 · wmcc@ccsnh.edu
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
              code <strong>005291</strong>.
            </p>
          </div>
          <div className="cta-actions">
            <Link className="btn btn-gold" to="/academics">
              Browse Programs
            </Link>
            <Link className="btn btn-primary" to="/admissions/financial-aid">
              Financial Aid
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default HowToApply;
