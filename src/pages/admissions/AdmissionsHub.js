import { Link } from "react-router-dom";
import PageHero from "../../components/PageHero";
import SectionNav from "../../components/SectionNav";
import { admissionsNav } from "./admissionsNav";

const paths = [
  {
    title: "Begin the Process",
    copy: "Start exploring programs, visits, and your path to enrollment.",
    to: "/admissions/begin",
  },
  {
    title: "How to Apply",
    copy: "Step-by-step guidance for first-time, transfer, military, and international students.",
    to: "/admissions/how-to-apply",
  },
  {
    title: "Visit Campus",
    copy: "Tours, Open Houses, Express Admissions Days, and program info sessions.",
    to: "/admissions/visit",
  },
  {
    title: "Next Steps",
    copy: "Accepted students: placement, advising, aid, and registration.",
    to: "/admissions/next-steps",
  },
  {
    title: "Tuition & Fees",
    copy: "2026–2027 per-credit rates, residency categories, and cost comparisons.",
    to: "/admissions/tuition",
  },
  {
    title: "Scholarships & Aid",
    copy: "FAFSA, scholarships, grants, loans, and work-study options.",
    to: "/admissions/scholarships",
  },
];

function AdmissionsHub() {
  return (
    <>
      <PageHero
        brand="Admissions & Aid"
        title="Begin the process."
        copy="Whether you’re starting college for the first time, returning to finish, transferring credits, or preparing for a new career — Great Bay can help you take the next step."
        image="/images/campus-lobby.jpg"
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
                <Link className="text-link" to={item.to}>Explore</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-tint">
        <div className="container split">
          <div className="split-copy">
            <p className="eyebrow">Why Great Bay</p>
            <h2>Affordable, flexible, and built around your goals.</h2>
            <ul className="check-list">
              <li>Career-focused programs designed with employers</li>
              <li>Short-term training in healthcare and culinary arts</li>
              <li>Online, hybrid, evening, and daytime options</li>
              <li>Transfer pathways to UNH and colleges across New England</li>
              <li>No application fee for most students</li>
            </ul>
            <Link className="btn btn-navy" to="/admissions/how-to-apply">Start Your Application</Link>
          </div>
          <div className="info-panel">
            <h3>Talk with Admissions</h3>
            <p>
              An admissions counselor can help you explore programs, compare
              pathways, understand costs, and map next steps.
            </p>
            <ul>
              <li><a href="tel:6034277632">(603) 427-7632</a></li>
              <li><a href="mailto:greatbayadmissions@ccsnh.edu">greatbayadmissions@ccsnh.edu</a></li>
            </ul>
            <div className="cta-actions stacked-mobile">
              <Link className="btn btn-gold" to="/admissions/visit">Plan a Visit</Link>
              <Link className="btn btn-ghost" to="/directory">Faculty/Staff Directory</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AdmissionsHub;
