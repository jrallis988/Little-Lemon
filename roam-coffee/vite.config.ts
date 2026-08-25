import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Absolute base so assets resolve when served from the portfolio at /roam-coffee/dist/
  base: '/roam-coffee/dist/',
  server: {
    port: 5173,
    host: true,
  },
});
