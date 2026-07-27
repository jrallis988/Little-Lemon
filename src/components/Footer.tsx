import { links } from "../data/links";

export function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-ink text-foam">
      <div className="mx-auto flex max-w-site flex-col gap-8 px-5 py-12 md:flex-row md:items-end md:justify-between md:px-8">
        <div>
          <p className="font-display text-3xl font-bold uppercase tracking-[0.06em]">
            Smuttynose
          </p>
          <p className="mt-2 max-w-sm text-sm text-foam/70">
            Smuttynose Brewing · Hampton, New Hampshire · Est. 1994
          </p>
          <p className="mt-1 text-sm text-foam/60">{links.address}</p>
        </div>
        <div className="flex flex-wrap gap-6 text-sm text-foam/80">
          <a href="#beers" className="transition-colors hover:text-foam">
            Beers
          </a>
          <a href="#events" className="transition-colors hover:text-foam">
            Events
          </a>
          <a href="#food" className="transition-colors hover:text-foam">
            Food
          </a>
          <a href="#visit" className="transition-colors hover:text-foam">
            Visit
          </a>
          <a href="#shop" className="transition-colors hover:text-foam">
            Shop
          </a>
          <a
            href={links.home}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-foam"
          >
            smuttynose.com
          </a>
        </div>
      </div>
    </footer>
  );
}
