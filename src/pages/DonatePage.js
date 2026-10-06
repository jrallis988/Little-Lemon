import { Link } from "react-router-dom";

const impacts = [
  {
    title: "Keep hubs open",
    copy: "Drop-in rooms, chill zones, and evening hours stay free for every young person who walks in.",
  },
  {
    title: "Fund mentorship circles",
    copy: "Training and materials for Doers, Guides, and Anchors who show up because they choose to.",
  },
  {
    title: "Stability navigation",
    copy: "Practical help mapping housing, school, work, and family resources—without trapping anyone in red tape.",
  },
];

const amounts = [
  { value: 25, label: "Open-studio supplies for one night" },
  { value: 75, label: "A week of evening drop-in coverage" },
  { value: 150, label: "Peer mentor circle materials" },
  { value: 500, label: "A month of stability navigation support" },
];

function DonatePage() {
  return (
    <>
      <section className="border-b border-paper-line bg-paper pb-14 pt-28 md:pb-16 md:pt-32">
        <div className="container">
          <p className="eyebrow-accent">Give</p>
          <h1 className="display mt-5 max-w-4xl text-4xl md:text-6xl">
            Strengthen the network young people rely on
          </h1>
          <p className="lede mt-5 max-w-2xl">
            Gifts keep Neighborhood Resource Hubs open, mentorship circles
            running, and stability navigation free—zero fees for youth and
            families.
          </p>
        </div>
      </section>

      <section className="section-pad bg-paper-soft">
        <div className="container">
          <h2 className="display text-3xl md:text-4xl">Where giving goes</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {impacts.map((item) => (
              <article key={item.title} className="surface-card p-7">
                <h3 className="font-display text-xl font-semibold text-charcoal-deep">
                  {item.title}
                </h3>
                <p className="mt-3 font-body leading-relaxed text-charcoal">
                  {item.copy}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-paper">
        <div className="container grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="display text-3xl md:text-4xl">Suggested gifts</h2>
            <p className="lede mt-4">
              Every amount helps. Choose a level that fits—or reach out to talk
              about monthly or major giving.
            </p>
            <ul className="mt-8 space-y-3">
              {amounts.map((amount) => (
                <li
                  key={amount.value}
                  className="flex items-start gap-4 border border-paper-line bg-paper-soft px-5 py-4"
                >
                  <span className="font-display text-2xl font-semibold text-violet">
                    ${amount.value}
                  </span>
                  <span className="font-body leading-relaxed text-charcoal">
                    {amount.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="surface-card p-8">
            <h2 className="display text-3xl">How to give</h2>
            <p className="mt-4 font-body leading-relaxed text-charcoal">
              Online checkout can be connected to your preferred processor
              (Stripe, PayPal, or a nonprofit giving platform). Until then,
              start a gift conversation by email—we’ll send secure next steps.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="mailto:give@civicbound.org?subject=I%20want%20to%20support%20Civic%20Bound"
                className="btn-primary"
              >
                Email give@civicbound.org
              </a>
              <Link to="/contact" className="btn-ghost">
                Contact the team
              </Link>
            </div>
            <ul className="mt-8 space-y-2 border-t border-paper-line pt-6 font-body text-sm text-charcoal-soft">
              <li>Civic Bound is a nonprofit organization.</li>
              <li>EIN and donation receipt details available upon request.</li>
              <li>
                Questions about restricted gifts or sponsorships:{" "}
                <a
                  href="mailto:hello@civicbound.org"
                  className="text-violet hover:underline"
                >
                  hello@civicbound.org
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

export default DonatePage;
