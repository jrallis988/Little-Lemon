const credits = [
  { role: "Focus", value: "Live-Action Features & Series" },
  { role: "Model", value: "Independent Production" },
  { role: "Territory", value: "East Coast, USA" },
  { role: "Stages", value: "Development → Delivery" },
];

export default function Studio() {
  return (
    <section id="studio" className="scroll-mt-24 border-t border-white/10">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 py-20 md:grid-cols-12 md:gap-10 md:px-8 md:py-28">
        <div className="md:col-span-5">
          <p className="mb-3 font-[family-name:var(--font-credit)] text-sm tracking-[0.3em] text-accent uppercase">
            The Studio
          </p>
          <h2 className="font-display text-4xl leading-tight text-foreground md:text-5xl">
            Built like a film company—not a content brand.
          </h2>
        </div>

        <div className="md:col-span-7 md:pt-8">
          <p className="text-lg leading-relaxed text-foreground/90 md:text-xl">
            The East Coast Motion Picture Company develops and produces
            live-action cinema with a lean slate, serious crews, and stories
            drawn from the Atlantic seaboard.
          </p>
          <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">
            We work outside the franchise machine. Fewer titles. Clearer intent.
            Production rooted in place.
          </p>

          <dl className="mt-12 grid gap-0 border-t border-white/10 sm:grid-cols-2">
            {credits.map((credit) => (
              <div
                key={credit.role}
                className="border-b border-white/10 px-0 py-5 sm:odd:pr-6 sm:even:pl-6"
              >
                <dt className="font-[family-name:var(--font-credit)] text-xs tracking-[0.24em] text-muted uppercase">
                  {credit.role}
                </dt>
                <dd className="mt-2 font-display text-2xl text-foreground">
                  {credit.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
