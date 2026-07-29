"use client";

import Link from "next/link";
import {
  useDeferredValue,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { ChevronDown, Search } from "lucide-react";
import type { FaqItem } from "@/lib/faq";

type FaqAccordionProps = {
  items: FaqItem[];
};

export function FaqAccordion({ items }: FaqAccordionProps) {
  const baseId = useId();
  const searchId = `${baseId}-search`;
  const statusId = `${baseId}-status`;
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [openIds, setOpenIds] = useState<Set<string>>(() => new Set());
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const filtered = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    if (!q) return items;
    return items.filter((item) => {
      const haystack = [item.question, ...item.answer, ...(item.links?.map((l) => l.label) ?? [])]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [deferredQuery, items]);

  useEffect(() => {
    buttonRefs.current = buttonRefs.current.slice(0, filtered.length);
  }, [filtered.length]);

  const allFilteredOpen =
    filtered.length > 0 && filtered.every((item) => openIds.has(item.id));

  function toggle(id: string) {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function expandAll() {
    setOpenIds((prev) => {
      const next = new Set(prev);
      filtered.forEach((item) => next.add(item.id));
      return next;
    });
  }

  function collapseAll() {
    setOpenIds((prev) => {
      const next = new Set(prev);
      filtered.forEach((item) => next.delete(item.id));
      return next;
    });
  }

  function focusButton(index: number) {
    const el = buttonRefs.current[index];
    el?.focus();
  }

  function onHeaderKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    if (filtered.length === 0) return;

    switch (event.key) {
      case "ArrowDown": {
        event.preventDefault();
        focusButton((index + 1) % filtered.length);
        break;
      }
      case "ArrowUp": {
        event.preventDefault();
        focusButton((index - 1 + filtered.length) % filtered.length);
        break;
      }
      case "Home": {
        event.preventDefault();
        focusButton(0);
        break;
      }
      case "End": {
        event.preventDefault();
        focusButton(filtered.length - 1);
        break;
      }
      default:
        break;
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="w-full sm:max-w-md">
          <label htmlFor={searchId} className="text-sm font-semibold text-ink">
            Search questions
          </label>
          <div className="relative mt-2">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-muted"
              aria-hidden
            />
            <input
              id={searchId}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a keyword (e.g. volunteer, vote, independent)"
              autoComplete="off"
              aria-controls={statusId}
              className="w-full border border-slate-line bg-white py-3 pl-10 pr-3 text-sm text-ink placeholder:text-slate-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red"
            />
          </div>
        </div>

        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Expand or collapse FAQ answers"
        >
          <button
            type="button"
            onClick={expandAll}
            disabled={filtered.length === 0 || allFilteredOpen}
            className="border border-slate-line bg-white px-3 py-2 text-sm font-semibold text-ink hover:border-navy disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red"
          >
            Expand all
          </button>
          <button
            type="button"
            onClick={collapseAll}
            disabled={
              filtered.length === 0 ||
              filtered.every((item) => !openIds.has(item.id))
            }
            className="border border-slate-line bg-white px-3 py-2 text-sm font-semibold text-ink hover:border-navy disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red"
          >
            Collapse all
          </button>
        </div>
      </div>

      <p id={statusId} className="sr-only" aria-live="polite">
        {filtered.length === items.length
          ? `${items.length} questions shown.`
          : `${filtered.length} of ${items.length} questions match your search.`}
      </p>

      {filtered.length === 0 ? (
        <p className="border border-slate-line bg-paper px-5 py-6 text-sm text-slate-text">
          No questions match “{query.trim()}”. Try another keyword, or{" "}
          <button
            type="button"
            className="font-semibold text-red underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red"
            onClick={() => setQuery("")}
          >
            clear the search
          </button>
          .
        </p>
      ) : (
        <div className="space-y-3">
          {filtered.map((item, index) => {
            const panelId = `${baseId}-panel-${item.id}`;
            const buttonId = `${baseId}-button-${item.id}`;
            const isOpen = openIds.has(item.id);
            const originalIndex = items.findIndex((i) => i.id === item.id);

            return (
              <div key={item.id} className="border border-slate-line bg-white">
                <h2 className="font-display text-base font-normal text-ink">
                  <button
                    ref={(el) => {
                      buttonRefs.current[index] = el;
                    }}
                    id={buttonId}
                    type="button"
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-red"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(item.id)}
                    onKeyDown={(e) => onHeaderKeyDown(e, index)}
                  >
                    <span>
                      <span className="mr-2 text-red" aria-hidden>
                        {String(originalIndex + 1).padStart(2, "0")}.
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
                      <p key={para.slice(0, 64)}>{para}</p>
                    ))}
                    {item.links && item.links.length > 0 && (
                      <p className="pt-1">
                        <span className="sr-only">Related links: </span>
                        {item.links.map((link, i) => (
                          <span key={link.href + link.label}>
                            {i > 0 && (
                              <span aria-hidden className="text-slate-muted">
                                {" · "}
                              </span>
                            )}
                            {link.external ? (
                              <a
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-semibold text-red underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red"
                              >
                                {link.label}
                                <span className="sr-only"> (opens in a new window)</span>
                              </a>
                            ) : (
                              <Link
                                href={link.href}
                                className="font-semibold text-red underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red"
                              >
                                {link.label}
                              </Link>
                            )}
                          </span>
                        ))}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
