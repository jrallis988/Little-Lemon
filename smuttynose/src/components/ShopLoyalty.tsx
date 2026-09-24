import { Link } from "react-router-dom";
import { links } from "../data/links";
import { useInView } from "../hooks/useInView";

export function ShopLoyalty() {
  const { ref, visible } = useInView<HTMLElement>();

  return (
    <section id="shop" ref={ref} className="px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-site">
        <div
          className={`max-w-2xl transition-all duration-700 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-tide">
            Take it home
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold uppercase tracking-wide md:text-5xl">
            Shop & Suds Club
          </h2>
        </div>

        <div className="mt-12 grid gap-12 border-t border-ink/10 pt-10 lg:grid-cols-2 lg:gap-16">
          <div
            className={`transition-all duration-700 ${
              visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
            style={{ transitionDelay: visible ? "80ms" : "0ms" }}
          >
            <h3 className="font-display text-3xl font-bold uppercase tracking-wide">
              Merch & gear
            </h3>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-steel">
              Glassware, apparel, and growlers from the Towle Farm shop — plus
              e-gift cards for anyone who could use a cold pour.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={links.shopOfficial}
                target="_blank"
                rel="noreferrer"
                className="inline-flex bg-ink px-5 py-3 text-sm font-semibold tracking-wide text-foam transition-transform duration-300 hover:-translate-y-0.5"
              >
                Shop smuttynose.com
              </a>
              <Link
                to="/shop"
                className="inline-flex border border-ink/25 px-5 py-3 text-sm font-semibold tracking-wide text-ink transition-colors hover:border-ink hover:bg-ink hover:text-foam"
              >
                Preview crate
              </Link>
              <a
                href={links.giftCards}
                target="_blank"
                rel="noreferrer"
                className="inline-flex border border-ink/25 px-5 py-3 text-sm font-semibold tracking-wide text-ink transition-colors hover:border-ink hover:bg-ink hover:text-foam"
              >
                Gift cards
              </a>
            </div>
          </div>

          <div
            className={`transition-all duration-700 ${
              visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
            style={{ transitionDelay: visible ? "160ms" : "0ms" }}
          >
            <h3 className="font-display text-3xl font-bold uppercase tracking-wide">
              Suds Club
            </h3>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-steel">
              20% off retail, 20oz pours at 16oz pricing, extended happy hour,
              limited mug & growler, plus member-only parties. Sign up in the
              restaurant.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={links.restaurant}
                target="_blank"
                rel="noreferrer"
                className="inline-flex bg-buoy px-5 py-3 text-sm font-semibold tracking-wide text-foam transition-transform duration-300 hover:-translate-y-0.5"
              >
                Learn at the restaurant
              </a>
              <a
                href={links.loyalty}
                target="_blank"
                rel="noreferrer"
                className="inline-flex border border-ink/25 px-5 py-3 text-sm font-semibold tracking-wide text-ink transition-colors hover:border-ink hover:bg-ink hover:text-foam"
              >
                Join Toast loyalty
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
