import { FormEvent, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { eras, snapshotForYear } from "../data/campaign";
import { AnniversaryBadge } from "./Logo";

type Mode = "birth" | "journey";

export function FindYourYear() {
  const [mode, setMode] = useState<Mode>("journey");
  const [year, setYear] = useState("1998");
  const [submitted, setSubmitted] = useState<number | null>(null);

  const snapshot = useMemo(
    () => (submitted ? snapshotForYear(submitted) : null),
    [submitted]
  );
  const era = useMemo(
    () => (snapshot ? eras.find((item) => item.id === snapshot.eraId) : null),
    [snapshot]
  );

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const value = Number(year);
    if (Number.isNaN(value) || value < 1961 || value > 2026) return;
    setSubmitted(value);
  };

  return (
    <section className="pb-20 pt-28 sm:pb-28 sm:pt-32" aria-labelledby="fyy-heading">
      <div className="section-shell">
        <AnniversaryBadge />
        <h1
          id="fyy-heading"
          className="mt-5 max-w-3xl font-display text-4xl font-bold tracking-tight text-ink sm:text-6xl"
          style={{ fontWeight: 700 }}
        >
          Find Your Year
        </h1>
        <p className="mt-4 max-w-2xl font-serif text-lg leading-relaxed text-ink/65 sm:text-xl">
          Enter your birth year—or the year you began your wellness journey—and see how your story
          sits inside 63 years of people, progress, and possibility.
        </p>

        <form
          onSubmit={onSubmit}
          className="mt-10 max-w-xl rounded-[1.75rem] border border-ink/8 bg-white p-6 sm:p-8"
        >
          <div className="flex gap-2">
            {(
              [
                { id: "journey", label: "Year I began" },
                { id: "birth", label: "Birth year" },
              ] as const
            ).map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setMode(option.id)}
                className={`rounded-2xl px-4 py-2.5 font-sans text-sm font-semibold transition ${
                  mode === option.id
                    ? "bg-cobalt-600 text-white"
                    : "bg-mist text-ink/70 hover:bg-cobalt-100"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          <label className="mt-6 block font-sans text-xs font-semibold uppercase tracking-[0.16em] text-ink/45" htmlFor="year">
            {mode === "birth" ? "Birth year" : "Year you began"}
          </label>
          <input
            id="year"
            type="number"
            min={1961}
            max={2026}
            value={year}
            onChange={(event) => setYear(event.target.value)}
            className="mt-2 h-12 w-full rounded-2xl border border-ink/10 px-4 font-sans text-base outline-none ring-cobalt-600 focus:ring-2"
            required
          />
          <button
            type="submit"
            className="mt-5 h-12 w-full rounded-2xl bg-cobalt-600 font-sans text-sm font-semibold text-white transition hover:bg-cobalt-700 sm:w-auto sm:px-8"
          >
            Reveal my chapter
          </button>
        </form>

        {snapshot && era && submitted !== null && (
          <div className="mt-10 overflow-hidden rounded-[1.75rem] border border-ink/8 bg-white">
            <div className="grid lg:grid-cols-2">
              <img
                src={
                  submitted < 1990
                    ? "/images/archive/living-room.jpg"
                    : submitted < 2010
                      ? "/images/campaign/journal.jpg"
                      : "/images/campaign/phone.jpg"
                }
                alt=""
                className={`h-64 w-full object-cover lg:h-full ${submitted < 2000 ? "grayscale" : ""}`}
              />
              <div className="p-6 sm:p-8">
                <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-cobalt-600">
                  Your year · {submitted}
                </p>
                <h2 className="mt-2 font-display text-3xl font-bold text-ink" style={{ fontWeight: 700 }}>
                  {era.title}
                </h2>
                <p className="mt-3 font-serif text-lg text-ink/70">{snapshot.look}</p>

                <p className="mt-6 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-ink/40">
                  Wellness trends then
                </p>
                <ul className="mt-2 space-y-2">
                  {snapshot.trends.map((trend) => (
                    <li key={trend} className="font-sans text-sm text-ink/70">
                      · {trend}
                    </li>
                  ))}
                </ul>

                <p className="mt-6 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-ink/40">
                  How Weight Watchers evolved since
                </p>
                <p className="mt-2 font-serif text-lg text-ink/75">{snapshot.evolved}</p>

                <p className="mt-6 rounded-2xl bg-mist/80 p-4 font-serif text-base text-ink/80">
                  Your story fits the larger Weight Watchers 63 journey—not as a footnote, but as
                  the reason the campaign exists.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    to="/#finale"
                    className="rounded-2xl bg-cobalt-600 px-5 py-3 font-sans text-sm font-semibold text-white"
                  >
                    Start Your Next Chapter
                  </Link>
                  <Link
                    to="/#evolution"
                    className="rounded-2xl border border-ink/10 px-5 py-3 font-sans text-sm font-semibold text-ink"
                  >
                    Browse the full timeline
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
