import { useState } from "react";
import { Link } from "react-router-dom";

const channels = [
  {
    title: "Email",
    detail: "hello@civicbound.org",
    copy: "General questions, partnership inquiries, and hub referrals.",
    href: "mailto:hello@civicbound.org",
  },
  {
    title: "Youth support line",
    detail: "(555) 014-2200",
    copy: "Weekdays 2–8pm. For urgent safety needs, call 911 or 988.",
    href: "tel:+15550142200",
  },
  {
    title: "Mailing address",
    detail: "Civic Bound · Community Network Office",
    copy: "120 River Ward Ave, Suite 200 · Providence, RI 02903",
    href: null,
  },
];

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <section className="border-b border-paper-line bg-paper pb-14 pt-28 md:pb-16 md:pt-32">
        <div className="container">
          <p className="eyebrow-accent">Contact</p>
          <h1 className="display mt-5 max-w-4xl text-4xl md:text-6xl">
            Talk with Civic Bound
          </h1>
          <p className="lede mt-5 max-w-2xl">
            Reach a real person—no intake maze. For immediate youth support,
            visit a{" "}
            <Link to="/hubs" className="text-violet hover:underline">
              Neighborhood Resource Hub
            </Link>{" "}
            or start with{" "}
            <Link to="/get-support" className="text-violet hover:underline">
              Find Your Track
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="section-pad bg-paper-soft">
        <div className="container grid gap-10 lg:grid-cols-2">
          <div className="space-y-5">
            {channels.map((channel) => (
              <article key={channel.title} className="surface-card p-7">
                <p className="micro-label text-chartreuse">{channel.title}</p>
                {channel.href ? (
                  <a
                    href={channel.href}
                    className="mt-3 block font-display text-2xl font-semibold text-charcoal-deep hover:text-violet"
                  >
                    {channel.detail}
                  </a>
                ) : (
                  <p className="mt-3 font-display text-2xl font-semibold text-charcoal-deep">
                    {channel.detail}
                  </p>
                )}
                <p className="mt-2 font-body leading-relaxed text-charcoal">
                  {channel.copy}
                </p>
              </article>
            ))}
            <p className="font-body text-sm text-charcoal-soft">
              Civic Bound is a nonprofit organization. Crisis support is not a
              substitute for emergency services—call 911 or 988 when someone is
              in immediate danger.
            </p>
          </div>

          <div className="surface-card p-8">
            <h2 className="display text-3xl">Send a message</h2>
            <p className="mt-3 font-body leading-relaxed text-charcoal">
              Partnerships, volunteering, press, or general questions. We aim to
              reply within two business days.
            </p>

            {sent ? (
              <div className="mt-8 border border-paper-line bg-paper px-5 py-6">
                <p className="font-display text-xl font-semibold text-charcoal-deep">
                  Message noted
                </p>
                <p className="mt-2 font-body text-charcoal">
                  Thanks for reaching out. Prefer email? Write{" "}
                  <a
                    href="mailto:hello@civicbound.org"
                    className="text-violet hover:underline"
                  >
                    hello@civicbound.org
                  </a>
                  .
                </p>
                <button
                  type="button"
                  className="btn-ghost mt-6"
                  onClick={() => setSent(false)}
                >
                  Send another
                </button>
              </div>
            ) : (
              <form
                className="mt-8 space-y-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <div>
                  <label
                    htmlFor="contact-name"
                    className="font-body text-sm font-semibold text-charcoal-deep"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    required
                    className="mt-2 w-full border border-paper-line bg-paper px-4 py-3 font-body text-charcoal outline-none focus:border-violet"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="font-body text-sm font-semibold text-charcoal-deep"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    className="mt-2 w-full border border-paper-line bg-paper px-4 py-3 font-body text-charcoal outline-none focus:border-violet"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-topic"
                    className="font-body text-sm font-semibold text-charcoal-deep"
                  >
                    Topic
                  </label>
                  <select
                    id="contact-topic"
                    name="topic"
                    className="mt-2 w-full border border-paper-line bg-paper px-4 py-3 font-body text-charcoal outline-none focus:border-violet"
                    defaultValue="general"
                  >
                    <option value="general">General question</option>
                    <option value="support">Youth / family support</option>
                    <option value="volunteer">Volunteering</option>
                    <option value="partner">Partnership</option>
                    <option value="press">Press / media</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="contact-message"
                    className="font-body text-sm font-semibold text-charcoal-deep"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    className="mt-2 w-full border border-paper-line bg-paper px-4 py-3 font-body text-charcoal outline-none focus:border-violet"
                  />
                </div>
                <button type="submit" className="btn-primary">
                  Send message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default ContactPage;
