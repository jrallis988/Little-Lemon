import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto grid max-w-lg place-items-center px-4 py-20 text-center">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-pf-purple">
        404
      </p>
      <h1 className="mt-2 font-display text-4xl text-pf-ink">
        Club or page not found
      </h1>
      <p className="mt-2 text-sm text-pf-ink/65">
        Check the link, or head back to Planet Fitness Stratham.
      </p>
      <div className="mt-5 flex gap-2">
        <Button asChild variant="purple">
          <Link href="/#clubs">Our Club</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/">Home</Link>
        </Button>
      </div>
    </div>
  );
}
