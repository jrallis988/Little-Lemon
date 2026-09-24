import { Link } from "react-router-dom";
import { newsItems } from "../data/content";
import usePageMeta from "../hooks/usePageMeta";

function News() {
  usePageMeta({
    title: "News",
    description:
      "Student success, new programs, and community partnerships from NHTI – Concord's Community College.",
  });

  return (
    <>
      <section className="page-hero">
        <p className="eyebrow">News</p>
        <h1>Stories from campus and beyond</h1>
        <p className="page-hero__lede">
          Student success, new programs, and community partnerships — the latest
          from Concord&apos;s Community College.
        </p>
      </section>

      <section className="section">
        <div className="news-grid">
          {newsItems.map((item) => (
            <article key={item.id} className="news-card">
              <img src={item.image} alt="" loading="lazy" />
              <div className="news-card__body">
                <time dateTime={item.date}>{item.displayDate}</time>
                <h2>
                  <Link to={`/news/${item.id}`}>{item.title}</Link>
                </h2>
                <p>{item.summary}</p>
                <Link className="text-link" to={`/news/${item.id}`}>
                  Read story
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

export default News;
