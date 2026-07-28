export function ChapterCommunity() {
  return (
    <section
      id="community-63"
      className="relative py-20 sm:py-28"
      aria-labelledby="community63-heading"
    >
      <div className="section-shell">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-cobalt-600">
              Chapter 4 · 63 Years of Community
            </p>
            <h2
              id="community63-heading"
              className="mt-3 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl"
              style={{ fontWeight: 700 }}
            >
              Belonging was the original technology.
            </h2>
            <p className="mt-4 font-serif text-lg leading-relaxed text-ink/65 sm:text-xl">
              Meetings, coaching, digital circles, shared encouragement, accountability—community
              has always been the constant.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                "Coach-led workshops—in studio and on screen",
                "Digital communities that hold the in-between days",
                "Shared encouragement over perfection",
                "Accountability that feels like care, not punishment",
              ].map((item) => (
                <li key={item} className="flex gap-3 font-sans text-sm text-ink/70 sm:text-base">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-tide" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <img
              src="/images/campaign/meeting.jpg"
              alt="Friends gathered in community"
              className="h-56 w-full rounded-[1.5rem] object-cover sm:h-72"
              loading="lazy"
            />
            <img
              src="/images/campaign/walk-together.jpg"
              alt="People walking together outdoors"
              className="h-56 w-full rounded-[1.5rem] object-cover sm:mt-10 sm:h-72"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
