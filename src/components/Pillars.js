const pillars = [
  {
    label: "Belong",
    title: "Places to grow together",
    copy: "Neighborhood hubs, camps, sports, and family programs where unlikely friendships form and every generation finds a place—the everyday fabric of stronger communities.",
    image: "/images/pillar-belong.jpg",
    alt: "Teens playing together outdoors near a lake",
  },
  {
    label: "Become",
    title: "Support that meets students where they learn",
    copy: "Near-peer coaches and mentors partner with schools and hubs so young people build attendance, confidence, and durable skills for who they’ll be tomorrow.",
    image: "/images/pillar-become.jpg",
    alt: "A mentor helping a student with schoolwork",
  },
  {
    label: "Balance",
    title: "Mental wellbeing without oversimplification",
    copy: "We listen to parents and youth about technology, isolation, and stress—then advance nuanced solutions that protect wellbeing without pretending one ban fixes everything.",
    image: "/images/pillar-balance.jpg",
    alt: "A young person talking with a counselor outdoors",
  },
];

function Pillars() {
  return (
    <section id="pillars" className="section-pad bg-paper">
      <div className="container">
        <div className="max-w-3xl">
          <p className="eyebrow-accent">How we help</p>
          <h2 className="display mt-5 text-3xl md:text-5xl">
            Belong. Become. Balance.
          </h2>
          <p className="lede mt-5">
            Three connected pillars—community belonging, education and service,
            and honest dialogue about mental health—woven into every Civic Bound
            hub.
          </p>
        </div>

        <div className="mt-14 space-y-0">
          {pillars.map((pillar, index) => (
            <article
              key={pillar.label}
              className={`grid items-center gap-8 border-t border-paper-line py-12 md:grid-cols-2 md:gap-12 ${
                index === pillars.length - 1 ? "border-b" : ""
              }`}
            >
              <div
                className={`overflow-hidden border border-paper-line ${
                  index % 2 === 1 ? "md:order-2" : ""
                }`}
              >
                <img
                  src={pillar.image}
                  alt={pillar.alt}
                  className="aspect-[4/3] h-full w-full object-cover transition duration-700 hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
              <div>
                <p className="micro-label text-chartreuse">{pillar.label}</p>
                <h3 className="mt-3 font-display text-2xl font-semibold text-charcoal-deep md:text-3xl">
                  {pillar.title}
                </h3>
                <p className="mt-4 max-w-md font-body leading-relaxed text-charcoal">
                  {pillar.copy}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Pillars;
