import { Link } from "react-router-dom";

const values = [
  {
    title: "Success for Our Students",
    copy: "We commit to the highest academic and professional standards so every student can thrive.",
  },
  {
    title: "Teaching Excellence",
    copy: "Rigorous, relevant learning that fosters personal and intellectual growth for meaningful careers.",
  },
  {
    title: "Community Engagement",
    copy: "We improve as a college by partnering with the broader Seacoast community we serve.",
  },
  {
    title: "Diversity",
    copy: "We recognize and value diversity in its many forms as the richness of the human experience.",
  },
];

function About() {
  return (
    <>
      <section className="page-hero">
        <div className="page-hero-media" aria-hidden="true">
          <img src="/images/campus-exterior.jpg" alt="" />
          <div className="hero-veil" />
        </div>
        <div className="container page-hero-content">
          <p className="hero-brand">About Great Bay</p>
          <h1>Eighty years of opportunity on the Seacoast.</h1>
          <p>
            Great Bay Community College expands intellectual and economic
            opportunity by providing affordable higher education in an
            environment that embodies excellence, innovation, and collaboration.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container mission-grid">
          <article>
            <p className="eyebrow">Mission</p>
            <h2>
              Affordable higher education that opens doors — in the classroom
              and beyond.
            </h2>
          </article>
          <article>
            <p className="eyebrow">Vision</p>
            <p>
              Great Bay Community College will emphasize student learning and
              support, and nurture an innovative spirit to be a leading academic
              institution in New England.
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
              src="/images/science-lab.jpg"
              alt="Hands-on learning in Great Bay lab facilities"
            />
          </figure>
          <div className="split-copy">
            <p className="eyebrow">Campus life</p>
            <h2>A modern campus built for learning and belonging.</h2>
            <p>
              Our Portsmouth campus includes designated lab spaces for life
              sciences, nursing, veterinary technology, computer technology,
              surgical technology, and information systems — plus classrooms,
              study spaces, dining, and an art gallery.
            </p>
            <ul className="check-list">
              <li>Athletics in the Yankee Small College Conference</li>
              <li>Clubs, leadership development, and student organizations</li>
              <li>Wellness and mental wellbeing resources</li>
              <li>Welcome Center for one-stop student services</li>
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
            <h2>See yourself at Great Bay.</h2>
            <p>
              Tour campus, meet faculty, and learn how GBCC can fit your life
              and ambitions.
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
