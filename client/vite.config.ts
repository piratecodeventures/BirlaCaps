import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@shared": path.resolve(import.meta.dirname, "../shared"),
      "@assets": path.resolve(import.meta.dirname, "../attached_assets"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    fs: {
      allow: ['..'],
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  // Include PDF and Excel files as assets
  assetsInclude: ['**/*.pdf', '**/*.xlsx', '**/*.xls'],
});