import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? "https://trumprx.app";
  const paths = [
    "",
    "/search",
    "/pharmacies",
    "/checkout",
    "/help",
    "/membership",
    "/privacy",
    "/terms",
    "/login",
    "/signup",
  ];
  return paths.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));
}
