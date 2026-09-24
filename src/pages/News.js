import { Link } from "react-router-dom";
import ExternalLink from "../components/ExternalLink";
import PageHero from "../components/PageHero";
import { newsItems } from "../data/siteContent";
import { WMCC_EVENTS_URL, WMCC_NEWS_URL } from "../data/links";

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
            to: WMCC_EVENTS_URL,
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
                    <ExternalLink
                      href={item.href}
                      className="news-title-link"
                    >
                      {item.title}
                    </ExternalLink>
                  ) : (
                    item.title
                  )}
                </h2>
                <p>{item.summary}</p>
                {item.href ? (
                  <ExternalLink className="text-link" href={item.href}>
                    Read on wmcc.edu
                  </ExternalLink>
                ) : null}
              </article>
            ))}
          </div>

          <div className="section-cta cta-actions">
            <ExternalLink className="btn btn-primary" href={WMCC_NEWS_URL}>
              More news on wmcc.edu
            </ExternalLink>
            <ExternalLink className="btn btn-gold" href={WMCC_EVENTS_URL}>
              Events calendar
            </ExternalLink>
            <Link className="btn btn-primary" to="/admissions/visit">
              Plan a visit
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default News;
