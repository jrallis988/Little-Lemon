import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { browserFindInPage, isTauriRuntime } from "@/services/browserBridge";
import type { BrowserTab } from "@/types";

type Props = {
  open: boolean;
  activeTab: BrowserTab | null;
  onClose: () => void;
};

export function FindBar({ open, activeTab, onClose }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      inputRef.current?.select();
    } else {
      setStatus("");
    }
  }, [open]);

  if (!open) return null;

  const runFind = async (forward: boolean) => {
    const next = query.trim();
    if (!next) return;

    if (activeTab?.kind === "web" && activeTab.nativeAttached && isTauriRuntime()) {
      const found = await browserFindInPage({
        tabId: activeTab.id,
        query: next,
        forward,
      });
      setStatus(found ? "Searching page…" : "No matches in page");
      return;
    }

    const found = (
      window as Window & {
        find?: (
          a: string,
          b?: boolean,
          c?: boolean,
          d?: boolean,
          e?: boolean,
          f?: boolean,
          g?: boolean,
        ) => boolean;
      }
    ).find?.(next, false, !forward, true, false, false, false);
    setStatus(found ? "Match found" : "No matches on this page");
  };

  return (
    <div className="flex items-center gap-2 border-b border-white/60 bg-white/95 px-3 py-2 shadow-soft">
      <Search className="h-4 w-4 text-slate" />
      <Input
        ref={inputRef}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            void runFind(!event.shiftKey);
          }
          if (event.key === "Escape") onClose();
        }}
        placeholder="Find in page"
        className="h-9 max-w-sm rounded-xl"
        aria-label="Find in page"
      />
      <Button
        variant="ghost"
        size="icon"
        aria-label="Previous match"
        onClick={() => void runFind(false)}
      >
        <ChevronUp className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        aria-label="Next match"
        onClick={() => void runFind(true)}
      >
        <ChevronDown className="h-4 w-4" />
      </Button>
      {status && <span className="text-xs text-slate">{status}</span>}
      <Button variant="ghost" size="icon" aria-label="Close find" onClick={onClose}>
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}
