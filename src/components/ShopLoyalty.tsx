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
            Shop, Suds Club & rewards
          </h2>
        </div>

        <div className="mt-12 grid gap-10 border-t border-ink/10 pt-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div
            className={`transition-all duration-700 ${
              visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
            style={{ transitionDelay: visible ? "80ms" : "0ms" }}
          >
            <h3 className="font-display text-2xl font-bold uppercase tracking-wide">
              Merch & growlers
            </h3>
            <p className="mt-3 text-steel">
              Stock up on beer, glassware, and Smuttynose gear — or fill a
              growler on campus.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/shop"
                className="inline-flex bg-ink px-5 py-3 text-sm font-semibold tracking-wide text-foam transition-transform duration-300 hover:-translate-y-0.5"
              >
                Browse the shop
              </Link>
              <a
                href={links.shopOfficial}
                target="_blank"
                rel="noreferrer"
                className="inline-flex border border-ink/25 px-5 py-3 text-sm font-semibold tracking-wide text-ink transition-colors hover:border-ink hover:bg-ink hover:text-foam"
              >
                Checkout live
              </a>
            </div>
          </div>

          <div
            className={`transition-all duration-700 ${
              visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
            style={{ transitionDelay: visible ? "140ms" : "0ms" }}
          >
            <h3 className="font-display text-2xl font-bold uppercase tracking-wide">
              Suds Club
            </h3>
            <p className="mt-3 text-steel">
              20% off retail, 20oz pours at 16oz pricing, extended happy hour,
              limited mug & growler, plus member-only parties. Sign up in the
              restaurant.
            </p>
            <a
              href={links.restaurant}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex bg-buoy px-5 py-3 text-sm font-semibold tracking-wide text-foam transition-transform duration-300 hover:-translate-y-0.5"
            >
              Learn at restaurant
            </a>
          </div>

          <div
            className={`transition-all duration-700 ${
              visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
            style={{ transitionDelay: visible ? "200ms" : "0ms" }}
          >
            <h3 className="font-display text-2xl font-bold uppercase tracking-wide">
              Loyalty rewards
            </h3>
            <p className="mt-3 text-steel">
              Earn 1 point per $1 spent. Unlock $5 off every 50 points, plus 25
              signup points and a $5 birthday reward.
            </p>
            <a
              href={links.loyalty}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex border border-ink/25 px-5 py-3 text-sm font-semibold tracking-wide text-ink transition-colors hover:border-ink hover:bg-ink hover:text-foam"
            >
              Join loyalty
            </a>
          </div>

          <div
            className={`transition-all duration-700 ${
              visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
            style={{ transitionDelay: visible ? "260ms" : "0ms" }}
          >
            <h3 className="font-display text-2xl font-bold uppercase tracking-wide">
              E-gift cards
            </h3>
            <p className="mt-3 text-steel">
              Send a Towle Farm treat — or check an existing e-gift card balance.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={links.giftCards}
                target="_blank"
                rel="noreferrer"
                className="inline-flex border border-ink/25 px-5 py-3 text-sm font-semibold tracking-wide text-ink transition-colors hover:border-ink hover:bg-ink hover:text-foam"
              >
                Buy gift card
              </a>
              <a
                href={links.giftCardBalance}
                target="_blank"
                rel="noreferrer"
                className="inline-flex border border-ink/25 px-5 py-3 text-sm font-semibold tracking-wide text-ink transition-colors hover:border-ink hover:bg-ink hover:text-foam"
              >
                Balance
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
