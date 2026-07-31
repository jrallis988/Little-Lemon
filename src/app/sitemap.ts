import type { MetadataRoute } from "next";
import { contentApi } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");
  const now = new Date();

  const staticRoutes = [
    "",
    "/find-a-doctor",
    "/conditions",
    "/programs",
    "/locations",
    "/appointments/request",
    "/emergency",
    "/patients-families",
    "/patients-families/prepare-for-your-visit",
    "/patients-families/billing",
    "/patients-families/medical-records",
    "/professionals",
    "/professionals/refer",
    "/professionals/second-opinion",
    "/research",
    "/about",
    "/search",
    "/privacy",
    "/terms",
    "/accessibility",
    "/non-discrimination",
    "/media-policy",
    "/sitemap",
  ].map((path) => ({
    url: `${base}${path || "/"}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const doctors = contentApi.providers.map((p) => ({
    url: `${base}/find-a-doctor/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const conditions = contentApi.conditions.map((c) => ({
    url: `${base}/conditions/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const programs = contentApi.programs.map((p) => ({
    url: `${base}/programs/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const locations = contentApi.locations.map((l) => ({
    url: `${base}/locations/${l.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...doctors, ...conditions, ...programs, ...locations];
}
