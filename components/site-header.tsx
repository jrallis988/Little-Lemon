import Link from "next/link";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-pf-ink/90 text-white backdrop-blur-md">
      <div className="container flex h-14 items-center justify-between gap-4">
        <Link href="/" className="group flex items-baseline gap-2">
          <span className="font-display text-xl tracking-tight text-pf-yellow transition group-hover:text-white md:text-2xl">
            Planet Fitness
          </span>
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-1">
          <Button asChild variant="ghost" size="sm" className="text-white hover:bg-white/10 hover:text-white">
            <a href="#clubs">Clubs</a>
          </Button>
          <Button asChild variant="ghost" size="sm" className="text-white hover:bg-white/10 hover:text-white">
            <a href="#pricing">Pricing</a>
          </Button>
          <Button asChild size="sm" className="ml-1">
            <Link href="/join">Join</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
