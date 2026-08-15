import { Link } from "react-router-dom";
import { leaders } from "../data/leaders";

function LeadershipPage() {
  return (
    <>
      <section className="border-b border-paper-line bg-paper pb-14 pt-28 md:pb-16 md:pt-32">
        <div className="container">
          <p className="eyebrow-accent">Youth advisory board</p>
          <h1 className="display mt-5 max-w-4xl text-4xl md:text-6xl">
            Youth-led governance, for real
          </h1>
          <p className="lede mt-5 max-w-2xl">
            Young co-creators, peer leaders, and community navigators shape and
            run the network—because Civic Bound is built for young people
            themselves.
          </p>
        </div>
      </section>

      <section className="section-pad bg-paper-soft">
        <div className="container grid gap-6 md:grid-cols-2">
          {leaders.map((leader) => (
            <article key={leader.name} className="surface-card p-7 md:p-8">
              <p className="micro-label text-chartreuse">{leader.role}</p>
              <h2 className="mt-3 font-display text-3xl font-semibold text-charcoal-deep">
                {leader.name}
              </h2>
              <p className="mt-2 font-body text-sm font-semibold uppercase tracking-[0.14em] text-charcoal-soft">
                Focus: {leader.focus}
              </p>
              <p className="mt-5 font-body leading-relaxed text-charcoal">
                {leader.bio}
              </p>
            </article>
          ))}
        </div>

        <div className="container mt-14 flex flex-col items-start gap-4 border-t border-paper-line pt-10 md:flex-row md:items-center md:justify-between">
          <p className="max-w-xl font-body text-lg leading-relaxed text-charcoal">
            Interested in peer leadership or mentorship? Start with the village
            network—or find support first if you need it.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/partners" className="btn-ghost">
              Join the village
            </Link>
            <Link to="/get-support" className="btn-primary">
              Get support
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default LeadershipPage;
