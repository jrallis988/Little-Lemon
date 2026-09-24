import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages: https://jrallis988.github.io/Little-Lemon/smuttynose/
const base = process.env.GITHUB_ACTIONS ? "/Little-Lemon/smuttynose/" : "/";

export default defineConfig({
  base,
  plugins: [react()],
});
