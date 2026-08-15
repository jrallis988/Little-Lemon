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
    <section id="join" className="section-pad relative overflow-hidden bg-ink">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(91,43,179,0.45),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(200,245,66,0.12),transparent_40%)]" />
      <div className="container relative">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Take part</p>
          <h2 className="display mt-4 text-4xl md:text-6xl">
            Local hubs. Real mentorship.{" "}
            <span className="text-chartreuse">Forward motion.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl font-body text-lg text-violet-mist">
            Whether you need support, offer guidance, or strengthen a resource
            hub—Civic Bound keeps the door open. No red tape. Completely
            confidential. Zero fees.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {actions.map((action) => (
            <div
              key={action.title}
              className="flex flex-col border border-violet-bright/25 bg-ink-soft/60 p-7 md:p-8"
            >
              <h3 className="font-display text-2xl font-bold text-white">
                {action.title}
              </h3>
              <p className="mt-4 flex-1 font-body leading-relaxed text-violet-mist">
                {action.copy}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {action.tags.map((tag) => (
                  <li
                    key={tag}
                    className="border border-chartreuse/35 px-2.5 py-1 font-body text-[11px] font-semibold uppercase tracking-[0.12em] text-chartreuse"
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
