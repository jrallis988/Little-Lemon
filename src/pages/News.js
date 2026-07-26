import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import { newsItems } from "../data/siteContent";

function News() {
  return (
    <>
      <PageHero
        brand="News & Events"
        title="What’s happening at WMCC."
        copy="Student stories, academic honors, campus updates, and community recognition from across northern New Hampshire."
        image="/images/graduation.jpg"
      />

      <section className="section">
        <div className="container">
          <div className="news-list">
            {newsItems.map((item) => (
              <article key={item.id} className="news-item">
                <p className="news-meta">
                  <span>{item.category}</span>
                  <span>{item.date}</span>
                </p>
                <h2>{item.title}</h2>
                <p>{item.summary}</p>
              </article>
            ))}
          </div>

          <div className="section-cta">
            <a
              className="btn btn-primary"
              href="https://www.wmcc.edu/"
              target="_blank"
              rel="noreferrer"
            >
              More on wmcc.edu
            </a>
            <Link
              className="btn btn-gold"
              to="/admissions/visit"
              style={{ marginLeft: "0.75rem" }}
            >
              Upcoming Visit Events
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default News;
