import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";
import { MerchItem } from "../data/merch";

export type CartLine = {
  item: MerchItem;
  qty: number;
};

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  open: boolean;
  setOpen: (open: boolean) => void;
  addItem: (item: MerchItem) => void;
  setQty: (id: string, qty: number) => void;
  removeItem: (id: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);

  const value = useMemo<CartContextValue>(() => {
    const count = lines.reduce((sum, l) => sum + l.qty, 0);
    const subtotal = lines.reduce((sum, l) => sum + l.qty * l.item.price, 0);

    return {
      lines,
      count,
      subtotal,
      open,
      setOpen,
      addItem(item) {
        setLines((prev) => {
          const existing = prev.find((l) => l.item.id === item.id);
          if (existing) {
            return prev.map((l) =>
              l.item.id === item.id ? { ...l, qty: l.qty + 1 } : l,
            );
          }
          return [...prev, { item, qty: 1 }];
        });
        setOpen(true);
      },
      setQty(id, qty) {
        setLines((prev) =>
          prev
            .map((l) => (l.item.id === id ? { ...l, qty } : l))
            .filter((l) => l.qty > 0),
        );
      },
      removeItem(id) {
        setLines((prev) => prev.filter((l) => l.item.id !== id));
      },
      clear() {
        setLines([]);
      },
    };
  }, [lines, open]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
