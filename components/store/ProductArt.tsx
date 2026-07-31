import type { StoreProduct } from "@/lib/store";

/** Simple brand-forward product art — no stock photo dependency */
export function ProductArt({
  product,
  className = "",
}: {
  product: StoreProduct;
  className?: string;
}) {
  const isApparel = product.category === "apparel";
  return (
    <div
      className={`relative flex aspect-[4/3] items-center justify-center overflow-hidden ${className}`}
      style={{
        background: `linear-gradient(145deg, ${product.accent}22 0%, #1a2a4e 55%, #10131b 100%)`,
      }}
      aria-hidden
    >
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage:
          "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.25), transparent 45%), radial-gradient(circle at 80% 70%, rgba(198,40,52,0.35), transparent 40%)",
      }} />
      <div className="relative z-[1] px-6 text-center">
        <p className="font-display text-[0.65rem] uppercase tracking-[0.2em] text-white/70">
          {isApparel ? "Apparel" : "Collateral"}
        </p>
        <p className="mt-2 max-w-[14rem] font-display text-lg uppercase leading-tight text-white sm:text-xl">
          {product.name}
        </p>
        <div
          className="mx-auto mt-4 h-1 w-10"
          style={{ backgroundColor: product.accent === "#ece7dd" ? "#c62834" : product.accent }}
        />
      </div>
    </div>
  );
}
