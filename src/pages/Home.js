import { Link } from "react-router-dom";
import { highlights, programAreas } from "../data/programs";

function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-media" aria-hidden="true">
          <img
            src="/images/campus-exterior.jpg"
            alt=""
            className="hero-image"
          />
          <div className="hero-veil" />
        </div>
        <div className="hero-content">
          <p className="hero-brand animate-rise">Great Bay Community College</p>
          <h1 className="animate-rise delay-1">
            Start here.
            <span>Go further.</span>
          </h1>
          <p className="hero-copy animate-rise delay-2">
            Affordable degrees, certificates, and career training on New
            Hampshire&apos;s Seacoast — with the support to finish strong.
          </p>
          <div className="hero-actions animate-rise delay-3">
            <Link className="btn btn-gold" to="/admissions">
              Begin the Process
            </Link>
            <Link className="btn btn-ghost" to="/academics">
              Explore Programs
            </Link>
          </div>
        </div>
      </section>

      <section className="section stats-band">
        <div className="container stats-grid">
          {highlights.map((item) => (
            <div key={item.label} className="stat">
              <p className="stat-value">{item.value}</p>
              <p className="stat-label">{item.label}</p>
              <p className="stat-detail">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div className="split-copy">
            <p className="eyebrow">What sets Great Bay apart</p>
            <h2>Excellence, support, and a clear path forward.</h2>
            <p>
              Over fifty degree and certificate programs in healthcare,
              business, STEM, and liberal arts — taught by credentialed faculty
              with deep industry experience.
            </p>
            <ul className="check-list">
              <li>One-on-one advising through CAPS academic support</li>
              <li>Transfer pathways, including to the University of New Hampshire</li>
              <li>Short-term training that moves you from classroom to career</li>
              <li>State-of-the-art labs for nursing, veterinary tech, and life sciences</li>
            </ul>
            <Link className="text-link" to="/about">
              Discover GBCC
            </Link>
          </div>
          <figure className="split-media">
            <img src="/images/science-lab.jpg" alt="Students working in a Great Bay science lab" />
          </figure>
        </div>
      </section>

      <section className="section section-tint">
        <div className="container">
          <div className="section-intro">
            <p className="eyebrow">Academics</p>
            <h2>Find a program that fits your goals.</h2>
            <p>
              Whether you&apos;re launching a career, transferring to a four-year
              school, or building new skills, Great Bay has a pathway for you.
            </p>
          </div>
          <div className="area-grid">
            {programAreas.slice(0, 4).map((area) => (
              <article key={area.id} className="area-item">
                <h3>{area.title}</h3>
                <p>{area.description}</p>
              </article>
            ))}
          </div>
          <div className="section-cta">
            <Link className="btn btn-navy" to="/academics">
              View All Programs
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container quote-block">
          <blockquote>
            <p>
              &ldquo;If I could identify one thing that made a difference, it
              would be Great Bay. I talk all the time about how much Great Bay
              changed my life and gave me a huge foundation.&rdquo;
            </p>
            <footer>
              <cite>John Woelflein</cite>
              <span>GBCC Alum · Harvard University Graduate</span>
            </footer>
          </blockquote>
          <figure>
            <img
              src="/images/graduation.jpg"
              alt="Great Bay Community College graduate at commencement"
            />
          </figure>
        </div>
      </section>

      <section className="section cta-band">
        <div className="container cta-inner">
          <div>
            <p className="eyebrow light">Fall enrollment</p>
            <h2>Ready to take the next step?</h2>
            <p>
              Rolling admissions for most programs. Speak with an admissions
              counselor, tour campus, or apply today.
            </p>
          </div>
          <div className="cta-actions">
            <Link className="btn btn-gold" to="/admissions">
              Apply Now
            </Link>
            <Link className="btn btn-ghost-light" to="/contact">
              Request Info
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
