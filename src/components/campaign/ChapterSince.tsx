import { useInView } from "../../hooks/motion";

export function ChapterSince() {
  const { ref, visible } = useInView<HTMLElement>(0.2);

  return (
    <section
      id="since-1963"
      ref={ref}
      className="relative overflow-hidden bg-ink py-20 text-white sm:py-28"
      aria-labelledby="since-heading"
    >
      <div className="section-shell relative">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-tide">
          Chapter 1 · Since 1963
        </p>
        <h2
          id="since-heading"
          className={`mt-3 max-w-3xl font-display text-4xl font-bold tracking-tight sm:text-5xl transition duration-700 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
          style={{ fontWeight: 700 }}
        >
          It started with honesty in a Queens living room.
        </h2>
        <p
          className={`mt-4 max-w-2xl font-serif text-lg leading-relaxed text-white/70 sm:text-xl transition delay-100 duration-700 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          Community. Support. Hope. Real people helping one another—long before apps, Points, or
          clinics. Weight Watchers was never the hero. The people were.
        </p>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="overflow-hidden rounded-[1.75rem]">
            <img
              src="/images/archive/living-room.jpg"
              alt="A warm living room that evokes the first peer-support gatherings"
              className="h-72 w-full object-cover grayscale sm:h-[28rem]"
              loading="lazy"
            />
          </div>
          <div className="grid gap-4">
            {[
              {
                title: "Community",
                copy: "Friends naming cravings without shame—accountability as belonging.",
                image: "/images/campaign/meeting.jpg",
              },
              {
                title: "Support",
                copy: "A weekly ritual of showing up, even when the week was messy.",
                image: "/images/campaign/family-cook.jpg",
              },
              {
                title: "Hope",
                copy: "400 people lined up above a Queens theater—because someone finally listened.",
                image: "/images/campaign/coaching.jpg",
              },
            ].map((item, index) => (
              <article
                key={item.title}
                className={`grid grid-cols-[7rem_1fr] overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition duration-700 ${
                  visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: `${200 + index * 120}ms` }}
              >
                <img src={item.image} alt="" className="h-full w-full object-cover" loading="lazy" />
                <div className="p-4 sm:p-5">
                  <h3 className="font-display text-xl font-bold" style={{ fontWeight: 700 }}>
                    {item.title}
                  </h3>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-white/65">{item.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
