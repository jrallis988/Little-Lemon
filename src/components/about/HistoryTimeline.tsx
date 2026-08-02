import Image from "next/image";
import {
  historyDecades,
  historyMilestones,
  type HistoryMilestone,
} from "@/content/data/history";

function institutionLabel(institution: HistoryMilestone["institution"]) {
  if (institution === "bch") return "Boston Children’s Hospital";
  if (institution === "bmc") return "Boston City Hospital / BMC";
  return "Boston pediatric legacy";
}

function institutionTone(institution: HistoryMilestone["institution"]) {
  if (institution === "bmc") return "bg-bay/15 text-bay";
  if (institution === "shared") return "bg-indigo/15 text-indigo";
  return "bg-ocean/10 text-ocean";
}

export function HistoryTimeline() {
  return (
    <div className="relative">
      {/* Continuous vertical rail — non-gapped multi-decade spine */}
      <div
        className="absolute bottom-0 left-[11px] top-0 w-px bg-border-strong md:left-1/2 md:-translate-x-px"
        aria-hidden="true"
      />

      <ol className="flex flex-col gap-0">
        {historyDecades.map((decade) => {
          const items = historyMilestones.filter((m) => m.decade === decade);
          return (
            <li key={decade} className="relative pb-s8">
              <div className="relative mb-s5 flex items-center md:justify-center">
                <span className="relative z-[1] ml-8 rounded-full bg-blue px-s4 py-1.5 text-xs font-extrabold uppercase tracking-[0.1em] text-white md:ml-0">
                  {decade}
                </span>
              </div>

              <ol className="flex flex-col gap-s7">
                {items.map((item, index) => {
                  const onRight = index % 2 === 1;
                  const card = (
                    <article
                      className={onRight ? "" : "md:text-right"}
                    >
                      <div
                        className={`max-w-[560px] rounded-md border border-border bg-white p-s5 shadow-sm ${
                          onRight ? "" : "md:ml-auto"
                        }`}
                      >
                        <div
                          className={`mb-s3 flex flex-wrap items-center gap-s2 ${
                            onRight ? "" : "md:justify-end"
                          }`}
                        >
                          <time className="text-sm font-extrabold text-blue">
                            {item.year}
                          </time>
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.06em] ${institutionTone(
                              item.institution,
                            )}`}
                          >
                            {institutionLabel(item.institution)}
                          </span>
                        </div>

                        <h3 className="mb-s2 text-xl font-bold text-ocean">
                          {item.title}
                        </h3>
                        <p className="text-base font-light leading-relaxed text-text-body">
                          {item.body}
                        </p>

                        {item.imageUrl ? (
                          <figure className="mt-s4 overflow-hidden rounded-sm border border-border">
                            <div className="relative aspect-[16/10]">
                              <Image
                                src={item.imageUrl}
                                alt={item.imageCaption || item.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 560px"
                              />
                            </div>
                            {item.imageCaption ? (
                              <figcaption className="bg-surface px-s3 py-s2 text-left text-xs font-light leading-snug text-text-meta">
                                {item.imageCaption}
                              </figcaption>
                            ) : null}
                          </figure>
                        ) : null}
                      </div>
                    </article>
                  );

                  return (
                    <li
                      key={item.id}
                      className="relative grid grid-cols-1 gap-s4 pl-8 md:grid-cols-2 md:gap-s7 md:pl-0"
                    >
                      <span
                        className="absolute left-[7px] top-3 z-[1] h-2.5 w-2.5 rounded-full border-2 border-white bg-ocean shadow-sm md:left-1/2 md:-translate-x-1/2"
                        aria-hidden="true"
                      />
                      {onRight ? (
                        <>
                          <div aria-hidden="true" className="hidden md:block" />
                          {card}
                        </>
                      ) : (
                        <>
                          {card}
                          <div aria-hidden="true" className="hidden md:block" />
                        </>
                      )}
                    </li>
                  );
                })}
              </ol>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
