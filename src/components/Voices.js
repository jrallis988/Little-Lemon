import { Link } from "react-router-dom";

const voices = [
  {
    quote:
      "He motivates me. He’s the best person I ever met… always on me, pushing me.",
    attribution: "Manny, sixth grader",
    role: "Talking about his success coach",
  },
  {
    quote:
      "I finally have people who see me—and help me move forward without judging where I’ve been.",
    attribution: "Youth participant",
    role: "Neighborhood hub",
  },
  {
    quote:
      "We walked in scared and left with a plan—and people who still check in. That changed everything for our family.",
    attribution: "Family member",
    role: "Stability navigation",
  },
];

function Voices() {
  return (
    <section id="voices" className="section-pad border-y border-paper-line bg-paper-soft">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow-accent">Real Stories</p>
          <h2 className="display mt-5 text-3xl md:text-5xl">
            Real words from the people we walk with
          </h2>
          <p className="lede mt-5">
            Metrics matter—but dignity lives in the stories. Here’s what youth,
            coaches, and families say about Civic Bound.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {voices.map((voice) => (
            <figure key={voice.attribution} className="surface-card p-8">
              <blockquote className="font-display text-xl font-semibold leading-snug text-charcoal-deep">
                “{voice.quote}”
              </blockquote>
              <figcaption className="mt-6 border-t border-paper-line pt-4">
                <p className="micro-label text-chartreuse">{voice.attribution}</p>
                <p className="mt-1 font-body text-sm text-charcoal-soft">
                  {voice.role}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/stories" className="btn-ghost">
            Read More Stories
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Voices;
