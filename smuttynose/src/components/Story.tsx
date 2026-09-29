import { links } from "../data/links";
import { useInView } from "../hooks/useInView";
import { CampusImage } from "./CampusImage";

export function Story() {
  const { ref, visible } = useInView<HTMLElement>();

  return (
    <section id="story" ref={ref} className="overflow-hidden">
      <div className="grid lg:grid-cols-2">
        <div className="order-2 flex flex-col justify-center px-5 py-20 md:px-12 md:py-28 lg:order-1">
          <div
            className={`mx-auto w-full max-w-xl transition-all duration-700 ${
              visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-tide">
              Our story
            </p>
            <h2 className="mt-3 font-display text-4xl font-bold uppercase tracking-wide md:text-5xl">
              New Hampshire’s original brewery since ’94
            </h2>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-steel">
              <p>
                Smuttynose Brewing Co. is New Hampshire’s original craft brewery.
                From the iconic Finestkind IPA and Old Brown Dog Ale to newer
                classics like Whole Lotta Haze NEIPA, we’ve been brewing
                high-quality, high-flavor beer since 1994 — the only way we know
                how.
              </p>
              <p>
                Named for Smuttynose Island in the Isles of Shoals, the brewery
                grew from Portsmouth roots to a LEED Gold campus on historic
                Towle Farm in Hampton — still shipping unfiltered New England
                beer with dirt under its fingernails.
              </p>
            </div>
            <a
              href={links.ourStory}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex border border-ink/25 px-5 py-3 text-sm font-semibold tracking-wide text-ink transition-colors hover:border-ink hover:bg-ink hover:text-foam"
            >
              Read our story
            </a>
          </div>
        </div>

        <div className="relative order-1 min-h-[18rem] lg:order-2 lg:min-h-full">
          <CampusImage
            name="campus-patio"
            alt="Outdoor patio seating at Smuttynose Towle Farm campus"
            className={`h-full w-full object-cover transition-transform duration-[1.4s] ease-out ${
              visible ? "scale-100" : "scale-105"
            }`}
          />
        </div>
      </div>
    </section>
  );
}
