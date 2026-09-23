import react from "@vitejs/plugin-react";
import type { Plugin } from "vite";
import { defineConfig, loadEnv } from "vite";

/**
 * When COURTSIDE_SITE_URL / VITE_SITE_URL is set at build time,
 * rewrite relative og/twitter image URLs to absolute ones for social crawlers.
 * Example: COURTSIDE_SITE_URL=https://jrallis988.github.io/Little-Lemon/courtside npm run build
 */
function absoluteShareMeta(siteUrl: string): Plugin {
  const base = siteUrl.replace(/\/$/, "");
  return {
    name: "courtside-absolute-share-meta",
    transformIndexHtml(html) {
      return html
        .replace(
          /content="\.\/og-image\.jpg"/g,
          `content="${base}/og-image.jpg"`
        )
        .replace(
          /href="\.\/favicon\.svg"/g,
          `href="${base}/favicon.svg"`
        );
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const siteUrl = env.COURTSIDE_SITE_URL || env.VITE_SITE_URL || "";

  return {
    plugins: [
      react(),
      ...(siteUrl ? [absoluteShareMeta(siteUrl)] : []),
    ],
    // Relative asset URLs work under /courtside/ on any static host
    base: "./",
    build: {
      // Published case study path for the static portfolio: /courtside/
      outDir: "../courtside",
      assetsDir: "assets",
      emptyOutDir: true,
    },
    server: {
      port: 5173,
      host: true,
    },
  };
});
