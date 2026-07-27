import { philosophyLinks } from "../../data/ww63";

export function PhilosophyMatrix() {
  return (
    <section id="philosophy" className="py-20 sm:py-28" aria-labelledby="philosophy-heading">
      <div className="section-shell">
        <div className="max-w-2xl">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-cobalt-600">
            Philosophy matrix
          </p>
          <h2
            id="philosophy-heading"
            className="mt-3 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl"
            style={{ fontWeight: 700 }}
          >
            The living room still runs the loop.
          </h2>
          <p className="mt-4 font-serif text-lg leading-relaxed text-ink/65 sm:text-xl">
            How Jean’s peer-support model maps onto today’s digital habit systems—same human
            need, new interface.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-[1.75rem] border border-ink/8">
          <div className="grid bg-mist/80 font-sans text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-ink/45 sm:grid-cols-2">
            <p className="border-b border-ink/8 px-5 py-3 sm:border-b-0 sm:border-r">Then · 1961</p>
            <p className="px-5 py-3">Now · digital habit loops</p>
          </div>

          <ul>
            {philosophyLinks.map((link, index) => (
              <li
                key={link.id}
                className={`grid sm:grid-cols-2 ${
                  index !== philosophyLinks.length - 1 ? "border-b border-ink/8" : ""
                }`}
              >
                <div className="border-b border-ink/8 px-5 py-6 sm:border-b-0 sm:border-r sm:px-6 sm:py-8">
                  <p className="font-display text-xl font-bold text-ink" style={{ fontWeight: 700 }}>
                    {link.origin}
                  </p>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-ink/60">
                    {link.originDetail}
                  </p>
                </div>
                <div className="bg-white px-5 py-6 sm:px-6 sm:py-8">
                  <div className="mb-3 h-1 w-12 origin-left animate-fill-bar rounded-full bg-gradient-to-r from-cobalt-600 to-tide" />
                  <p className="font-display text-xl font-bold text-cobalt-700" style={{ fontWeight: 700 }}>
                    {link.modern}
                  </p>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-ink/60">
                    {link.modernDetail}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
