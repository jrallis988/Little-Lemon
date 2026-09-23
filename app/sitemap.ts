import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";
import { issues } from "@/lib/issues";
import { storeProducts } from "@/lib/store";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const lastModified = new Date();

  const staticPaths = [
    "/",
    "/meet-nick",
    "/violet-party",
    "/issues",
    "/how-to-vote",
    "/volunteer",
    "/shop",
    "/contact",
    "/press",
    "/transparency",
    "/privacy",
    "/terms",
    "/events",
    "/endorsements",
    "/faq",
    "/accessibility",
    "/come-to-my-town",
  ];

  const issuePaths = issues.map((issue) => `/issues/${issue.slug}`);
  const shopPaths = storeProducts.map((p) => `/shop/${p.slug}`);

  return [...staticPaths, ...issuePaths, ...shopPaths].map((path) => ({
    url: `${base}${path}`,
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.startsWith("/issues") ? 0.8 : 0.6,
  }));
}
