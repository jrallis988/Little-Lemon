import { Link } from "react-router-dom";
import usePageMeta from "../hooks/usePageMeta";

function PrivacyPage() {
  usePageMeta({
    title: "Privacy",
    description:
      "How Civic Bound handles information on this demonstration website.",
    path: "/privacy",
  });

  return (
    <section className="border-b border-paper-line bg-paper pb-16 pt-28 md:pb-20 md:pt-32">
      <div className="container max-w-3xl">
        <p className="eyebrow-accent">Legal</p>
        <h1 className="display mt-5 text-4xl md:text-5xl">Privacy</h1>
        <p className="lede mt-5">
          This is a demonstration website. Contact and interest forms do not
          transmit personal data to a server.
        </p>

        <div className="mt-12 space-y-8 font-body leading-relaxed text-charcoal">
          <div>
            <h2 className="font-display text-2xl font-semibold text-charcoal-deep">
              What we collect in this demo
            </h2>
            <p className="mt-3">
              If you use an interest form, the values you type may be stored in
              your browser’s local storage so you can see a success state. That
              data stays on your device and is not sent to Civic Bound, email,
              or a CRM from this prototype.
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold text-charcoal-deep">
              Analytics & cookies
            </h2>
            <p className="mt-3">
              This demo does not load third-party analytics. Fonts may load from
              Google Fonts when you visit the site. A production launch would
              disclose any analytics, advertising, or session tools here.
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold text-charcoal-deep">
              When this goes live
            </h2>
            <p className="mt-3">
              A production privacy policy would cover what we collect, why we
              collect it, retention, sharing with service providers, youth and
              caregiver rights, and how to contact us. For questions about this
              prototype, email{" "}
              <a
                href="mailto:hello@civicbound.example"
                className="text-violet hover:underline"
              >
                hello@civicbound.example
              </a>
              .
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

export default PrivacyPage;
