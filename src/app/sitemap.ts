import type { MetadataRoute } from "next";
import { getLaunchFeatures } from "@/lib/launch-mode";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? "https://trumprx.app";
  const features = getLaunchFeatures();
  const paths = [
    "",
    "/search",
    "/medications",
    "/access",
    "/pharmacies",
    "/help",
    "/help/pharmacist",
    "/help/counter-issue",
    "/faq",
    "/tools/insurance-calculator",
    "/privacy",
    "/terms",
    "/login",
    "/signup",
    "/forgot-password",
  ];
  if (features.membership) paths.push("/membership");
  if (features.transfer) paths.push("/transfer");
  if (features.providers) paths.push("/providers");

  return paths.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));
}
