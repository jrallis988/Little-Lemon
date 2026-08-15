import { Link } from "react-router-dom";
import { stories } from "../data/stories";

function StoriesPage() {
  return (
    <>
      <section className="border-b border-paper-line bg-paper pb-14 pt-28 md:pb-16 md:pt-32">
        <div className="container">
          <p className="eyebrow-accent">Community voices</p>
          <h1 className="display mt-5 max-w-4xl text-4xl md:text-6xl">
            Stories of direction, re-entry, and stability
          </h1>
          <p className="lede mt-5 max-w-2xl">
            Peer narratives—not charity marketing. Real dispatches from youth,
            mentors, and families walking through change with dignity.
          </p>
        </div>
      </section>

      <section className="section-pad bg-paper-soft">
        <div className="container grid gap-8 lg:grid-cols-2">
          {stories.map((story) => (
            <article key={story.id} className="surface-card flex flex-col p-8">
              <p className="micro-label text-chartreuse">
                {story.voice} · {story.hub}
              </p>
              <h2 className="mt-4 font-display text-3xl font-semibold text-charcoal-deep">
                {story.title}
              </h2>
              <p className="mt-4 font-display text-xl leading-snug text-charcoal">
                “{story.excerpt}”
              </p>
              <p className="mt-5 flex-1 font-body leading-relaxed text-charcoal">
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
