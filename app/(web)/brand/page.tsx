import type { Metadata } from "next";
import Link from "next/link";
import {
  COLOR_PALETTE,
  GRADIENT_NOTES,
  PALETTE_TEXT_BOX,
  TYPE_BIBLIOGRAPHY,
} from "@/lib/brand";

export const metadata: Metadata = {
  title: "Brand · Colors & Type",
  description:
    "Planet Fitness acquisition site color palette and type bibliography.",
};

export default function BrandPage() {
  return (
    <div className="bg-white text-pf-ink">
      <section className="border-b border-pf-line bg-pf-mist">
        <div className="mx-auto max-w-5xl px-4 py-10 md:px-6 md:py-14">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-pf-purple">
            Design system
          </p>
          <h1 className="mt-2 font-display text-4xl tracking-tight md:text-6xl">
            Colors &amp; type bibliography
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-pf-ink/65 md:text-base">
            Tokens powering the public website screens — welcome hero, memberships,
            Judgement Free Zone® app promo, workout guides, get started, and
            footer.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link
              href="/"
              className="inline-flex h-11 items-center rounded-full bg-pf-btn px-5 text-sm font-semibold text-white"
            >
              View homepage
            </Link>
            <Link
              href="/#brand-bar"
              className="inline-flex h-11 items-center rounded-full border border-pf-purple px-5 text-sm font-semibold text-pf-purple"
            >
              Jump to on-page brand bar
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-10 md:px-6 md:py-12">
        <h2 className="font-display text-3xl tracking-tight">Color palette</h2>
        <p className="mt-2 text-sm text-pf-ink/65">
          Swatches map 1:1 to CSS variables in{" "}
          <code className="rounded bg-pf-mist px-1">app/globals.css</code>.
        </p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {COLOR_PALETTE.map((color) => (
            <li
              key={color.token}
              className="overflow-hidden rounded-2xl border border-pf-line bg-white shadow-sm"
            >
              <div
                className="h-20 w-full border-b border-pf-line"
                style={{ backgroundColor: color.hex }}
                aria-hidden
              />
              <div className="p-3">
                <p className="font-mono text-xs font-semibold text-pf-purple">
                  {color.token}
                </p>
                <p className="mt-0.5 font-mono text-sm text-pf-ink">{color.hex}</p>
                <p className="mt-1 text-xs text-pf-ink/60">{color.role}</p>
              </div>
            </li>
          ))}
        </ul>

        <div
          id="brand-bar"
          className="mt-8 h-16 w-full rounded-2xl shadow-inner"
          style={{
            backgroundImage:
              "linear-gradient(90deg, #5f259f 0%, #7a2fb8 42%, #ffb81c 100%)",
          }}
          aria-label="Brand gradient bar from purple to gold"
        />
        <ul className="mt-3 space-y-1 text-sm text-pf-ink/65">
          {GRADIENT_NOTES.map((note) => (
            <li key={note}>· {note}</li>
          ))}
        </ul>
      </section>

      <section className="border-y border-pf-line bg-pf-mist">
        <div className="mx-auto max-w-5xl px-4 py-10 md:px-6 md:py-12">
          <h2 className="font-display text-3xl tracking-tight">
            Type bibliography
          </h2>
          <p className="mt-2 text-sm text-pf-ink/65">
            Loaded via{" "}
            <code className="rounded bg-white px-1">next/font/google</code> in
            the root layout.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {TYPE_BIBLIOGRAPHY.map((face) => (
              <article
                key={face.name}
                className="rounded-3xl border border-pf-line bg-white p-5 shadow-sm"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-pf-purple">
                  {face.role}
                </p>
                <h3
                  className={
                    face.css === "font-display"
                      ? "mt-2 font-display text-3xl tracking-tight"
                      : "mt-2 font-sans text-2xl font-semibold tracking-tight"
                  }
                >
                  {face.name}
                </h3>
                <p className="mt-1 font-mono text-xs text-pf-ink/55">
                  {face.css} · {face.weights}
                </p>
                <p className="mt-3 text-sm text-pf-ink/70">{face.usage}</p>
                <p
                  className={
                    face.css === "font-display"
                      ? "mt-4 rounded-2xl bg-pf-mist px-3 py-3 font-display text-xl uppercase tracking-tight text-pf-ink"
                      : "mt-4 rounded-2xl bg-pf-mist px-3 py-3 text-sm text-pf-ink/80"
                  }
                >
                  {face.css === "font-display" ? (
                    <>
                      A PLACE WHERE{" "}
                      <span className="text-pf-purple">EVERYONE</span> FEELS
                      WELCOME
                    </>
                  ) : (
                    face.sample
                  )}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-10 md:px-6 md:py-12">
        <h2 className="font-display text-3xl tracking-tight">
          Reference text box
        </h2>
        <p className="mt-2 text-sm text-pf-ink/65">
          Copy-ready summary of palette + type.
        </p>
        <pre className="mt-4 overflow-x-auto rounded-3xl border border-pf-line bg-pf-purple-ink p-5 text-left text-[11px] leading-relaxed text-white/90 md:text-xs">
          {PALETTE_TEXT_BOX}
        </pre>
      </section>
    </div>
  );
}
