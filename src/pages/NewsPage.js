import { Link } from "react-router-dom";
import { newsItems } from "../data/news";

function NewsPage() {
  return (
    <>
      <section className="border-b border-paper-line bg-paper pb-14 pt-28 md:pb-16 md:pt-32">
        <div className="container">
          <p className="eyebrow-accent">Latest News</p>
          <h1 className="display mt-5 max-w-4xl text-4xl md:text-6xl">
            Recent updates from Civic Bound
          </h1>
          <p className="lede mt-5 max-w-2xl">
            Hub openings, volunteer cohorts, and youth-led priorities—clear
            signals that the network is active and accountable.
          </p>
        </div>
      </section>

      <section className="section-pad bg-paper-soft">
        <div className="container grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {newsItems.map((item) => (
            <article key={item.id} className="surface-card flex flex-col p-8">
              <div className="flex items-center gap-3">
                <span className="micro-label text-chartreuse">{item.category}</span>
                <span className="font-body text-xs text-charcoal-soft">
                  {item.date}
                </span>
              </div>
              <h2 className="mt-4 font-display text-2xl font-semibold text-charcoal-deep">
                {item.title}
              </h2>
              <p className="mt-3 flex-1 font-body leading-relaxed text-charcoal">
                {item.excerpt}
              </p>
            </article>
          ))}
        </div>
        <div className="container mt-12 text-center">
          <Link to="/hubs" className="btn-primary">
            Visit a Hub
          </Link>
        </div>
      </section>
    </>
  );
}

export default NewsPage;
