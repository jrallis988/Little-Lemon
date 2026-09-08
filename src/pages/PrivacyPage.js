import { Link } from "react-router-dom";

const sections = [
  {
    title: "Who we are",
    body: "Civic Bound is a nonprofit, youth-centered community support network. This Privacy Policy explains what information we collect on our website, how we use it, and the choices available to you.",
  },
  {
    title: "Information we collect",
    body: "We may collect information you voluntarily provide—such as your name, email address, message content, and hub search queries—when you contact us, use Find Your Track, or ask about volunteering. We may also collect standard technical data (browser type, pages visited, approximate location) through hosting and analytics tools.",
  },
  {
    title: "How we use information",
    body: "We use contact details to respond to inquiries, connect people with hubs or partners when requested, improve the website, and maintain safety and security. We do not sell personal information. We do not use youth contact details for marketing unrelated to Civic Bound services.",
  },
  {
    title: "Youth and safeguarding",
    body: "Civic Bound is designed for young people and families. We ask adults and volunteers to share only what is needed. Hub staff and volunteers follow a two-adult / hub-bound culture. If we believe someone is in immediate danger, we may share limited information with emergency services as required by law.",
  },
  {
    title: "Sharing",
    body: "We may share information with trusted service providers who help us operate the site (for example hosting or email delivery), with coalition partners only when you ask us to make an introduction, or when required by law. Professional hand-offs for housing, clinical, or legal needs are made with consent whenever possible.",
  },
  {
    title: "Cookies and analytics",
    body: "Our site may use essential cookies for basic function and optional privacy-respecting analytics to understand aggregate traffic. You can control cookies through your browser settings.",
  },
  {
    title: "Data retention",
    body: "We keep contact messages and related records only as long as needed to respond, meet legal obligations, or improve services—then delete or anonymize them.",
  },
  {
    title: "Your choices",
    body: "You may request access, correction, or deletion of personal information we hold about you by emailing hello@civicbound.org. Some requests may be limited by law or safety requirements.",
  },
  {
    title: "Contact",
    body: "Questions about this policy: hello@civicbound.org. For crisis support, call 911 or 988. This page is a public-facing summary and may be updated as our practices evolve.",
  },
];

function PrivacyPage() {
  return (
    <>
      <section className="border-b border-paper-line bg-paper pb-14 pt-28 md:pb-16 md:pt-32">
        <div className="container">
          <p className="eyebrow-accent">Legal</p>
          <h1 className="display mt-5 max-w-4xl text-4xl md:text-6xl">
            Privacy Policy
          </h1>
          <p className="lede mt-5 max-w-2xl">
            Dignity first. We collect only what we need to support young people
            and keep the network accountable.
          </p>
          <p className="mt-4 font-body text-sm text-charcoal-soft">
            Last updated: September 8, 2026
          </p>
        </div>
      </section>

      <section className="section-pad bg-paper-soft">
        <div className="container max-w-3xl space-y-10">
          {sections.map((section) => (
            <article key={section.title}>
              <h2 className="font-display text-2xl font-semibold text-charcoal-deep">
                {section.title}
              </h2>
              <p className="mt-3 font-body leading-relaxed text-charcoal">
                {section.body}
              </p>
            </article>
          ))}
          <div className="border-t border-paper-line pt-8">
            <Link to="/contact" className="btn-primary">
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default PrivacyPage;
