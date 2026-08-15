import { Link } from "react-router-dom";
import { hubOfferings } from "../data/hubs";

function HubInside() {
  const preview = hubOfferings.slice(0, 4);

  return (
    <section
      id="hubs"
      className="section-pad relative overflow-hidden bg-violet-field"
    >
      <div className="pointer-events-none absolute inset-0 bg-section-glow" />
      <div className="container relative">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="eyebrow">Inside a hub</p>
            <h2 className="display mt-4 text-4xl md:text-5xl">
              What a Neighborhood Resource Hub looks like
            </h2>
            <p className="mt-5 font-body text-lg text-violet-mist">
              Think community-hub accessibility, mission-driven service, and
              character-building youth programming—woven into one local place
              young people can actually walk into.
            </p>
          </div>
          <Link to="/hubs" className="btn-primary w-fit shrink-0">
            Find a Hub Near You
          </Link>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {preview.map((item, index) => (
            <article
              key={item.title}
              className="border border-violet-bright/25 bg-ink/35 p-7 md:p-8"
            >
              <span className="font-display text-sm font-bold uppercase tracking-[0.2em] text-chartreuse">
                0{index + 1}
              </span>
              <h3 className="mt-4 font-display text-2xl font-bold text-white">
                {item.title}
              </h3>
              <p className="mt-3 font-body leading-relaxed text-violet-mist">
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
