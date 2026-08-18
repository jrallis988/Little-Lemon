import type { Metadata } from "next";
import Link from "next/link";
import { candidate } from "@/lib/candidate";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LegalReviewBanner } from "@/components/LegalReviewBanner";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${candidate.committee} collects, uses, and protects your personal information.`,
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl section-pad">
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { label: "Privacy Policy" },
        ]}
      />
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-red">
        Legal
      </p>
      <h1 className="mt-2 font-display text-4xl font-bold text-ink">
        Privacy Policy
      </h1>
      <p className="mt-4 text-slate-muted">Last Updated: July 28, 2026</p>

      <div className="mt-8">
        <LegalReviewBanner />
      </div>

      <div className="mt-6 space-y-6 text-base leading-relaxed text-slate-text">
        <p className="border border-slate-line bg-paper px-4 py-3 text-sm text-slate-muted">
          Demo status: this Privacy Policy is draft display copy. References to
          analytics and form processing describe intended future behavior; this
          preview build does not load live analytics pixels/SDKs, and mock forms
          do not persist submissions.
        </p>
        <p>
          Welcome to the official campaign website for {candidate.fullName}.{" "}
          {candidate.committee} (“we,” “us,” or “the campaign”) respects your
          privacy and is committed to protecting your personal information. This
          Privacy Policy outlines how we collect, use, disclose, and safeguard
          your data when you visit this website or interact with our campaign
          forms and communications.
        </p>

        <h2 className="font-display text-2xl font-bold text-ink">
          1. Information We Collect
        </h2>
        <p>
          We collect information that helps us run an open, accessible campaign,
          respond to supporters, and improve this website. This includes:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="font-semibold text-ink">
              Personal identification information:
            </strong>{" "}
            When you join Team Varga, volunteer, request a town visit, or contact
            us, we may collect your name, email address, phone number, ZIP code,
            mailing address, and the contents of your message.
          </li>
          <li>
            <strong className="font-semibold text-ink">
              Engagement details:
            </strong>{" "}
            Information related to volunteer interests, town-visit requests, and
            other preferences you choose to share.
          </li>
          <li>
            <strong className="font-semibold text-ink">
              Payment &amp; financial data:
            </strong>{" "}
            This website does not currently collect donations or credit card
            information. If we later process contributions online, payment details
            will be handled by trusted, PCI-compliant third-party processors. We
            will not store raw credit card numbers on our local servers.
          </li>
          <li>
            <strong className="font-semibold text-ink">
              Technical &amp; usage data:
            </strong>{" "}
            When you browse our website, our servers or analytics tools may
            collect standard log data, including your IP address, browser type,
            device information, referring pages, and the pages you visit.
          </li>
        </ul>

        <h2 className="font-display text-2xl font-bold text-ink">
          2. How We Use Your Information
        </h2>
        <p>We use the information we collect for these operational purposes:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="font-semibold text-ink">
              Campaign coordination:
            </strong>{" "}
            To manage volunteer sign-ups, town visits, contact requests, and other
            supporter interactions.
          </li>
          <li>
            <strong className="font-semibold text-ink">Customer support:</strong>{" "}
            To respond to your inquiries and resolve issues promptly.
          </li>
          <li>
            <strong className="font-semibold text-ink">
              Website improvement:
            </strong>{" "}
            To analyze site traffic, monitor usability, and optimize layout,
            performance, and accessibility.
          </li>
          <li>
            <strong className="font-semibold text-ink">
              Updates (with consent):
            </strong>{" "}
            To send campaign news and event information you opted into. You can
            opt out of marketing or update emails at any time.
          </li>
          <li>
            <strong className="font-semibold text-ink">Legal compliance:</strong>{" "}
            To comply with applicable law, including federal campaign finance
            rules where they apply.
          </li>
        </ul>

        <h2 className="font-display text-2xl font-bold text-ink">
          3. How We Share Your Information
        </h2>
        <p>
          We do not sell, trade, or rent your personal information to third
          parties. We may share your data only under limited circumstances:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="font-semibold text-ink">Service providers:</strong>{" "}
            With trusted vendors who help operate this website, send email or text
            messages, host forms, or provide analytics — provided those parties
            agree to keep this information confidential and use it only for
            campaign-related services.
          </li>
          <li>
            <strong className="font-semibold text-ink">Legal compliance:</strong>{" "}
            When required by law, subpoena, or legal process, or to protect the
            rights, property, and safety of the campaign, our supporters, or the
            public.
          </li>
        </ul>

        <h2 className="font-display text-2xl font-bold text-ink">
          4. Data Security
        </h2>
        <p>
          We implement administrative, technical, and organizational measures
          designed to protect your personal information from unauthorized access,
          alteration, disclosure, or destruction. While we strive to use
          commercially acceptable means to protect your data, no method of
          transmission over the internet is 100% secure.
        </p>

        <h2 className="font-display text-2xl font-bold text-ink">
          5. Cookies and Tracking Technologies
        </h2>
        <p>
          Our website may use cookies and similar technologies to keep the site
          working, remember accessibility preferences on your device, process form
          submissions, and analyze site traffic. On your first visit, we ask for
          cookie consent. You may accept all cookies or continue with essential
          cookies only. You can also control cookies through your browser
          settings, though disabling them may impact certain functional areas of
          the site.
        </p>
        <p>
          If you use Live Campaign Support or leave a chat message, we may store
          your name, email, and message content to respond. Do not submit Social
          Security numbers, passwords, or payment card details through chat.
          Human live chat may use third-party tools when enabled; those providers
          will be disclosed here when connected.
        </p>

        <h2 className="font-display text-2xl font-bold text-ink">
          6. Text Messages
        </h2>
        <p>
          If you provide a cell phone number, you may receive periodic texts from
          the campaign. Message and data rates may apply. Text HELP for info.
          Text STOP to opt out.
        </p>

        <h2 className="font-display text-2xl font-bold text-ink">
          7. Children&apos;s Privacy
        </h2>
        <p>
          Our website and services are not directed toward individuals under the
          age of 18. We do not knowingly collect personal information from minors.
          If you believe we have inadvertently collected information from a
          minor, please contact us immediately so we can remove it.
        </p>

        <h2 className="font-display text-2xl font-bold text-ink">
          8. Your Data Rights
        </h2>
        <p>Depending on your jurisdiction, you may have the right to:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Access the personal information we hold about you.</li>
          <li>Request the correction of inaccurate or incomplete data.</li>
          <li>
            Request the deletion of your personal information, subject to legal
            and operational retention requirements (including campaign finance
            recordkeeping where applicable).
          </li>
        </ul>

        <h2 className="font-display text-2xl font-bold text-ink">
          9. Changes to This Privacy Policy
        </h2>
        <p>
          We may update this Privacy Policy periodically to reflect changes in
          our practices, technology, or legal obligations. Any updates will be
          posted on this page with a revised “Last Updated” date. We encourage
          you to review this policy whenever you visit our site.
        </p>

        <h2 className="font-display text-2xl font-bold text-ink">
          10. Contact Us
        </h2>
        <p>
          If you have questions, concerns, or requests regarding this Privacy
          Policy or how your data is handled, contact us at{" "}
          <a
            href={`mailto:${candidate.email}`}
            className="font-semibold text-red underline-offset-2 hover:underline"
          >
            {candidate.email}
          </a>
          {candidate.phone ? `, call ${candidate.phone},` : ""} or use the{" "}
          <Link
            href="/contact"
            className="font-semibold text-red underline-offset-2 hover:underline"
          >
            Contact
          </Link>{" "}
          page
          {candidate.mailAddress ? `. Mail: ${candidate.mailAddress}` : ""}.
        </p>
      </div>

      <p className="mt-12">
        <Link
          href="/"
          className="font-semibold text-red underline-offset-2 hover:underline"
        >
          ← Back to home
        </Link>
      </p>
    </article>
  );
}
