"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/lib/faq";

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const baseId = useId();
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const panelId = `${baseId}-panel-${item.id}`;
        const buttonId = `${baseId}-button-${item.id}`;
        const isOpen = openId === item.id;

        return (
          <div key={item.id} className="border border-slate-line bg-white">
            <h2 className="font-display text-base font-normal text-ink">
              <button
                id={buttonId}
                type="button"
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-red"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : item.id)}
              >
                <span>
                  <span className="mr-2 text-red" aria-hidden>
                    {String(index + 1).padStart(2, "0")}.
                  </span>
                  {item.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-navy transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden
                />
              </button>
            </h2>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="border-t border-slate-line px-5 py-4"
            >
              <div className="space-y-3 text-body-sm leading-relaxed text-slate-text">
                {item.answer.map((para) => (
                  <p key={para.slice(0, 48)}>{para}</p>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
