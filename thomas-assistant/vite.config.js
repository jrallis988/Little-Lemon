import { defineConfig } from "vite";
import { sveltekit } from "@sveltejs/kit/vite";

// @ts-expect-error process is a nodejs global
const host = process.env.TAURI_DEV_HOST;

const ollamaProxy = {
  "/api/ollama": {
    target: "http://127.0.0.1:11434",
    changeOrigin: true,
    rewrite: (/** @type {string} */ path) => path.replace(/^\/api\/ollama/, ""),
  },
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [sveltekit()],

  // Proxy Ollama for browser chat (avoids CORS; same origin as dev/preview).
  server: {
    port: 1420,
    strictPort: true,
    host: host || false,
    hmr: host
      ? {
          protocol: "ws",
          host,
          port: 1421,
        }
      : undefined,
    watch: {
      ignored: ["**/src-tauri/**"],
    },
    proxy: ollamaProxy,
  },
  preview: {
    port: 4173,
    host: true,
    allowedHosts: true,
    proxy: ollamaProxy,
  },
});
