import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import { newsItems } from "../data/siteContent";

function News() {
  return (
    <>
      <PageHero
        brand="News & Events"
        title="What’s happening at Great Bay."
        copy="Commencement highlights, student stories, campus openings, and community recognition from across the Seacoast."
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
              className="btn btn-navy"
              href="https://www.greatbay.edu/news"
              target="_blank"
              rel="noreferrer"
            >
              More on greatbay.edu
            </a>
            <Link className="btn btn-gold" to="/admissions/visit" style={{ marginLeft: "0.75rem" }}>
              Upcoming Visit Events
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default News;
