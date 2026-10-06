import { Link } from "react-router-dom";

const actions = [
  {
    title: "Serve",
    copy: "Spend a year coaching students and growing alongside a team that shows up for kids every day—durable skills, real impact.",
    cta: "Apply to serve",
    to: "/volunteers",
    primary: true,
    tags: ["Student coaching", "Year of service", "Skill-building"],
  },
  {
    title: "Get support",
    copy: "Walk into a Neighborhood Resource Hub or use Find Your Track. Support starts with you—no forms maze, no gatekeeping.",
    cta: "Find Your Track",
    to: "/get-support",
    primary: false,
    tags: ["No red tape", "Confidential", "Zero fees"],
  },
  {
    title: "Give & partner",
    copy: "Invest in mentorship, after-school belonging, and wellbeing workshops—or partner with schools and employers to expand hubs.",
    cta: "Explore partners",
    to: "/partners",
    primary: false,
    tags: ["Transparent impact", "Schools", "Employers"],
  },
];

function Join() {
  return (
    <section id="join" className="section-pad bg-charcoal-deep text-white">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow-accent !text-chartreuse after:!bg-chartreuse">
            Take action
          </p>
          <h2 className="display mt-5 text-3xl text-white md:text-5xl">
            Become the change you want to see
          </h2>
          <p className="mt-5 font-body text-lg leading-relaxed text-white/80">
            Join a year of service, find local support, or partner with
            neighborhoods investing in young people.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {actions.map((action) => (
            <div
              key={action.title}
              className="flex flex-col border border-white/15 bg-white/5 p-8 transition hover:bg-white/10"
            >
              <h3 className="font-display text-2xl font-semibold text-white">
                {action.title}
              </h3>
              <p className="mt-4 flex-1 font-body leading-relaxed text-white/80">
                {action.copy}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {action.tags.map((tag) => (
                  <li
                    key={tag}
                    className="border border-white/20 px-2.5 py-1 font-body text-[11px] font-semibold uppercase tracking-[0.12em] text-white/70"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
              <Link
                to={action.to}
                className={`mt-7 inline-flex w-fit ${
                  action.primary
                    ? "btn-primary"
                    : "inline-flex items-center justify-center rounded-sm border border-white/55 bg-transparent px-6 py-3 font-body text-sm font-semibold tracking-wide text-white transition hover:border-white hover:bg-white/10"
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
