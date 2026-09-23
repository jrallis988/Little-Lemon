import { Link } from "react-router-dom";
import { coalitionPartners } from "../data/news";

function PartnersRow() {
  return (
    <section id="coalition-partners" className="section-pad bg-paper">
      <div className="container">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow-accent">Coalition Partners</p>
            <h2 className="display mt-5 text-3xl md:text-4xl">
              Trusted organizations walking with us
            </h2>
            <p className="mt-4 font-body text-charcoal">
              Civic Bound convenes community partners across mentorship,
              workforce, family support, and the arts—so young people meet a
              network, not a maze.
            </p>
          </div>
          <Link to="/partners" className="btn-ghost w-fit shrink-0">
            View All Partners
          </Link>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {coalitionPartners.map((partner) => (
            <div
              key={partner.name}
              className="flex min-h-[110px] flex-col justify-between border border-paper-line bg-paper-soft px-6 py-5"
            >
              <p className="micro-label text-chartreuse">{partner.type}</p>
              <p className="mt-4 font-display text-xl font-semibold text-charcoal-deep">
                {partner.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PartnersRow;
