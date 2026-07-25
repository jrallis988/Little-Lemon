export function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-ink text-foam">
      <div className="mx-auto flex max-w-site flex-col gap-8 px-5 py-12 md:flex-row md:items-end md:justify-between md:px-8">
        <div>
          <p className="font-display text-3xl font-bold tracking-[0.04em]">MILLHOUSE</p>
          <p className="mt-2 max-w-sm text-sm text-foam/70">
            Millhouse Brewing Co. · Waterbury, Vermont · Est. 2014
          </p>
        </div>
        <div className="flex flex-wrap gap-6 text-sm text-foam/80">
          <a href="#beers" className="transition-colors hover:text-foam">
            Beers
          </a>
          <a href="#taproom" className="transition-colors hover:text-foam">
            Taproom
          </a>
          <a href="#story" className="transition-colors hover:text-foam">
            Story
          </a>
          <a
            href="mailto:hello@millhousebrewing.example"
            className="transition-colors hover:text-foam"
          >
            hello@millhousebrewing.example
          </a>
        </div>
      </div>
    </footer>
  );
}
