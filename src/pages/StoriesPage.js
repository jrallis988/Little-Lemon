import { Link } from "react-router-dom";
import { stories } from "../data/stories";

function StoriesPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-violet-field pb-16 pt-28 md:pb-20 md:pt-36">
        <div className="pointer-events-none absolute inset-0 bg-section-glow" />
        <div className="container relative">
          <p className="eyebrow">Community voices</p>
          <h1 className="display mt-4 max-w-4xl text-4xl md:text-6xl">
            Stories of direction, re-entry, and stability
          </h1>
          <p className="mt-5 max-w-2xl font-body text-lg text-violet-mist">
            Peer narratives—not charity marketing. Real dispatches from youth,
            mentors, and families walking through change with dignity.
          </p>
        </div>
      </section>

      <section className="section-pad bg-ink">
        <div className="container grid gap-8 lg:grid-cols-2">
          {stories.map((story) => (
            <article
              key={story.id}
              className="flex flex-col border border-violet-bright/25 bg-ink-soft/60 p-8"
            >
              <p className="font-body text-xs uppercase tracking-[0.2em] text-chartreuse">
                {story.voice} · {story.hub}
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold text-white">
                {story.title}
              </h2>
              <p className="mt-4 font-display text-xl leading-snug text-violet-mist">
                “{story.excerpt}”
              </p>
              <p className="mt-5 flex-1 font-body leading-relaxed text-violet-mist">
                {story.body}
              </p>
            </article>
          ))}
        </div>

        <div className="container mt-14 text-center">
          <Link to="/get-support" className="btn-primary">
            Find Your Track
          </Link>
        </div>
      </section>
    </>
  );
}

export default StoriesPage;
