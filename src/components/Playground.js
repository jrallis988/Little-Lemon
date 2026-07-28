import FoamDriftGame from "./FoamDriftGame";

const notes = [
  {
    title: "Game loop",
    body: "A requestAnimationFrame tick drives spawn, movement, collision, and draw. Delta time keeps feel consistent across refresh rates.",
  },
  {
    title: "State management",
    body: "Mutable sim state lives in a ref so the loop stays hot; React state only mirrors score, misses, and UI status for the chrome around the canvas.",
  },
  {
    title: "Rendering & assets",
    body: "Procedural foam orbs and a soft paddle stand in for sprite sheets—same atmospheric UI language as the site, ready to swap for custom media assets.",
  },
];

export default function Playground() {
  return (
    <section id="play" className="bg-ink py-24 md:py-32">
      <div className="container">
        <div className="mb-12 max-w-2xl stagger">
          <p className="reveal mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-foam">
            Interactive
          </p>
          <h2 className="reveal font-display text-3xl font-bold text-chalk md:text-5xl">
            A playable prototype in the portfolio.
          </h2>
          <p className="reveal mt-4 text-base leading-relaxed text-sand/85 md:text-lg">
            Engineering-track game work lives here as web prototypes—not trailers.
            Foam Drift is a lightweight canvas demo; larger builds lean on Phaser.js
            and Three.js with a custom asset pipeline.
          </p>
        </div>

        <div className="reveal mb-12">
          <FoamDriftGame />
        </div>

        <div className="stagger grid gap-8 md:grid-cols-3">
          {notes.map((note) => (
            <article key={note.title} className="reveal border-t border-foam/35 pt-5">
              <h3 className="font-display text-xl font-bold text-foam-soft">{note.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-sand/85">{note.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
