const actions = [
  {
    title: "Find youth support",
    copy: "Connect with a neighborhood youth development program or guidance resource near you.",
    cta: "Get support",
    href: "#approach",
    primary: true,
  },
  {
    title: "Become a mentor",
    copy: "Join a civic partnership and mentorship initiative that puts young people first.",
    cta: "Mentor with us",
    href: "#mission",
    primary: false,
  },
  {
    title: "Strengthen a hub",
    copy: "Support Youth Guidance and Family Resource Centers that make community re-entry safer and more stable.",
    cta: "Support the work",
    href: "#impact",
    primary: false,
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
            hub, you help young people rebuild life direction with dignity.
          </p>
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {actions.map((action) => (
            <div
              key={action.title}
              className="border-t border-violet-bright/30 pt-8"
            >
              <h3 className="font-display text-2xl font-bold text-white">
                {action.title}
              </h3>
              <p className="mt-4 font-body leading-relaxed text-violet-mist">
                {action.copy}
              </p>
              <a
                href={action.href}
                className={`mt-6 inline-flex ${
                  action.primary ? "btn-primary" : "btn-ghost"
                }`}
              >
                {action.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Join;
