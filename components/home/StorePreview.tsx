import Link from "next/link";
import { storeProducts } from "@/lib/store";
import { Reveal } from "@/components/motion/Reveal";

const PREVIEW = storeProducts.slice(0, 3);

/** Landing-page Store band. */
export function StorePreview() {
  return (
    <section
      className="store-preview section-padding-140 section-bg-color"
      aria-labelledby="store-preview-heading"
      id="store"
    >
      <div className="container">
        <Reveal>
          <div className="section-heading">
            <h6>Campaign Store</h6>
            <h2 id="store-preview-heading">Apparel & Collateral</h2>
            <p>Wear the message. Stock your block. Proceeds support neighbor-to-neighbor organizing.</p>
          </div>
        </Reveal>

        <div className="section-wrapper row justify-content-center">
          {PREVIEW.map((product, i) => (
            <Reveal
              className="col-lg-4 col-sm-6"
              key={product.slug}
              delayMs={i * 110}
              variant="scale"
            >
              <div className="store-preview-card varga-lift-card">
                <div
                  className="store-preview-card__swatch"
                  style={{ background: product.accent }}
                  aria-hidden
                />
                <div className="store-preview-card__body">
                  {product.badge ? (
                    <p className="store-preview-card__badge">{product.badge}</p>
                  ) : null}
                  <h3 className="store-preview-card__title">
                    <Link href="/shop">{product.name}</Link>
                  </h3>
                  <p className="store-preview-card__blurb">{product.blurb}</p>
                  <p className="store-preview-card__price">
                    ${(product.priceCents / 100).toFixed(0)}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="text-center mt-4" delayMs={280}>
          <Link href="/shop" className="custom-btn varga-btn-motion">
            Visit the Store
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
