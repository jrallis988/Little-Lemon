import { FormEvent, useState } from "react";
import { Search, Sparkles } from "lucide-react";
import { SurfWordmark } from "@/components/brand/SurfLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUrlInterceptor } from "@/hooks/useUrlInterceptor";
import { useNavigationStore } from "@/stores/navigationStore";
import {
  APP_BIOGRAPHY_SHORT,
  APP_NAME_DISPLAY,
  APP_TAGLINE,
  MILO_NAME,
} from "@/brand/identity";

/** Screen 1 — Home: search-only view with logo brand hero */
export function HomeScreen() {
  const { search } = useUrlInterceptor();
  const setMiloOpen = useNavigationStore((s) => s.setMiloOpen);
  const [value, setValue] = useState("");

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    void search(value);
  };

  return (
    <section className="relative flex min-h-[78vh] flex-col items-center justify-center overflow-hidden rounded-[2rem] animate-fade-in">
      <div className="absolute inset-0 logo-mesh" aria-hidden />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(15,23,60,0.28)_100%)]" />

      <div className="relative z-10 flex w-full max-w-2xl flex-col items-center px-6 py-16 text-center">
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

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <p className="text-sm text-foam/75">
            Try: Plate Tectonics, coral reefs, or solar system
          </p>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="bg-white/90 text-navy hover:bg-white"
            onClick={() => setMiloOpen(true)}
          >
            <Sparkles className="mr-1.5 h-3.5 w-3.5" />
            {MILO_NAME}
          </Button>
        </div>
      </div>
    </section>
  );
}
