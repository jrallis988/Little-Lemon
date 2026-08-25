import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Relative base so the built case study works from /apex-hockey/site on the static portfolio host
export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    outDir: "site",
    assetsDir: "assets",
    sourcemap: true,
    emptyOutDir: true,
  },
});
