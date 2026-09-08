import { Link } from "react-router-dom";
import usePageMeta from "../hooks/usePageMeta";

function TermsPage() {
  usePageMeta({
    title: "Terms",
    description:
      "Terms of use for the Civic Bound demonstration website.",
    path: "/terms",
  });

  return (
    <section className="border-b border-paper-line bg-paper pb-16 pt-28 md:pb-20 md:pt-32">
      <div className="container max-w-3xl">
        <p className="eyebrow-accent">Legal</p>
        <h1 className="display mt-5 text-4xl md:text-5xl">Terms of use</h1>
        <p className="lede mt-5">
          Civic Bound on this domain is a nonprofit concept / portfolio
          demonstration, not an official service channel for crisis response.
        </p>

        <div className="mt-12 space-y-8 font-body leading-relaxed text-charcoal">
          <div>
            <h2 className="font-display text-2xl font-semibold text-charcoal-deep">
              Informational only
            </h2>
            <p className="mt-3">
              Hub listings, stories, and pathways are illustrative. Do not rely
              on this site for emergency help. If you or someone you know is in
              immediate danger, contact local emergency services.
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold text-charcoal-deep">
              No professional advice
            </h2>
            <p className="mt-3">
              Content is not medical, legal, or mental-health advice. Mentorship
              and coaching concepts described here are not a substitute for
              licensed care.
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold text-charcoal-deep">
              Acceptable use
            </h2>
            <p className="mt-3">
              Do not misuse forms, scrape content for harm, or impersonate Civic
              Bound. Demo submissions remain on your device.
            </p>
          </div>
        </div>

        <p className="mt-12">
          <Link to="/" className="btn-ghost">
            ← Back home
          </Link>
        </p>
      </div>
    </section>
  );
}

export default TermsPage;
