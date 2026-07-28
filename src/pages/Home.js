import { Link } from "react-router-dom";
import HeroCarousel from "../components/HeroCarousel";
import { focusAreas, highlights } from "../data/programs";
import { APPLY_URL, REQUEST_INFO_URL } from "../data/links";

function Home() {
  return (
    <>
      <HeroCarousel />

      <section className="quick-links" aria-label="Quick links">
        <div className="container quick-links-grid">
          <Link to="/admissions/visit">Visit</Link>
          <a href={APPLY_URL} target="_blank" rel="noreferrer">
            Apply
          </a>
          <Link to="/academics">Explore</Link>
          <a href={REQUEST_INFO_URL} target="_blank" rel="noreferrer">
            Request Info
          </a>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div className="split-copy">
            <p className="eyebrow">What sets WMCC apart</p>
            <h2>Career focus, mountain community, clear next steps.</h2>
            <p>
              White Mountains Community College serves northern New Hampshire with
              associate degrees, certificates, and workforce training — taught by
              faculty who know the industries and communities of the North Country.
            </p>
            <ul className="check-list">
              <li>Hands-on labs for welding, diesel, automotive, culinary, and nursing</li>
              <li>Berlin, Littleton, and North Conway locations — plus online options</li>
              <li>Transfer pathways and advising for four-year goals</li>
              <li>Short-term training that moves you from classroom to career</li>
            </ul>
            <Link className="text-link" to="/about">
              Discover WMCC
            </Link>
          </div>
          <figure className="split-media">
            <img
              src="/images/campus-exterior.jpg"
              alt="Berlin campus of White Mountains Community College"
            />
          </figure>
        </div>
      </section>

      <section className="section stats-band stats-band-light">
        <div className="container">
          <div className="section-intro narrow">
            <p className="eyebrow">At a glance</p>
            <h2>Affordable access across the North Country.</h2>
          </div>
          <div className="stats-grid">
            {highlights.map((item) => (
              <div key={item.label} className="stat">
                <p className="stat-value">{item.value}</p>
                <p className="stat-label">{item.label}</p>
                <p className="stat-detail">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-tint">
        <div className="container">
          <div className="section-intro">
            <p className="eyebrow">Academics</p>
            <h2>Find a program that fits your goals.</h2>
            <p>
              Whether you&apos;re launching a career, transferring to a four-year
              school, or building new skills, WMCC has a pathway for you.
            </p>
          </div>
          <div className="area-grid">
            {focusAreas.slice(0, 4).map((area) => (
              <article key={area.id} className="area-item">
                <h3>{area.title}</h3>
                <p>{area.description}</p>
                <Link className="text-link" to={`/academics?category=${area.id}`}>
                  View programs
                </Link>
              </article>
            ))}
          </div>
          <div className="section-cta">
            <Link className="btn btn-primary" to="/academics">
              View All Programs
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container quote-block">
          <blockquote>
            <p>
              &ldquo;I&apos;m thankful for the support and guidance I received from
              instructors and staff members. I met so many great people and
              friends.&rdquo;
            </p>
            <footer>
              <cite>Alyssa Delafontaine, ’24</cite>
              <span>
                Teacher Education, Special Education, and Library Technology
              </span>
            </footer>
          </blockquote>
          <figure>
            <img
              src="/images/graduation.jpg"
              alt="White Mountains Community College graduate at commencement"
            />
          </figure>
        </div>
      </section>

      <section className="section cta-band">
        <div className="container cta-inner">
          <div>
            <p className="eyebrow light">Ready when you are</p>
            <h2>Take the next step at WMCC.</h2>
            <p>
              Speak with an admissions counselor, tour a North Country location,
              or apply through the official CCSNH portal.
            </p>
          </div>
          <div className="cta-actions">
            <a
              className="btn btn-gold"
              href={APPLY_URL}
              target="_blank"
              rel="noreferrer"
            >
              Apply Now
            </a>
            <Link className="btn btn-ghost-light" to="/admissions/visit">
              Visit Campus
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
