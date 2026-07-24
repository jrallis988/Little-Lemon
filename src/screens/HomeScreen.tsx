import { FormEvent, useState } from "react";
import { Search } from "lucide-react";
import { SurfLogo } from "@/components/brand/SurfLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUrlInterceptor } from "@/hooks/useUrlInterceptor";
import { APP_TAGLINE } from "@/lib/constants";

/** Screen 1 — Home: search-only view */
export function HomeScreen() {
  const { search } = useUrlInterceptor();
  const [value, setValue] = useState("");

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    search(value);
  };

  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center animate-fade-in">
      <div className="mb-10 scale-125">
        <SurfLogo />
      </div>

      <h1 className="sr-only">Surf search</h1>
      <p className="mb-8 max-w-md text-center text-lg text-slate text-balance animate-rise-in">
        {APP_TAGLINE}
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
            className="pl-12"
            aria-label="Search"
            autoFocus
          />
        </div>
        <Button type="submit" size="lg">
          Search
        </Button>
      </form>

      <p className="mt-6 text-sm text-slate">
        Try: planets, coral reefs, or inventors
      </p>
    </section>
  );
}
