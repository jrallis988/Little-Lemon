import { useEffect, useRef } from "react";
import { useCart } from "../context/CartContext";
import { CampusImage } from "./CampusImage";
import { links } from "../data/links";

export function CartDrawer() {
  const { lines, open, setOpen, subtotal, setQty, removeItem, clear } = useCart();
  const panelRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'button, a[href], input, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
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
        tabIndex={open ? 0 : -1}
      />
      <aside
        ref={panelRef}
        className={`fixed inset-y-0 right-0 z-[70] flex w-full max-w-md flex-col bg-foam text-ink shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!open}
        aria-label="Shopping cart"
        role="dialog"
        aria-modal={open}
      >
        <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4">
          <h2 className="font-display text-2xl font-bold uppercase tracking-wide">
            Your crate
          </h2>
          <button
            ref={closeRef}
            type="button"
            className="text-sm font-semibold uppercase tracking-[0.14em] text-steel"
            onClick={() => setOpen(false)}
          >
            Close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {lines.length === 0 ? (
            <div className="space-y-4">
              <p className="text-steel">
                Ohh no! Your crate is empty! Why overthink when you can over
                drink.
              </p>
              <a
                href={links.shopOfficial}
                target="_blank"
                rel="noreferrer"
                className="inline-flex bg-ink px-4 py-3 text-sm font-semibold tracking-wide text-foam"
              >
                Shop on smuttynose.com
              </a>
            </div>
          ) : (
            <ul className="divide-y divide-ink/10">
              {lines.map(({ item, qty }) => (
                <li key={item.id} className="flex gap-4 py-4">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden bg-mist">
                    <CampusImage
                      name={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
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
          <a
            href={links.shopOfficial}
            target="_blank"
            rel="noreferrer"
            className="mt-4 flex w-full justify-center bg-buoy px-4 py-3 text-sm font-semibold tracking-wide text-foam"
            onClick={() => {
              clear();
              setOpen(false);
            }}
          >
            Checkout on smuttynose.com
          </a>
          <p className="mt-2 text-xs text-steel">
            Live orders ship from the official store.
          </p>
        </div>
      </aside>
    </>
  );
}
