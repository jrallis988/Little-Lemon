import type { Product, StoreLocation } from "@/lib/types";

export type StoreStockStatus = "in_stock" | "low" | "out";

export interface StoreInventory {
  status: StoreStockStatus;
  quantity: number;
  pickupMinutes: number;
  aisle: string;
}

const STORE_PICKUP_MINUTES: Record<string, number> = {
  "store-4821": 30,
  "store-4902": 45,
  "store-5011": 20,
};

const AISLE_BY_CATEGORY: Record<string, string> = {
  skincare: "Aisle 4",
  vitamins: "Aisle 7",
  "personal-care": "Aisle 5",
  "first-aid": "Aisle 2",
  household: "Aisle 9",
  baby: "Aisle 11",
  snacks: "Aisle 12",
  contacts: "Aisle 3",
};

/** Explicit demos so store switches visibly change availability. */
const STOCK_OVERRIDES: Record<string, Partial<Record<string, StoreStockStatus>>> =
  {
    "p-101": {
      "store-4902": "out",
      "store-5011": "low",
    },
    "p-103": {
      "store-4821": "out",
      "store-4902": "low",
    },
    "p-108": {
      "store-4821": "low",
      "store-5011": "out",
    },
    "p-120": {
      "store-4821": "out",
      "store-4902": "out",
    },
    "p-133": {
      "store-4902": "out",
    },
    "p-142": {
      "store-5011": "out",
      "store-4821": "low",
    },
  };

function productNumber(productId: string): number {
  const digits = productId.replace(/\D/g, "");
  return digits ? Number(digits) : 0;
}

function storeSeed(storeId: string): number {
  return [...storeId].reduce((sum, char) => sum + char.charCodeAt(0), 0);
}

function resolveStatus(storeId: string, product: Product): StoreStockStatus {
  if (!product.inStock) return "out";

  const override = STOCK_OVERRIDES[product.id]?.[storeId];
  if (override) return override;

  const bucket = (productNumber(product.id) + storeSeed(storeId)) % 11;
  if (bucket === 0) return "out";
  if (bucket === 1 || bucket === 2) return "low";
  return "in_stock";
}

function quantityFor(status: StoreStockStatus, productId: string): number {
  if (status === "out") return 0;
  if (status === "low") return 1 + (productNumber(productId) % 3);
  return 4 + (productNumber(productId) % 12);
}

export function getStoreInventory(
  storeId: string,
  product: Product,
): StoreInventory {
  const status = resolveStatus(storeId, product);
  return {
    status,
    quantity: quantityFor(status, product.id),
    pickupMinutes: STORE_PICKUP_MINUTES[storeId] ?? 35,
    aisle: AISLE_BY_CATEGORY[product.categoryId] ?? "Aisle 6",
  };
}

export function isAvailableAtStore(
  storeId: string,
  product: Product,
): boolean {
  return getStoreInventory(storeId, product).status !== "out";
}

export function canShipProduct(product: Product): boolean {
  return (
    product.inStock &&
    product.fulfillment.some(
      (method) => method === "delivery" || method === "same_day",
    )
  );
}

export function formatPickupEta(minutes: number): string {
  if (minutes < 60) return `Ready in ~${minutes} min`;
  const hours = Math.round(minutes / 60);
  return `Ready in ~${hours} hr`;
}

export function storeAvailabilityLabel(
  inventory: StoreInventory,
  store: StoreLocation,
): string {
  const shortName = store.name.replace(/^Walgreens RX —\s*/, "");
  if (inventory.status === "out") {
    return `Out of stock at ${shortName}`;
  }
  if (inventory.status === "low") {
    return `Only ${inventory.quantity} left · ${formatPickupEta(inventory.pickupMinutes)}`;
  }
  return `${formatPickupEta(inventory.pickupMinutes)} at ${shortName}`;
}

export function storeAvailabilityDetail(
  inventory: StoreInventory,
  store: StoreLocation,
  product: Product,
): { title: string; detail: string; tone: "ok" | "warn" | "bad" } {
  const shortName = store.name.replace(/^Walgreens RX —\s*/, "");
  if (inventory.status === "out") {
    if (canShipProduct(product)) {
      return {
        title: `Out at ${shortName}`,
        detail: "Still available to ship or try another store.",
        tone: "warn",
      };
    }
    return {
      title: `Out at ${shortName}`,
      detail: "Check another store or a related product below.",
      tone: "bad",
    };
  }
  if (inventory.status === "low") {
    return {
      title: `Low stock · ${formatPickupEta(inventory.pickupMinutes)}`,
      detail: `${inventory.quantity} left · ${inventory.aisle} · ${shortName}`,
      tone: "warn",
    };
  }
  return {
    title: formatPickupEta(inventory.pickupMinutes),
    detail: `In stock · ${inventory.aisle} · pickup at ${shortName}`,
    tone: "ok",
  };
}
