import { asset } from "../lib/asset";

type BeerCanProps = {
  slug: string;
  name: string;
  className?: string;
};

/** Official can art from smuttynose.com lineup (local PNG under public/images/beers/). */
export function BeerCan({ slug, name, className = "" }: BeerCanProps) {
  return (
    <img
      src={asset(`images/beers/${slug}.png`)}
      alt={`${name} can`}
      className={className}
      loading="lazy"
    />
  );
}
