import Link from "next/link";
import { PlanetFitnessLogo } from "@/components/brand-logo";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white/95 text-pf-ink backdrop-blur-md">
      <div className="flex h-14 items-center justify-between gap-3 px-4 md:px-6">
        <Link href="/" className="shrink-0">
          <PlanetFitnessLogo />
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-1">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="hidden text-pf-ink hover:bg-pf-mist hover:text-pf-purple sm:inline-flex"
          >
            <a href="#clubs">Find a Club</a>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-pf-ink hover:bg-pf-mist hover:text-pf-purple"
          >
            <a href="#pricing">Memberships</a>
          </Button>
          <Button asChild variant="purple" size="sm">
            <Link href="/join">Join Now</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
