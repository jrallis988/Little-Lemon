import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Absolute base so /breakaway/dist and /breakaway/dist/ both resolve assets
  base: "/breakaway/dist/",
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
