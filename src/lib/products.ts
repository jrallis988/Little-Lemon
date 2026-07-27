import { PRODUCTS } from "@/lib/data/catalog";
import type { Product } from "@/lib/types";

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((product) => product.slug === slug);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return PRODUCTS.filter(
    (item) => item.id !== product.id && item.categoryId === product.categoryId,
  )
    .concat(
      PRODUCTS.filter(
        (item) =>
          item.id !== product.id && item.categoryId !== product.categoryId,
      ),
    )
    .slice(0, limit);
}

export function getProductDescription(product: Product): string {
  const tags = product.tags.length
    ? product.tags.join(", ")
    : "everyday essentials";
  return `${product.brand} ${product.name}${
    product.subcategory ? ` for ${product.subcategory.toLowerCase()}` : ""
  }. ${tags.charAt(0).toUpperCase()}${tags.slice(1)}. Available for pickup at your neighborhood Walgreens RX.`;
}
