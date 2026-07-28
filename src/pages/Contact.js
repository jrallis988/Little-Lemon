import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import { campuses, OFFICE_HOURS } from "../data/campuses";
import {
  ADMISSIONS_EMAIL,
  APPLY_URL,
  REQUEST_INFO_URL,
} from "../data/links";

function Contact() {
  return (
    <>
      <PageHero
        brand="Contact"
        title="Hours, directions, and next steps."
        copy="Reach Admissions, plan a visit to Berlin, Littleton, or North Conway, or submit an official request for information."
        image="/images/campus-lobby.jpg"
        compact
        actions={[
          {
            label: "Request Info",
            to: REQUEST_INFO_URL,
            external: true,
            className: "btn btn-gold",
          },
          {
            label: "Apply Now",
            to: APPLY_URL,
            external: true,
            className: "btn btn-ghost-light",
          },
        ]}
      />

      <section className="section">
        <div className="container">
          <div className="section-intro">
            <p className="eyebrow">Campus locations</p>
            <h2>Three North Country locations — plus online options.</h2>
            <p>
              White Mountains Community College serves students from the Berlin
              main campus and academic centers in Littleton and North Conway
              (Mount Washington Valley).
            </p>
          </div>
          <div className="campus-grid">
            {campuses.map((campus) => (
              <article key={campus.id} className="campus-card">
                <p className="campus-role">{campus.role}</p>
                <h3>{campus.name}</h3>
                <address>
                  {campus.addressLines.map((line) => (
                    <span key={line}>
                      {line}
                      <br />
                    </span>
                  ))}
                </address>
                <p>
                  <a href={campus.phoneHref}>{campus.phone}</a>
                </p>
                <p className="campus-hours">
                  <strong>Hours:</strong> {campus.hours}
                </p>
                <p className="campus-note">{campus.hoursNote}</p>
                <p className="campus-directions">{campus.directions}</p>
                <div className="campus-links">
                  <a
                    className="text-link"
                    href={campus.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Get directions
                  </a>
                  <a
                    className="text-link"
                    href={campus.pageUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Location details
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-tint">
        <div className="container contact-grid">
          <div className="contact-details">
            <h2>Office hours</h2>
            <p className="campus-hours">
              <strong>{OFFICE_HOURS}</strong>
            </p>
            <p>
              Hours apply to campus offices. Class, lab, and clinical schedules
              may extend into evenings depending on the program.
            </p>

            <div className="detail-block">
              <h3>Email</h3>
              <p>
                <a href={`mailto:${ADMISSIONS_EMAIL}`}>{ADMISSIONS_EMAIL}</a>
              </p>
            </div>
            <div className="detail-block">
              <h3>Toll-free</h3>
              <p>
                <a href="tel:8004454525">800-445-4525</a>
              </p>
            </div>
            <div className="detail-block">
              <h3>Quick contacts</h3>
              <ul className="check-list">
                <li>
                  Berlin: <a href="tel:6037521113">(603) 752-1113</a>
                </li>
                <li>
                  Littleton: <a href="tel:6034441326">(603) 444-1326</a>
                </li>
                <li>
                  North Conway: <a href="tel:6034473282">(603) 447-3282</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="info-panel">
            <h3>Request information</h3>
            <p>
              Use WMCC’s official inquiry form to ask about programs,
              admissions, financial aid, or campus visits. Submissions go through
              the college’s request-information pipeline — not a simulated local
              form on this site.
            </p>
            <div className="cta-actions stacked">
              <a
                className="btn btn-gold"
                href={REQUEST_INFO_URL}
                target="_blank"
                rel="noreferrer"
              >
                Open Request Info Form
              </a>
              <a
                className="btn btn-ghost"
                href={APPLY_URL}
                target="_blank"
                rel="noreferrer"
              >
                Apply on CCSNH Portal
              </a>
              <a
                className="btn btn-ghost"
                href={`mailto:${ADMISSIONS_EMAIL}`}
              >
                Email {ADMISSIONS_EMAIL}
              </a>
              <Link className="btn btn-ghost" to="/admissions/visit">
                Plan a Campus Visit
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;
