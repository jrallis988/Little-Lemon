import { Link } from "react-router-dom";
import { aidChecklist } from "../data/content";
import usePageMeta from "../hooks/usePageMeta";

const topics = [
  {
    title: "Tuition rates",
    text: "Review in-state, New England regional, and out-of-state rates before you register.",
    href: "https://www.nhti.edu/financial-aid/tuition-rates/",
  },
  {
    title: "FAFSA & aid office",
    text: "Complete the FAFSA and connect with Financial Aid for grants, loans, and work-study.",
    href: "https://www.nhti.edu/financial-aid/",
  },
  {
    title: "Scholarships & grants",
    text: "Explore institutional and community scholarships that can lower your out-of-pocket cost.",
    href: "https://www.nhti.edu/financial-aid/scholarship-grants/",
  },
  {
    title: "Bursar’s Office",
    text: "Questions about billing, payment plans, and refunds go through the Bursar’s Office.",
    href: "https://lynx.nhti.edu/financial-aid/bursar/",
  },
];

function FinancialAid() {
  usePageMeta({
    title: "Financial Aid",
    description:
      "Tuition, FAFSA, scholarships, and billing help at NHTI – Concord's Community College.",
  });

  return (
    <>
      <section className="page-hero">
        <p className="eyebrow">Financial aid</p>
        <h1>Make college affordable</h1>
        <p className="page-hero__lede">
          Grants, scholarships, work-study, and clear tuition information — so
          cost doesn&apos;t block your next step.
        </p>
      </section>

      <section className="section">
        <div className="highlight-grid">
          {topics.map((topic) => (
            <article key={topic.title} className="highlight-card">
              <h2>{topic.title}</h2>
              <p>{topic.text}</p>
              <a
                className="text-link"
                href={topic.href}
                target="_blank"
                rel="noreferrer"
              >
                Learn more
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--muted">
        <div className="news-head">
          <h2>Getting started checklist</h2>
        </div>
        <ul className="checklist">
          {aidChecklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="hero__actions" style={{ marginTop: "1.5rem" }}>
          <Link to="/admissions" className="btn btn--solid">
            Talk with Admissions
          </Link>
          <a
            className="btn btn--ghost-dark"
            href="https://www.nhti.edu/financial-aid/"
            target="_blank"
            rel="noreferrer"
          >
            Official aid site
          </a>
        </div>
      </section>
    </>
  );
}

export default FinancialAid;
