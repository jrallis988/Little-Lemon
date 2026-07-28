import type { MetadataRoute } from "next";

/** Export robots + sitemap hints for production crawl hygiene. */
export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? "https://trumprx.app";
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/profile", "/login", "/signup"],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
