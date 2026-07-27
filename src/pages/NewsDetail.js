import { Link, useParams } from "react-router-dom";
import { getNewsById } from "../data/content";

function NewsDetail() {
  const { newsId } = useParams();
  const article = getNewsById(newsId);

  if (!article) {
    return (
      <section className="page-hero">
        <p className="eyebrow">News</p>
        <h1>Story not found</h1>
        <Link to="/news" className="btn btn--solid">
          Back to news
        </Link>
      </section>
    );
  }

  return (
    <>
      <section className="page-hero">
        <p className="eyebrow">News</p>
        <time dateTime={article.date}>{article.displayDate}</time>
        <h1>{article.title}</h1>
        <p className="page-hero__lede">{article.summary}</p>
      </section>

      <section className="section">
        <img
          className="article-hero"
          src={article.image}
          alt=""
          loading="eager"
        />
        <div className="article-body">
          <p>{article.body}</p>
          <Link to="/news" className="text-link">
            More campus news
          </Link>
        </div>
      </section>
    </>
  );
}

export default NewsDetail;
