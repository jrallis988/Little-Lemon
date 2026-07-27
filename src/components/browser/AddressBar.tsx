import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useBrowserActions, looksLikeUrl } from "@/hooks/useBrowserActions";
import type { BrowserTab } from "@/types";

type Props = {
  activeTab: BrowserTab | null;
};

export const AddressBar = forwardRef<HTMLInputElement, Props>(
  ({ activeTab }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const { openSearch, openWebUrl } = useBrowserActions();
    const [value, setValue] = useState("");

    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    useEffect(() => {
      if (!activeTab) {
        setValue("");
        return;
      }
      if (activeTab.kind === "search") {
        const url = new URL(activeTab.url, window.location.origin);
        setValue(url.searchParams.get("q") ?? activeTab.title);
        return;
      }
      setValue(activeTab.kind === "newtab" ? "" : activeTab.url);
    }, [activeTab]);

    useEffect(() => {
      const focus = () => inputRef.current?.select();
      window.addEventListener("surf-focus-address", focus);
      return () => window.removeEventListener("surf-focus-address", focus);
    }, []);

    return (
      <form
        className="relative flex-1"
        onSubmit={(event) => {
          event.preventDefault();
          const next = value.trim();
          if (!next) return;
          if (looksLikeUrl(next)) {
            void openWebUrl(next, next);
          } else {
            openSearch(next);
          }
        }}
      >
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate" />
        <Input
          ref={inputRef}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Search or enter an approved learning URL"
          className="h-10 rounded-2xl border-white/70 bg-white/90 pl-10 shadow-soft"
          aria-label="Address and search bar"
        />
      </form>
    );
  },
);

AddressBar.displayName = "AddressBar";
