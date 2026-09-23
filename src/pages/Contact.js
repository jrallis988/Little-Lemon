import usePageMeta from "../hooks/usePageMeta";
import { VIRTUAL_TOUR } from "../data/campus";

function Contact() {
  usePageMeta({
    title: "Contact",
    description:
      "Contact NHTI – Concord's Community College admissions, departments, and campus offices.",
  });

  return (
    <>
      <section className="page-hero">
        <p className="eyebrow">Contact</p>
        <h1>We’re here to help</h1>
        <p className="page-hero__lede">
          Reach Admissions, departments, and campus offices — or explore NHTI
          from anywhere with the virtual tour.
        </p>
      </section>

      <section className="section">
        <div className="highlight-grid">
          <article className="highlight-card">
            <h2>Main campus</h2>
            <p>
              31 College Drive
              <br />
              Concord, NH 03301
            </p>
            <p>
              <a href="tel:6032304001">603-230-4001</a>
            </p>
          </article>
          <article className="highlight-card">
            <h2>Admissions</h2>
            <p>
              Questions about applying, visiting, or choosing a program.
            </p>
            <p>
              <a href="tel:6032304011">603-230-4011</a>
              <br />
              <a href="mailto:NHTIadmissions@ccsnh.edu">
                NHTIadmissions@ccsnh.edu
              </a>
            </p>
          </article>
          <article className="highlight-card">
            <h2>Take a Virtual Tour</h2>
            <p>
              Walk the riverside campus online — academic buildings, residence
              halls, and student spaces.
            </p>
            <a
              className="text-link"
              href={VIRTUAL_TOUR}
              target="_blank"
              rel="noreferrer"
            >
              Launch virtual tour
            </a>
          </article>
        </div>
      </section>

      <section className="section section--muted">
        <div className="news-head">
          <h2>More ways to connect</h2>
        </div>
        <ul className="checklist">
          <li>
            <a
              href="https://www.nhti.edu/contact-us/departments/"
              target="_blank"
              rel="noreferrer"
            >
              Departments directory
            </a>
          </li>
          <li>
            <a
              href="https://www.nhti.edu/directory/"
              target="_blank"
              rel="noreferrer"
            >
              Faculty &amp; staff directory
            </a>
          </li>
          <li>
            <a
              href="https://www.nhti.edu/contact-us/"
              target="_blank"
              rel="noreferrer"
            >
              Official contact page
            </a>
          </li>
        </ul>
      </section>
    </>
  );
}

export default Contact;
