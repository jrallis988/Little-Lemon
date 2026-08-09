import type { MetadataRoute } from "next";

import { PRODUCTS } from "@/lib/data/catalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/shop",
    "/pharmacy",
    "/pharmacy/schedule",
    "/pharmacy/transfer",
    "/pharmacy/auto-refill",
    "/deals",
    "/photo",
    "/stores",
    "/checkout",
    "/account",
    "/help",
    "/privacy",
    "/terms",
    "/pharmacy-notice",
  ];

  return [
    ...staticRoutes.map((path) => ({
      url: `https://walgreensrx.demo${path}`,
      lastModified: new Date(),
    })),
    ...PRODUCTS.map((product) => ({
      url: `https://walgreensrx.demo/shop/${product.slug}`,
      lastModified: new Date(),
    })),
  ];
}
