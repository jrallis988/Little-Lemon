import { candidate } from "@/lib/candidate";

export function WhyRunning() {
  return (
    <section
      id="why"
      aria-labelledby="why-heading"
      className="scroll-mt-28 bg-pine-800"
    >
      <div className="mx-auto max-w-content section-pad">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-amber-300">
          Why I&apos;m running
        </p>
        <h2
          id="why-heading"
          className="mt-3 max-w-3xl font-serif text-3xl font-bold text-white sm:text-4xl"
        >
          New Hampshire deserves a senator who still lives the problems we talk about.
        </h2>
        <ul className="mt-10 grid gap-8 md:grid-cols-3">
          {candidate.whyRunning.map((item, index) => (
            <li key={item.title} className="border-t border-pine-600 pt-6">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-300">
                0{index + 1}
              </p>
              <h3 className="mt-3 font-serif text-xl font-bold text-white">
                {item.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-pine-100">
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
