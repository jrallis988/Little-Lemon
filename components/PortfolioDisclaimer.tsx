import { PORTFOLIO_MODE, portfolioDisclaimer } from "@/lib/demo";

/** Footer / legal one-liner so the piece is never mistaken for a live campaign. */
export function PortfolioDisclaimer({ className = "" }: { className?: string }) {
  if (!PORTFOLIO_MODE) return null;
  return (
    <p className={className}>
      {portfolioDisclaimer} Sample contact, events, legal, and transparency
      copy are for design demonstration only.
    </p>
  );
}
