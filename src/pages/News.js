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
        actions={[
          {
            label: "Visit Events Calendar",
            to: "https://www.wmcc.edu/events/",
            external: true,
            className: "btn btn-gold",
          },
          {
            label: "Plan a Campus Visit",
            to: "/admissions/visit",
            className: "btn btn-ghost-light",
          },
        ]}
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
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="news-title-link"
                    >
                      {item.title}
                    </a>
                  ) : (
                    item.title
                  )}
                </h2>
                <p>{item.summary}</p>
                {item.href ? (
                  <a
                    className="text-link"
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Read on wmcc.edu
                  </a>
                ) : null}
              </article>
            ))}
          </div>

          <div className="section-cta cta-actions">
            <a
              className="btn btn-primary"
              href="https://www.wmcc.edu/news/"
              target="_blank"
              rel="noreferrer"
            >
              More news on wmcc.edu
            </a>
            <a
              className="btn btn-gold"
              href="https://www.wmcc.edu/events/"
              target="_blank"
              rel="noreferrer"
            >
              Events calendar
            </a>
            <Link className="btn btn-primary" to="/admissions/visit">
              Upcoming visit days
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default News;
