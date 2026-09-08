import { Link, useParams } from "react-router-dom";
import PageHero from "../components/PageHero";
import { getNewsById, newsBodies, newsItems } from "../data/siteContent";

function NewsDetail() {
  const { newsId } = useParams();
  const article = getNewsById(newsId);
  const body = newsBodies[newsId] || [];

  if (!article) {
    return (
      <section className="section">
        <div className="container">
          <h1>Article not found</h1>
          <Link className="btn btn-navy" to="/news">
            Back to news
          </Link>
        </div>
      </section>
    );
  }

  const related = newsItems.filter((item) => item.id !== article.id).slice(0, 3);

  return (
    <>
      <PageHero
        brand={article.category}
        title={article.title}
        copy={`${article.date} · Great Bay Community College`}
        image="/images/graduation.jpg"
        compact
      />

      <section className="section">
        <div className="container article-layout">
          <article className="article-main">
            <p className="lede">{article.summary}</p>
            {body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <div className="article-actions">
              <Link className="btn btn-navy" to="/news">
                All news
              </Link>
              <Link className="btn btn-gold" to="/contact">
                Request info
              </Link>
            </div>
          </article>

          <aside className="article-aside">
            <h2>More stories</h2>
            <ul className="related-list">
              {related.map((item) => (
                <li key={item.id}>
                  <Link to={`/news/${item.id}`}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
    </>
  );
}

export default NewsDetail;
