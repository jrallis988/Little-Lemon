const actions = [
  {
    title: "Join us",
    copy: "Join a community that helps you grow by helping others grow. Applications are open for the upcoming year.",
    cta: "Get started",
    href: "#mission",
    primary: true,
  },
  {
    title: "Support Civic Bound",
    copy: "When we invest in young people, we ensure their talents and contributions are available to our communities.",
    cta: "Donate",
    href: "#impact",
    primary: false,
  },
  {
    title: "Partner with us",
    copy: "Civic Bound partners with schools, neighborhoods, and local organizations to support community success.",
    cta: "Learn about partnering",
    href: "#approach",
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
            Become the change you want to see
          </h2>
          <p className="mx-auto mt-6 max-w-2xl font-body text-lg text-violet-mist">
            Whether you join a program, support the work, or partner with a
            campus, you help create places where young people can grow with
            dignity and direction.
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
