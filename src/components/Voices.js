import { Link } from "react-router-dom";

const voices = [
  {
    quote:
      "I finally have people who see me—and help me move forward without judging where I’ve been.",
    attribution: "Youth participant",
    role: "Neighborhood hub",
  },
  {
    quote:
      "Mentorship here isn’t a checklist. It’s showing up, listening, and helping someone find their next steady step.",
    attribution: "Civic mentor",
    role: "Mentorship circle",
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
    <section
      id="voices"
      className="section-pad relative overflow-hidden bg-ink"
    >
      <div className="container relative">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Voices & impact</p>
          <h2 className="display mt-4 text-4xl md:text-5xl">
            Real words from the people we walk with
          </h2>
          <p className="mt-5 font-body text-lg text-violet-mist">
            Metrics matter—but dignity lives in the stories. Here’s what youth,
            mentors, and families say about Civic Bound.
          </p>
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {voices.map((voice) => (
            <figure
              key={voice.attribution}
              className="border-t border-chartreuse/50 pt-8"
            >
              <blockquote className="font-display text-xl font-bold leading-snug text-white md:text-2xl">
                “{voice.quote}”
              </blockquote>
              <figcaption className="mt-6">
                <p className="font-body text-sm font-semibold uppercase tracking-[0.16em] text-chartreuse">
                  {voice.attribution}
                </p>
                <p className="mt-1 font-body text-sm text-violet-mist">
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
