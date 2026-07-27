import { FormEvent, useState } from "react";
import { ExternalLink, Search } from "lucide-react";
import { SurfWordmark } from "@/components/brand/SurfLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  APP_BIOGRAPHY_SHORT,
  APP_NAME_DISPLAY,
  APP_TAGLINE,
} from "@/brand/identity";
import { useBrowserActions } from "@/hooks/useBrowserActions";
import { useSearchStore } from "@/stores/searchStore";

const TRUSTED_LINKS = [
  {
    title: "NASA Space Place",
    url: "https://spaceplace.nasa.gov",
    description: "Space, Earth science, and astronomy for young learners.",
  },
  {
    title: "Smithsonian Learning Lab",
    url: "https://learninglab.si.edu",
    description: "Museum collections and activities for research projects.",
  },
  {
    title: "Khan Academy",
    url: "https://www.khanacademy.org",
    description: "Math, science, history, and more curriculum lessons.",
  },
];

/** New Tab page: search, recent searches, and trusted learning links. */
export function HomeScreen() {
  const { openSearch, openWebUrl } = useBrowserActions();
  const recentSearches = useSearchStore((state) => state.recentSearches);
  const [value, setValue] = useState("");

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    openSearch(value);
  };

  return (
    <section className="relative flex min-h-[78vh] flex-col items-center justify-center overflow-hidden rounded-[2rem] animate-fade-in">
      <div className="absolute inset-0 logo-mesh" aria-hidden />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(15,23,60,0.28)_100%)]" />

      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center px-6 py-16 text-center">
        <div className="mb-8 scale-110 animate-rise-in">
          <SurfWordmark inverse />
        </div>

        <h1 className="sr-only">{APP_NAME_DISPLAY} search</h1>
        <p className="mb-3 max-w-lg font-display text-2xl font-semibold text-foam text-balance md:text-3xl">
          {APP_TAGLINE}
        </p>
        <p className="mb-8 max-w-md text-sm leading-relaxed text-foam/85 text-balance animate-rise-in">
          {APP_BIOGRAPHY_SHORT}
        </p>

        <form
          onSubmit={onSubmit}
          className="flex w-full max-w-xl flex-col gap-3 sm:flex-row"
        >
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate" />
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Search something you’re curious about…"
              className="border-white/40 bg-white/95 pl-12 shadow-glass"
              aria-label="Search"
              autoFocus
            />
          </div>
          <Button type="submit" size="lg" className="bg-orange hover:bg-orange-deep">
            Search
          </Button>
        </form>

        <p className="mt-6 text-sm text-foam/75">
          Try: planets, coral reefs, or inventors
        </p>

        {recentSearches.length > 0 && (
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {recentSearches.map((query) => (
              <button
                key={query}
                type="button"
                className="rounded-full bg-white/15 px-3 py-1.5 text-sm font-medium text-foam ring-1 ring-white/25 transition hover:bg-white/25"
                onClick={() => openSearch(query)}
              >
                {query}
              </button>
            ))}
          </div>
        )}

        <div className="mt-10 grid w-full gap-3 text-left md:grid-cols-3">
          {TRUSTED_LINKS.map((link) => (
            <button
              key={link.url}
              type="button"
              className="rounded-3xl border border-white/25 bg-white/12 p-4 text-foam backdrop-blur-sm transition hover:bg-white/20"
              onClick={() => void openWebUrl(link.url, link.title)}
            >
              <span className="flex items-center justify-between gap-2 font-display text-lg font-semibold">
                {link.title}
                <ExternalLink className="h-4 w-4" />
              </span>
              <span className="mt-2 block text-sm leading-relaxed text-foam/75">
                {link.description}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
