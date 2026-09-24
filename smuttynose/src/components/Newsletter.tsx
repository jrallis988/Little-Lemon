import { links } from "../data/links";
import { useInView } from "../hooks/useInView";

export function Newsletter() {
  const { ref, visible } = useInView<HTMLElement>();

  return (
    <section
      id="newsletter"
      ref={ref}
      className="border-y border-ink/10 px-5 py-16 md:px-8 md:py-20"
    >
      <div
        className={`mx-auto flex max-w-site flex-col gap-8 md:flex-row md:items-end md:justify-between ${
          visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        } transition-all duration-700`}
      >
        <div className="max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-tide">
            Be the first to know
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold uppercase tracking-wide md:text-4xl">
            Events, new releases & merch drops
          </h2>
          <p className="mt-3 text-steel">
            No spam. Just the good stuff from Towle Farm. Unsubscribe anytime.
          </p>
        </div>

        <div className="w-full max-w-md space-y-3">
          <a
            href={links.loyalty}
            target="_blank"
            rel="noreferrer"
            className="flex w-full justify-center bg-ink px-5 py-3 text-sm font-semibold tracking-wide text-foam transition-transform duration-300 hover:-translate-y-0.5"
          >
            Sign up on smuttynose.com
          </a>
          <p className="text-center text-xs text-steel">
            Official Toast newsletter + loyalty — same list as the brewery.
          </p>
        </div>
      </div>
    </section>
  );
}
