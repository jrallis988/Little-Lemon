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
            Shop, loyalty & Suds Club
          </h2>
        </div>

        <div className="mt-12 grid gap-10 border-t border-ink/10 pt-10 lg:grid-cols-3 lg:gap-12">
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
              Stock up on beer, glassware, and Smuttynose gear from the online
              shop — or fill a growler on campus.
            </p>
            <a
              href={links.shop}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex bg-ink px-5 py-3 text-sm font-semibold tracking-wide text-foam transition-transform duration-300 hover:-translate-y-0.5"
            >
              Visit the shop
            </a>
          </div>

          <div
            className={`transition-all duration-700 ${
              visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
            style={{ transitionDelay: visible ? "160ms" : "0ms" }}
          >
            <h3 className="font-display text-2xl font-bold uppercase tracking-wide">
              Loyalty rewards
            </h3>
            <p className="mt-3 text-steel">
              Earn 1 point per $1 spent. Unlock $5 off every 50 points, plus
              signup and birthday bonuses.
            </p>
            <a
              href={links.restaurant}
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
            style={{ transitionDelay: visible ? "240ms" : "0ms" }}
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
              Learn about Suds Club
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
