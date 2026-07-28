import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";

const values = [
  {
    title: "Student-centered learning",
    copy: "We put student goals first — with advising, flexible formats, and faculty who teach for real careers.",
  },
  {
    title: "Career & transfer mobility",
    copy: "Associate degrees, certificates, and workforce training that open doors across northern New England.",
  },
  {
    title: "Community partnership",
    copy: "We strengthen the North Country by working with employers, schools, and regional organizations.",
  },
  {
    title: "Access & opportunity",
    copy: "Berlin, Littleton, and online options help more people start or return to college close to home.",
  },
];

function About() {
  return (
    <>
      <PageHero
        brand="About White Mountains"
        title="Opportunity rooted in the North Country."
        copy="White Mountains Community College is a comprehensive, student-centered institution providing educational and career mobility while sustaining community development across northern New Hampshire."
        image="/images/mountains.jpg"
        actions={[
          {
            label: "Explore Programs",
            to: "/academics",
            className: "btn btn-gold",
          },
          {
            label: "Visit Campus",
            to: "/admissions/visit",
            className: "btn btn-ghost-light",
          },
        ]}
      />

      <section className="section">
        <div className="container mission-grid">
          <article>
            <p className="eyebrow">Mission</p>
            <h2>
              A student-centered college that opens pathways for education,
              careers, and community growth.
            </h2>
          </article>
          <article>
            <p className="eyebrow">Where we serve</p>
            <p>
              From our main campus in Berlin and Academic Center in Littleton —
              with online, hybrid, day, and evening options — WMCC brings
              affordable higher education to the White Mountains region.
            </p>
          </article>
        </div>
      </section>

      <section className="section section-tint">
        <div className="container">
          <div className="section-intro">
            <p className="eyebrow">Core values</p>
            <h2>What guides our work every day.</h2>
          </div>
          <div className="area-grid">
            {values.map((value) => (
              <article key={value.title} className="area-item">
                <h3>{value.title}</h3>
                <p>{value.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <figure className="split-media">
            <img
              src="/images/littleton.jpg"
              alt="Learning spaces at White Mountains Community College"
            />
          </figure>
          <div className="split-copy">
            <p className="eyebrow">Campus life</p>
            <h2>Two locations. One college community.</h2>
            <p>
              The Berlin campus anchors hands-on programs in trades, culinary,
              healthcare, and more. The Littleton Academic Center expands access
              for students across the North Country with flexible course formats.
            </p>
            <ul className="check-list">
              <li>NECHE-accredited public community college</li>
              <li>Career labs and classroom learning side by side</li>
              <li>Student support, advising, and transfer coaching</li>
              <li>Workforce partnerships with regional employers</li>
            </ul>
            <Link className="text-link" to="/contact">
              Get directions
            </Link>
          </div>
        </div>
      </section>

      <section className="section cta-band">
        <div className="container cta-inner">
          <div>
            <p className="eyebrow light">Join the community</p>
            <h2>See yourself at WMCC.</h2>
            <p>
              Tour campus, meet faculty, and learn how White Mountains Community
              College can fit your life and ambitions.
            </p>
          </div>
          <div className="cta-actions">
            <Link className="btn btn-gold" to="/admissions">
              Start Your Application
            </Link>
            <Link className="btn btn-ghost-light" to="/contact">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
