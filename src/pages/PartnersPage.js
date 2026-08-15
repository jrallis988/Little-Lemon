import { Link } from "react-router-dom";
import { partnerCategories } from "../data/partners";

function PartnersPage() {
  return (
    <>
      <section className="border-b border-paper-line bg-paper pb-14 pt-28 md:pb-16 md:pt-32">
        <div className="container">
          <p className="eyebrow-accent">The village network</p>
          <h1 className="display mt-5 max-w-4xl text-4xl md:text-6xl">
            Partner with Civic Bound
          </h1>
          <p className="lede mt-5 max-w-2xl">
            Local businesses, tradespeople, artists, and elders—sponsor space,
            offer skill shares, or act as sounding boards. Youth stay at the
            center.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/volunteers" className="btn-ghost">
              Volunteer boundaries
            </Link>
            <Link to="/leadership" className="btn-ghost">
              Meet youth leaders
            </Link>
            <Link to="/hubs" className="btn-primary">
              See hub needs
            </Link>
          </div>
        </div>
      </section>

      <section className="section-pad bg-paper-soft">
        <div className="container">
          <h2 className="display text-3xl md:text-4xl">Community action grid</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {partnerCategories.map((category, index) => (
              <article key={category.id} className="surface-card p-7 md:p-8">
                <span className="micro-label text-chartreuse">0{index + 1}</span>
                <h3 className="mt-4 font-display text-2xl font-semibold text-charcoal-deep">
                  {category.title}
                </h3>
                <p className="mt-3 font-body leading-relaxed text-charcoal">
                  {category.copy}
                </p>
                <ul className="mt-6 space-y-2">
                  {category.actions.map((action) => (
                    <li
                      key={action}
                      className="border-l border-chartreuse pl-3 font-body text-sm text-charcoal"
                    >
                      {action}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="mt-14 surface-card p-8 text-center md:p-12">
            <h3 className="display text-3xl">Ready to strengthen a hub?</h3>
            <p className="mx-auto mt-4 max-w-2xl font-body leading-relaxed text-charcoal">
              Tell us what you can offer—space, skills, presence, or resources.
              We’ll match you with youth-led priorities. Review volunteer
              boundaries first so expectations stay clear and hub-bound.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/volunteers" className="btn-ghost">
                Read volunteer framework
              </Link>
              <Link to="/get-support" className="btn-primary inline-flex">
                Start a conversation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default PartnersPage;
