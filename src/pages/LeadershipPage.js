import { Link } from "react-router-dom";
import { leaders } from "../data/leaders";

function LeadershipPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-violet-field pb-16 pt-28 md:pb-20 md:pt-36">
        <div className="pointer-events-none absolute inset-0 bg-section-glow" />
        <div className="container relative">
          <p className="eyebrow">Youth advisory board</p>
          <h1 className="display mt-4 max-w-4xl text-4xl md:text-6xl">
            Youth-led governance, for real
          </h1>
          <p className="mt-5 max-w-2xl font-body text-lg text-violet-mist">
            Young co-creators, peer leaders, and community navigators shape and
            run the network—because Civic Bound is built for young people
            themselves.
          </p>
        </div>
      </section>

      <section className="section-pad bg-ink">
        <div className="container grid gap-6 md:grid-cols-2">
          {leaders.map((leader) => (
            <article
              key={leader.name}
              className="border border-violet-bright/25 bg-ink-soft/60 p-7 md:p-8"
            >
              <p className="font-body text-xs uppercase tracking-[0.2em] text-chartreuse">
                {leader.role}
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold text-white">
                {leader.name}
              </h2>
              <p className="mt-2 font-body text-sm uppercase tracking-[0.14em] text-violet-mist">
                Focus: {leader.focus}
              </p>
              <p className="mt-5 font-body leading-relaxed text-violet-mist">
                {leader.bio}
              </p>
            </article>
          ))}
        </div>

        <div className="container mt-14 flex flex-col items-start gap-4 border-t border-violet-bright/20 pt-10 md:flex-row md:items-center md:justify-between">
          <p className="max-w-xl font-body text-lg text-violet-mist">
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
