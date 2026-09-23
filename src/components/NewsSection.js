import { Link } from "react-router-dom";
import { newsItems } from "../data/news";

function NewsSection({ limit = 3, showHeader = true }) {
  const items = newsItems.slice(0, limit);

  return (
    <section id="news" className="section-pad border-y border-paper-line bg-paper-soft">
      <div className="container">
        {showHeader && (
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow-accent">Latest News</p>
              <h2 className="display mt-5 text-3xl md:text-4xl">
                Recent updates from the network
              </h2>
              <p className="mt-4 font-body text-charcoal">
                Active hubs, volunteer cohorts, and youth-led priorities—proof
                the work is happening in community every week.
              </p>
            </div>
            <Link to="/news" className="btn-ghost w-fit shrink-0">
              All News
            </Link>
          </div>
        )}

        <div className={`grid gap-6 md:grid-cols-3 ${showHeader ? "mt-12" : ""}`}>
          {items.map((item) => (
            <article key={item.id} className="surface-card flex flex-col p-7">
              <div className="flex items-center gap-3">
                <span className="micro-label text-chartreuse">{item.category}</span>
                <span className="font-body text-xs text-charcoal-soft">
                  {item.date}
                </span>
              </div>
              <h3 className="mt-4 font-display text-2xl font-semibold text-charcoal-deep">
                {item.title}
              </h3>
              <p className="mt-3 flex-1 font-body leading-relaxed text-charcoal">
                {item.excerpt}
              </p>
              <Link
                to="/news"
                className="mt-6 inline-flex font-body text-sm font-semibold text-violet hover:underline"
              >
                Read update
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default NewsSection;
