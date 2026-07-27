import { Link } from "react-router-dom";
import HeroCarousel from "../components/HeroCarousel";
import { highlights } from "../data/programs";
import {
  apartPillars,
  homeEvents,
  homeQuotes,
  newsItems,
  socialPosts,
} from "../data/siteContent";

function Home() {
  const featuredNews = newsItems.slice(0, 2);
  const [primaryQuote, secondaryQuote] = homeQuotes;

  return (
    <>
      <HeroCarousel />

      <section className="quick-links">
        <div className="container quick-links-grid">
          <Link to="/admissions/visit">Visit</Link>
          <Link to="/admissions/how-to-apply">Apply</Link>
          <Link to="/academics">Explore</Link>
          <Link to="/contact">Request Info</Link>
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
        <div className="container">
          <div className="section-intro">
            <p className="eyebrow">What sets Great Bay apart</p>
            <h2>Excellence, support, and a clear path forward.</h2>
            <p>
              From academic programs and transfer pathways to workforce training
              and athletics, Great Bay is built to help Seacoast students succeed.
            </p>
          </div>
          <div className="apart-grid">
            {apartPillars.map((item) => (
              <article key={item.id} className="apart-item">
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
                <Link className="text-link" to={item.to}>
                  Learn more
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-tint">
        <div className="container home-news-layout">
          <div>
            <div className="section-intro tight">
              <p className="eyebrow">News and Events</p>
              <h2>What&apos;s happening at Great Bay.</h2>
            </div>
            <div className="home-news-list">
              {featuredNews.map((item) => (
                <article key={item.id} className="home-news-item">
                  <p className="home-news-tag">In the News</p>
                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>
                  <Link className="text-link" to="/news">
                    Read the full article
                  </Link>
                </article>
              ))}
            </div>
            <div className="section-cta left">
              <Link className="btn btn-navy" to="/news">
                View all news
              </Link>
            </div>
          </div>

          <aside className="home-events-panel">
            <h3>Upcoming events</h3>
            <ul className="home-events-list">
              {homeEvents.map((event) => (
                <li key={event.id}>
                  <div className="home-event-date">
                    <span>{event.dateLabel}</span>
                    <span>{event.time}</span>
                  </div>
                  <div>
                    <p className="home-event-title">{event.title}</p>
                    <Link className="text-link" to={event.to}>
                      Learn more about this event
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
            <Link className="btn btn-gold" to="/admissions/visit">
              Visit Campus
            </Link>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container quote-block">
          <blockquote>
            <p>&ldquo;{primaryQuote.quote}&rdquo;</p>
            <footer>
              <cite>{primaryQuote.name}</cite>
              <span>{primaryQuote.detail}</span>
            </footer>
          </blockquote>
          <figure>
            <img src={primaryQuote.image} alt={primaryQuote.imageAlt} />
          </figure>
        </div>
      </section>

      <section className="section section-tint">
        <div className="container">
          <div className="section-intro">
            <p className="eyebrow">On Social Media</p>
            <h2>Great Bay Community College</h2>
            <p>
              Campus updates, student wins, and ways to start this fall —
              follow along and take the next step when you&apos;re ready.
            </p>
          </div>
          <div className="social-grid">
            {socialPosts.map((post) => (
              <article key={post.id} className="social-card">
                <p className="social-when">{post.when}</p>
                <p>{post.copy}</p>
                <a
                  className="text-link"
                  href="https://www.facebook.com/GreatBayCC"
                  target="_blank"
                  rel="noreferrer"
                >
                  View on Facebook
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container quote-block quote-block-secondary">
          <figure>
            <img src={secondaryQuote.image} alt={secondaryQuote.imageAlt} />
          </figure>
          <blockquote>
            <p>&ldquo;{secondaryQuote.quote}&rdquo;</p>
            <footer>
              <cite>{secondaryQuote.name}</cite>
              <span>{secondaryQuote.detail}</span>
            </footer>
          </blockquote>
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
            <Link className="btn btn-gold" to="/admissions/how-to-apply">
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
