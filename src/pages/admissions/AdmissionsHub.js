import { Link } from "react-router-dom";
import PageHero from "../../components/PageHero";
import SectionNav from "../../components/SectionNav";
import { admissionsNav } from "./admissionsNav";

const paths = [
  {
    title: "How to Apply",
    copy: "Step-by-step guidance for first-time, transfer, military, and returning students.",
    to: "/admissions/how-to-apply",
  },
  {
    title: "Visit Campus",
    copy: "Tours, Open Houses, Express Admissions Days, and program info sessions.",
    to: "/admissions/visit",
  },
  {
    title: "Tuition & Fees",
    copy: "2025–2026 per-credit rates, residency categories, and cost comparisons.",
    to: "/admissions/tuition",
  },
  {
    title: "Financial Aid",
    copy: "FAFSA steps, school code 005291, grants, loans, and work-study.",
    to: "/admissions/financial-aid",
  },
];

function AdmissionsHub() {
  return (
    <>
      <PageHero
        brand="Admissions & Aid"
        title="Begin the process."
        copy="Whether you’re starting college for the first time, returning to finish, transferring credits, or preparing for a new career — White Mountains Community College can help you take the next step."
        image="/images/campus-lobby.jpg"
        actions={[
          {
            label: "Apply Now",
            to: "/admissions/how-to-apply",
            className: "btn btn-gold",
          },
          {
            label: "Visit Campus",
            to: "/admissions/visit",
            className: "btn btn-ghost-light",
          },
        ]}
      />
      <SectionNav label="Admissions section" items={admissionsNav} />

      <section className="section">
        <div className="container">
          <div className="section-intro">
            <p className="eyebrow">Get started</p>
            <h2>Everything you need to enroll with confidence.</h2>
          </div>
          <div className="area-grid">
            {paths.map((item) => (
              <article key={item.to} className="area-item">
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
                <Link className="text-link" to={item.to}>
                  Explore
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-tint">
        <div className="container split">
          <div className="split-copy">
            <p className="eyebrow">Why WMCC</p>
            <h2>Affordable, flexible, and built around your goals.</h2>
            <ul className="check-list">
              <li>Career-focused programs designed with employers</li>
              <li>Hands-on training in trades, healthcare, and culinary arts</li>
              <li>Online, hybrid, evening, and daytime options</li>
              <li>Berlin campus and Littleton Academic Center access</li>
              <li>Transfer pathways across New England</li>
            </ul>
            <Link className="btn btn-primary" to="/admissions/how-to-apply">
              Start Your Application
            </Link>
          </div>
          <div className="info-panel">
            <h3>Talk with Admissions</h3>
            <p>
              An admissions counselor can help you explore programs, compare
              pathways, understand costs, and map next steps.
            </p>
            <ul>
              <li>
                <a href="tel:6037521113">(603) 752-1113</a>
              </li>
              <li>
                <a href="mailto:wmcc@ccsnh.edu">wmcc@ccsnh.edu</a>
              </li>
            </ul>
            <Link className="btn btn-gold" to="/admissions/visit">
              Plan a Visit
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default AdmissionsHub;
