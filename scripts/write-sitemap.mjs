#!/usr/bin/env node
/**
 * Rewrite sitemap.xml locs to absolute URLs using PLAYHOUSE siteUrl or SITE_URL env.
 * Usage: SITE_URL=https://playhouseanimation.com node scripts/write-sitemap.mjs
 */
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const root = new URL("..", import.meta.url).pathname;
const cfg = readFileSync(join(root, "config.js"), "utf8");
const fromConfig = (cfg.match(/siteUrl:\s*"([^"]*)"/) || [])[1] || "";
const base = (process.env.SITE_URL || fromConfig || "").replace(/\/$/, "");

const paths = [
  "/",
  "/films/lemon-friend.html",
  "/films/starry-friends.html",
  "/films/lemon-bus.html",
  "/films/storybook-magic.html",
  "/studio/educators.html",
  "/studio/partners.html",
  "/studio/co-production.html",
  "/privacy.html",
  "/terms.html",
];

const urls = paths
  .map((p) => {
    const loc = base ? `${base}${p === "/" ? "/" : p}` : p;
    return `  <url><loc>${loc}</loc></url>`;
  })
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

writeFileSync(join(root, "sitemap.xml"), xml);
console.log(base ? `Wrote absolute sitemap for ${base}` : "Wrote relative sitemap (set siteUrl or SITE_URL for absolute)");
