import { FormEvent, useState } from "react";
import { useInView } from "../hooks/useInView";

export function Newsletter() {
  const { ref, visible } = useInView<HTMLElement>();
  const [joined, setJoined] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setJoined(true);
  }

  return (
    <section
      id="newsletter"
      ref={ref}
      className="border-y border-ink/10 px-5 py-16 md:px-8 md:py-20"
    >
      <div
        className={`mx-auto flex max-w-site flex-col gap-6 md:flex-row md:items-end md:justify-between ${
          visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        } transition-all duration-700`}
      >
        <div className="max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-tide">
            Stay in the know
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold uppercase tracking-wide md:text-4xl">
            Events, releases & merch drops
          </h2>
          <p className="mt-3 text-steel">
            No spam. Just the good stuff from Towle Farm.
          </p>
        </div>

        {joined ? (
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-tide">
            You’re on the list — cheers.
          </p>
        ) : (
          <form
            onSubmit={onSubmit}
            className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
          >
            <label className="sr-only" htmlFor="newsletter-email">
              Email address
            </label>
            <input
              id="newsletter-email"
              required
              type="email"
              name="email"
              placeholder="you@email.com"
              autoComplete="email"
              className="min-w-0 flex-1 border border-ink/20 bg-foam px-4 py-3 text-ink outline-none transition-colors focus:border-buoy"
            />
            <button
              type="submit"
              className="bg-ink px-5 py-3 text-sm font-semibold tracking-wide text-foam transition-transform duration-300 hover:-translate-y-0.5"
            >
              Sign up
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
