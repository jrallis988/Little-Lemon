import type { Metadata } from "next";
import Link from "next/link";
import { HOME_CLUB } from "@/lib/home-club";

export const metadata: Metadata = {
  title: "Product",
  description:
    "Product overview for the Planet Fitness Stratham acquisition concept — discovery, membership selection, and member app.",
};

const pillars = [
  {
    title: "Acquire",
    body: "Local discovery and membership selection for the Stratham club, with Explore Clubs and clear Classic / PF Black+ paths.",
  },
  {
    title: "Convert",
    body: "Join and checkout flows that collect membership intent, contact details, and payment presentation before account creation.",
  },
  {
    title: "Retain",
    body: "Member app surfaces for home club, check-in, digital black card, classes, and account — scoped for a single franchise.",
  },
] as const;

const stack = [
  "Next.js App Router + TypeScript",
  "Tailwind CSS design tokens",
  "Cookie session auth (HMAC-signed)",
  "JSON file persistence (swap-ready for a database)",
  "Vitest unit tests + GitHub Actions CI",
] as const;

export default function ProductPage() {
  return (
    <div className="bg-white text-pf-ink">
      <section className="border-b border-black/10 bg-gradient-to-br from-[#f7f2ff] via-white to-[#fff8e8] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-pf-purple">
            Product case study
          </p>
          <h1 className="mt-3 font-display text-4xl font-black uppercase leading-none tracking-tight sm:text-5xl">
            Planet Fitness Stratham
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-pf-muted">
            A franchise-local acquisition site and member app concept for{" "}
            {HOME_CLUB.name} — designed to show how a single club can own
            discovery, membership conversion, and day-one member utility.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-pf-purple px-6 text-sm font-bold text-white transition hover:bg-pf-purple-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pf-purple"
            >
              View marketing site
            </Link>
            <Link
              href="/join"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-pf-purple px-6 text-sm font-bold text-pf-purple transition hover:bg-pf-purple/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pf-purple"
            >
              Start join flow
            </Link>
            <Link
              href="/screens"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-black/15 px-6 text-sm font-bold text-pf-ink transition hover:bg-black/[0.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pf-purple"
            >
              Screen inventory
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-2xl font-black uppercase tracking-tight">
            Product pillars
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-pf-muted">
            Three jobs, one club. Each pillar maps to a concrete surface in the
            build.
          </p>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {pillars.map((pillar) => (
              <article key={pillar.title}>
                <h3 className="font-display text-xl font-black uppercase text-pf-purple">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-pf-muted">
                  {pillar.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-black/10 bg-[#faf8fc] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl font-black uppercase tracking-tight">
            Scope &amp; honesty
          </h2>
          <ul className="mt-6 space-y-3 text-sm leading-relaxed text-pf-muted">
            <li>
              <strong className="text-pf-ink">In scope:</strong> marketing
              acquisition, join/checkout presentation, session auth, and member
              app shells for Stratham.
            </li>
            <li>
              <strong className="text-pf-ink">Out of scope:</strong> real payment
              capture, PF corporate systems, production member data, and
              official brand assets beyond this concept.
            </li>
            <li>
              <strong className="text-pf-ink">Persistence:</strong> local JSON
              store — intentional for a portfolio build; ready to swap for a
              managed database.
            </li>
          </ul>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl font-black uppercase tracking-tight">
            Engineering posture
          </h2>
          <ul className="mt-6 space-y-2 text-sm text-pf-muted">
            {stack.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-pf-purple" aria-hidden>
                  •
                </span>
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-pf-muted">
            Health check:{" "}
            <Link
              href="/api/health"
              className="font-semibold text-pf-purple underline-offset-2 hover:underline"
            >
              /api/health
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
