import { useEffect } from "react";
import { useCart } from "../context/CartContext";

export function CartDrawer() {
  const { lines, open, setOpen, subtotal, setQty, removeItem, clear } = useCart();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  return (
    <>
      <button
        type="button"
        aria-label="Close cart backdrop"
        className={`fixed inset-0 z-[60] bg-ink/50 transition-opacity ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
      />
      <aside
        className={`fixed inset-y-0 right-0 z-[70] flex w-full max-w-md flex-col bg-foam text-ink shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!open}
        aria-label="Shopping cart"
      >
        <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4">
          <h2 className="font-display text-2xl font-bold uppercase tracking-wide">
            Your crate
          </h2>
          <button
            type="button"
            className="text-sm font-semibold uppercase tracking-[0.14em] text-steel"
            onClick={() => setOpen(false)}
          >
            Close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {lines.length === 0 ? (
            <p className="text-steel">
              Ohh no! Your crate is empty! Why overthink when you can over drink.
            </p>
          ) : (
            <ul className="divide-y divide-ink/10">
              {lines.map(({ item, qty }) => (
                <li key={item.id} className="flex gap-4 py-4">
                  <div
                    className="h-16 w-16 shrink-0"
                    style={{ background: item.color }}
                    aria-hidden="true"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-lg font-bold uppercase tracking-wide">
                      {item.name}
                    </p>
                    <p className="text-sm text-steel">${item.price.toFixed(2)}</p>
                    <div className="mt-2 flex items-center gap-3">
                      <label className="sr-only" htmlFor={`qty-${item.id}`}>
                        Quantity
                      </label>
                      <input
                        id={`qty-${item.id}`}
                        type="number"
                        min={1}
                        value={qty}
                        onChange={(e) =>
                          setQty(item.id, Math.max(1, Number(e.target.value) || 1))
                        }
                        className="w-16 border border-ink/20 bg-foam px-2 py-1"
                      />
                      <button
                        type="button"
                        className="text-xs font-semibold uppercase tracking-[0.14em] text-buoy"
                        onClick={() => removeItem(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-ink/10 px-5 py-5">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold uppercase tracking-[0.14em] text-steel">
              Subtotal
            </span>
            <span className="font-display text-2xl font-bold">
              ${subtotal.toFixed(2)}
            </span>
          </div>
          <button
            type="button"
            disabled={lines.length === 0}
            className="mt-4 w-full bg-buoy px-4 py-3 text-sm font-semibold tracking-wide text-foam disabled:opacity-40"
            onClick={() => {
              clear();
              setOpen(false);
              alert("Demo checkout — connect Shopify or smuttynose.com shop next.");
            }}
          >
            Checkout
          </button>
          <p className="mt-2 text-xs text-steel">
            Demo cart — wire to the live shop when ready.
          </p>
        </div>
      </aside>
    </>
  );
}
