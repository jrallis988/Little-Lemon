import { Link } from "react-router-dom";
import { partnerCategories } from "../data/partners";

function PartnersPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-violet-field pb-16 pt-28 md:pb-20 md:pt-36">
        <div className="pointer-events-none absolute inset-0 bg-section-glow" />
        <div className="container relative">
          <p className="eyebrow">The village network</p>
          <h1 className="display mt-4 max-w-4xl text-4xl md:text-6xl">
            Partner with Civic Bound
          </h1>
          <p className="mt-5 max-w-2xl font-body text-lg text-violet-mist">
            Local businesses, tradespeople, artists, and elders—sponsor space,
            offer skill shares, or act as sounding boards. Youth stay at the
            center.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/leadership" className="btn-ghost">
              Meet youth leaders
            </Link>
            <Link to="/hubs" className="btn-primary">
              See hub needs
            </Link>
          </div>
        </div>
      </section>

      <section className="section-pad bg-ink">
        <div className="container">
          <h2 className="display text-3xl md:text-4xl">Community action grid</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {partnerCategories.map((category, index) => (
              <article
                key={category.id}
                className="border border-violet-bright/25 bg-ink-soft/60 p-7 md:p-8"
              >
                <span className="font-display text-sm font-bold uppercase tracking-[0.2em] text-chartreuse">
                  0{index + 1}
                </span>
                <h3 className="mt-4 font-display text-2xl font-bold text-white">
                  {category.title}
                </h3>
                <p className="mt-3 font-body text-violet-mist">{category.copy}</p>
                <ul className="mt-6 space-y-2">
                  {category.actions.map((action) => (
                    <li
                      key={action}
                      className="border-l border-chartreuse/50 pl-3 font-body text-sm text-white"
                    >
                      {action}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="mt-14 border border-chartreuse/30 bg-violet-field/30 p-8 text-center md:p-12">
            <h3 className="display text-3xl">Ready to strengthen a hub?</h3>
            <p className="mx-auto mt-4 max-w-2xl font-body text-violet-mist">
              Tell us what you can offer—space, skills, presence, or resources.
              We’ll match you with youth-led priorities, not bureaucracy.
            </p>
            <Link to="/get-support" className="btn-primary mt-8 inline-flex">
              Start a conversation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default PartnersPage;
