import { useState } from "react";
import { CampusImage } from "../components/CampusImage";
import { CartDrawer } from "../components/CartDrawer";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { PageMeta } from "../components/PageMeta";
import { SkipLink } from "../components/SkipLink";
import { useCart } from "../context/CartContext";
import { links } from "../data/links";
import { merch, MerchItem } from "../data/merch";

const filters = ["All", "Apparel", "Glassware", "Accessories"] as const;

export function ShopPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const { addItem, setOpen, count } = useCart();

  const items = merch.filter(
    (item) => filter === "All" || item.category === filter,
  );

  return (
    <div className="min-h-screen bg-foam">
      <PageMeta
        title="Shop"
        description="Smuttynose merch, glassware, and gear — preview the crate, then checkout on smuttynose.com."
        path="/shop"
      />
      <SkipLink />
      <Header solid />
      <CartDrawer />
      <main id="main" className="px-5 pb-20 pt-28 md:px-8 md:pb-28">
        <div className="mx-auto max-w-site">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-tide">
                Merch crate
              </p>
              <h1 className="mt-3 font-display text-4xl font-bold uppercase tracking-wide md:text-5xl">
                Apparel, glassware & gear
              </h1>
              <p className="mt-3 max-w-xl text-steel">
                Preview campus favorites here — checkout completes on the
                official smuttynose.com shop.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 self-start">
              <a
                href={links.shopOfficial}
                target="_blank"
                rel="noreferrer"
                className="inline-flex bg-buoy px-5 py-3 text-sm font-semibold tracking-wide text-foam"
              >
                Shop on smuttynose.com
              </a>
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="inline-flex bg-ink px-5 py-3 text-sm font-semibold tracking-wide text-foam"
              >
                Open crate{count > 0 ? ` (${count})` : ""}
              </button>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`px-4 py-2 text-sm font-semibold tracking-wide ${
                  filter === f
                    ? "bg-buoy text-foam"
                    : "border border-ink/15 text-ink"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item) => (
              <MerchCard key={item.id} item={item} onAdd={() => addItem(item)} />
            ))}
          </div>

          <p className="mt-12 text-sm text-steel">
            Also available:{" "}
            <a
              href={links.giftCards}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-tide underline-offset-2 hover:underline"
            >
              e-gift cards
            </a>{" "}
            and{" "}
            <a
              href={links.giftCardBalance}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-tide underline-offset-2 hover:underline"
            >
              balance check
            </a>
            .
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function MerchCard({ item, onAdd }: { item: MerchItem; onAdd: () => void }) {
  return (
    <article className="flex flex-col">
      <div className="relative aspect-square overflow-hidden">
        <CampusImage
          name={item.image}
          alt={item.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col border-b border-ink/10 py-4">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-tide">
          {item.category}
        </p>
        <h2 className="mt-2 font-display text-xl font-bold uppercase tracking-wide">
          {item.name}
        </h2>
        <p className="mt-2 flex-1 text-sm text-steel">{item.note}</p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="font-display text-2xl font-bold">
            ${item.price.toFixed(2)}
          </span>
          <button
            type="button"
            onClick={onAdd}
            className="bg-ink px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-foam"
          >
            Add
          </button>
        </div>
      </div>
    </article>
  );
}
