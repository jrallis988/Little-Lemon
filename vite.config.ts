import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages serves this repo at /Little-Lemon/
const base = process.env.GITHUB_ACTIONS ? "/Little-Lemon/" : "/";

export default defineConfig({
  base,
  plugins: [react()],
});
