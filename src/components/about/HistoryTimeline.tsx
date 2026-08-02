"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  historyDecades,
  historyMilestones,
  type HistoryMilestone,
} from "@/content/data/history";
import { cn } from "@/lib/cn";

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

function MilestoneCard({
  item,
  onRight,
}: {
  item: HistoryMilestone;
  onRight: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
        onRight ? "" : "md:text-right",
      )}
    >
      <div
        className={cn(
          "group max-w-[560px] overflow-hidden rounded-md border border-border bg-white shadow-sm transition-shadow duration-ease hover:shadow-md",
          onRight ? "" : "md:ml-auto",
        )}
      >
        {item.imageUrl ? (
          <figure className="relative">
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                src={item.imageUrl}
                alt={item.imageCaption || item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 560px"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-nav-dark/45 via-transparent to-transparent"
                aria-hidden="true"
              />
              <time className="absolute bottom-3 left-3 rounded-sm bg-white/95 px-2.5 py-1 text-xs font-extrabold text-blue">
                {item.year}
              </time>
            </div>
            {item.imageCaption ? (
              <figcaption className="border-b border-border bg-surface px-s4 py-s2 text-left text-xs font-light leading-snug text-text-meta">
                {item.imageCaption}
              </figcaption>
            ) : null}
          </figure>
        ) : null}

        <div className="p-s5">
          <div
            className={cn(
              "mb-s3 flex flex-wrap items-center gap-s2",
              onRight ? "" : "md:justify-end",
            )}
          >
            {!item.imageUrl ? (
              <time className="text-sm font-extrabold text-blue">{item.year}</time>
            ) : null}
            <span
              className={cn(
                "rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.06em]",
                institutionTone(item.institution),
              )}
            >
              {institutionLabel(item.institution)}
            </span>
          </div>

          <h3 className="mb-s2 text-xl font-bold text-ocean transition-colors group-hover:text-blue">
            {item.title}
          </h3>
          <p className="text-base font-light leading-relaxed text-text-body">
            {item.body}
          </p>
        </div>
      </div>
    </article>
  );
}

export function HistoryTimeline() {
  return (
    <div className="relative">
      <div
        className="absolute bottom-0 left-[11px] top-0 w-px bg-gradient-to-b from-ocean via-border-strong to-ocean/40 md:left-1/2 md:-translate-x-px"
        aria-hidden="true"
      />

      <ol className="flex flex-col">
        {historyDecades.map((decade) => {
          const items = historyMilestones.filter((m) => m.decade === decade);
          return (
            <li key={decade} className="relative pb-s9">
              <div className="relative mb-s6 flex items-center md:justify-center">
                <span className="relative z-[1] ml-8 rounded-full bg-blue px-s5 py-2 text-xs font-extrabold uppercase tracking-[0.12em] text-white shadow-sm md:ml-0">
                  {decade}
                </span>
              </div>

              <ol className="flex flex-col gap-s8">
                {items.map((item, index) => {
                  const onRight = index % 2 === 1;
                  return (
                    <li
                      key={item.id}
                      className="relative grid grid-cols-1 gap-s4 pl-8 md:grid-cols-2 md:gap-s8 md:pl-0"
                    >
                      <span
                        className="absolute left-[5px] top-5 z-[1] h-3.5 w-3.5 rounded-full border-[3px] border-white bg-ocean shadow-md transition-transform duration-ease md:left-1/2 md:-translate-x-1/2 md:group-hover:scale-110"
                        aria-hidden="true"
                      />
                      {onRight ? (
                        <>
                          <div aria-hidden="true" className="hidden md:block" />
                          <MilestoneCard item={item} onRight />
                        </>
                      ) : (
                        <>
                          <MilestoneCard item={item} onRight={false} />
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
