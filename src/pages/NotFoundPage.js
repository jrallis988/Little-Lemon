import { useEffect } from "react";
import { Link } from "react-router-dom";
import PageShell from "../components/PageShell";

export default function NotFoundPage() {
  useEffect(() => {
    document.title = "Page not found — James Rallis";
    return () => {
      document.title = "James Rallis — Front-End Engineer & Multimedia Designer";
    };
  }, []);

  return (
    <PageShell>
      <section className="relative overflow-hidden bg-ink-soft pb-24 pt-32 md:pb-32 md:pt-40">
        <div className="absolute inset-0 hero-wash opacity-45" aria-hidden="true" />
        <div className="grain" aria-hidden="true" />
        <div className="container relative max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-foam">404</p>
          <h1 className="font-display text-4xl font-bold text-chalk md:text-6xl">
            Looks like this page went missing.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-sand/85 md:text-lg">
            The link may be outdated, or the page never existed. Let’s get you back to the work.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/" className="btn-primary">
              Return Home
            </Link>
            <Link to="/#work" className="btn-ghost">
              View Work
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
