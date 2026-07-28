import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";

export function CampaignFinale() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "invalid" | "demo">("idle");

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      setStatus("invalid");
      return;
    }
    // Concept/demo only — no backend handler is wired in this redesign.
    setStatus("demo");
  };

  return (
    <section id="finale" className="py-20 sm:py-28" aria-labelledby="finale-heading">
      <div className="section-shell">
        <div className="relative overflow-hidden rounded-[2rem]">
          <img
            src="/images/campaign/kitchen-cook.jpg"
            alt="A member cooking at home—an everyday personal milestone"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-cobalt-800/80" />
          <div className="relative px-6 py-16 text-center text-white sm:px-12 sm:py-20">
            <p className="mx-auto max-w-2xl font-serif text-2xl leading-snug sm:text-3xl">
              The point of 63 years is not the cake. It is clearer support for your next chapter—and
              a company still choosing to evolve with you.
            </p>
            <h2
              id="finale-heading"
              className="mt-6 font-display text-4xl font-bold tracking-tight sm:text-5xl"
              style={{ fontWeight: 700 }}
            >
              Your needs first. Our future with you.
            </h2>
            <p className="mt-2 font-serif text-xl text-tide sm:text-2xl">Weight Watchers 63 · 63 Years of You</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/programs"
                className="rounded-2xl bg-white px-6 py-3.5 font-sans text-sm font-semibold text-ink transition hover:bg-cloud"
              >
                Start with your priorities
              </Link>
              <Link
                to="/whats-next"
                className="rounded-2xl border border-white/35 px-6 py-3.5 font-sans text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Meet the next Weight Watchers
              </Link>
            </div>
          </div>
        </div>

        <div id="join-next" className="mx-auto mt-10 max-w-xl text-center">
          <form className="flex flex-col gap-3 sm:flex-row" onSubmit={onSubmit} noValidate>
            <label className="sr-only" htmlFor="next-email">
              Email address
            </label>
            <input
              id="next-email"
              type="email"
              required
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                if (status !== "idle") setStatus("idle");
              }}
              placeholder="Email address"
              aria-invalid={status === "invalid"}
              aria-describedby="join-help"
              className="h-12 flex-1 rounded-2xl border border-ink/10 px-5 font-sans text-sm outline-none ring-cobalt-600 focus:ring-2"
            />
            <button
              type="submit"
              className="h-12 rounded-2xl bg-cobalt-600 px-6 font-sans text-sm font-semibold text-white transition hover:bg-cobalt-700"
            >
              Start Your Next Chapter
            </button>
          </form>
          <p id="join-help" className="mt-3 font-sans text-xs text-ink/45">
            Concept demo only — this form does not submit or store your email. Clinical care
            availability varies.
          </p>
          {status === "invalid" && (
            <p className="mt-2 font-sans text-sm text-red-700" role="alert">
              Enter a valid email address to preview the demo interaction.
            </p>
          )}
          {status === "demo" && (
            <p className="mt-2 font-sans text-sm text-ink/70" role="status">
              Demo interaction complete. No data was sent.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
