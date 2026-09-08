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
                <h2>
                  <Link to={`/news/${item.id}`}>{item.title}</Link>
                </h2>
                <p>{item.summary}</p>
                <Link className="text-link" to={`/news/${item.id}`}>
                  Read full article
                </Link>
              </article>
            ))}
          </div>

          <div className="section-cta left">
            <Link className="btn btn-navy" to="/events">
              View events calendar
            </Link>
            <Link className="btn btn-gold" to="/admissions/visit">
              Visit campus
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default News;
