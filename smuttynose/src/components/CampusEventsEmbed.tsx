import { links } from "../data/links";
import { useInView } from "../hooks/useInView";

export function CampusEventsEmbed() {
  const { ref, visible } = useInView<HTMLElement>();

  return (
    <section
      id="campus-events"
      ref={ref}
      className="border-t border-ink/10 bg-mist px-5 py-20 md:px-8 md:py-28"
    >
      <div className="mx-auto max-w-site">
        <div
          className={`max-w-2xl transition-all duration-700 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-tide">
            Live calendar
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold uppercase tracking-wide md:text-5xl">
            Campus events
          </h2>
          <p className="mt-4 text-steel">
            Pulled from the official Facebook events feed — trivia, trucks, live
            music, and more. May take a moment to load.
          </p>
        </div>

        <div
          className={`mt-10 overflow-hidden border border-ink/10 bg-foam transition-all duration-700 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
          style={{ transitionDelay: visible ? "120ms" : "0ms" }}
        >
          <iframe
            title="Smuttynose campus events calendar"
            src={links.campusEvents}
            className="h-[28rem] w-full md:h-[36rem]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <p className="mt-4 text-sm text-steel">
          Calendar not loading?{" "}
          <a
            href={links.campusEvents}
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-tide underline-offset-2 hover:underline"
          >
            Open campus events on smuttynose.com
          </a>
          .
        </p>
      </div>
    </section>
  );
}
