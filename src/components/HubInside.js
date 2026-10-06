import { Link } from "react-router-dom";
import { hubOfferings } from "../data/hubs";

function HubInside() {
  const preview = hubOfferings.slice(0, 4);

  return (
    <section id="hubs" className="section-pad bg-paper">
      <div className="container">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="eyebrow-accent">Inside a hub</p>
            <h2 className="display mt-5 text-3xl md:text-5xl">
              What a Neighborhood Resource Hub looks like
            </h2>
            <p className="lede mt-5">
              Community-hub accessibility, mission-driven service, and
              character-building youth programming—woven into one local place
              young people can walk into.
            </p>
          </div>
          <Link to="/hubs" className="btn-primary w-fit shrink-0">
            Find a Hub Near You
          </Link>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {preview.map((item, index) => (
            <article key={item.title} className="surface-card p-8">
              <span className="micro-label text-chartreuse">0{index + 1}</span>
              <h3 className="mt-4 font-display text-2xl font-semibold text-charcoal-deep">
                {item.title}
              </h3>
              <p className="mt-3 font-body leading-relaxed text-charcoal">
                {item.copy}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HubInside;
