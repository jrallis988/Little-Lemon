import { Link } from "react-router-dom";
import usePageMeta from "../hooks/usePageMeta";

const pathways = [
  {
    title: "Short-term trainings",
    text: "Fast, focused credentials that help you enter or advance in New Hampshire’s workforce.",
    href: "https://www.nhti.edu/workforce/",
  },
  {
    title: "Online career trainings",
    text: "Flexible online programs designed around working adults and busy schedules.",
    href: "https://www.nhti.edu/workforce/career-training-programs/",
  },
  {
    title: "Healthcare trainings",
    text: "Clinical and allied-health pathways that connect directly to employer demand.",
    href: "https://www.nhti.edu/workforce/healthcare-training-programs/",
  },
  {
    title: "Corporate & customized",
    text: "Employer partnerships and tailored training for teams across the region.",
    href: "https://www.nhti.edu/workforce/corporate-and-customized-training/",
  },
  {
    title: "Education trainings",
    text: "Professional development for educators and those entering the classroom.",
    href: "https://www.nhti.edu/workforce/education-training-programs/",
  },
  {
    title: "WorkReadyNH",
    text: "Tuition-free soft-skills training that helps job seekers stand out to employers.",
    href: "https://www.nhti.edu/workforce-development/workreadynh-program/",
  },
];

function Workforce() {
  usePageMeta({
    title: "Workforce Education",
    description:
      "Short-term, online, healthcare, and corporate workforce training at NHTI – Concord's Community College.",
  });

  return (
    <>
      <section className="page-hero">
        <p className="eyebrow">Workforce education</p>
        <h1>Train for the job New Hampshire needs</h1>
        <p className="page-hero__lede">
          Short-term certificates, online career programs, and employer-focused
          training — built for adults who need results fast.
        </p>
      </section>

      <section className="section">
        <div className="highlight-grid">
          {pathways.map((item) => (
            <article key={item.title} className="highlight-card">
              <h2>{item.title}</h2>
              <p>{item.text}</p>
              <a
                className="text-link"
                href={item.href}
                target="_blank"
                rel="noreferrer"
              >
                Explore
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="cta-band cta-band--compact">
        <div className="cta-band__inner">
          <h2>Looking for a full degree instead?</h2>
          <p>
            Browse credit programs in healthcare, IT, engineering, business, and
            more — then apply with a $0 application fee.
          </p>
          <div className="hero__actions">
            <Link to="/academics" className="btn btn--solid">
              Academics
            </Link>
            <Link to="/admissions" className="btn btn--ghost">
              Apply now
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Workforce;
