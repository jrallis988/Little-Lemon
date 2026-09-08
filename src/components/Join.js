import { Link } from "react-router-dom";

const actions = [
  {
    title: "Find youth support",
    copy: "Walk into a Neighborhood Resource Hub or use Find Your Track. Support starts with you—no forms maze, no gatekeeping.",
    cta: "Get support",
    to: "/get-support",
    primary: true,
    tags: ["No red tape", "Completely confidential", "Zero fees"],
  },
  {
    title: "Become a volunteer",
    copy: "Hub-centered roles—Doers, Guides, and Anchors—with clear boundaries. No chaperone model. No court-ordered oversight.",
    cta: "See volunteer boundaries",
    to: "/volunteers",
    primary: false,
    tags: ["Hub-bound", "Group-centered", "No red tape"],
  },
  {
    title: "Strengthen a hub",
    copy: "Help keep drop-in spaces, creative labs, and stability navigation open to every young person who needs them.",
    cta: "Explore hubs",
    to: "/hubs",
    primary: false,
    tags: ["Transparent impact", "Community-rooted", "Zero barriers"],
  },
];

function Join() {
  return (
    <section id="join" className="section-pad bg-paper">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow-accent">Take part</p>
          <h2 className="display mt-5 text-3xl md:text-5xl">
            Local hubs. Real mentorship. Forward motion.
          </h2>
          <p className="lede mt-5">
            Whether you need support, offer guidance, or strengthen a resource
            hub—Civic Bound keeps the door open. No red tape. Completely
            confidential. Zero fees.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {actions.map((action) => (
            <div key={action.title} className="surface-card flex flex-col p-8">
              <h3 className="font-display text-2xl font-semibold text-charcoal-deep">
                {action.title}
              </h3>
              <p className="mt-4 flex-1 font-body leading-relaxed text-charcoal">
                {action.copy}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {action.tags.map((tag) => (
                  <li
                    key={tag}
                    className="border border-paper-line px-2.5 py-1 font-body text-[11px] font-semibold uppercase tracking-[0.12em] text-charcoal-soft"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
              <Link
                to={action.to}
                className={`mt-7 inline-flex w-fit ${
                  action.primary ? "btn-primary" : "btn-ghost"
                }`}
              >
                {action.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Join;
