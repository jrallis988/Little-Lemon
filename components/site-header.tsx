import Link from "next/link";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-pf-purple-deep/95 text-white backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link href="/" className="group flex items-baseline gap-2">
          <span className="font-display text-2xl tracking-tight text-pf-yellow transition group-hover:text-white">
            Planet Fitness
          </span>
          <span className="hidden text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55 sm:inline">
            Clubs · Memberships · Join
          </span>
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-1 sm:gap-2">
          <Button asChild variant="ghost" size="sm" className="text-white hover:bg-white/10 hover:text-white">
            <a href="#clubs">Clubs</a>
          </Button>
          <Button asChild variant="ghost" size="sm" className="text-white hover:bg-white/10 hover:text-white">
            <a href="#pricing">Pricing</a>
          </Button>
          <Button asChild size="sm" className="ml-1">
            <Link href="/join">Start a membership</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
