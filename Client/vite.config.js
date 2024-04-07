import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@shadcn": path.resolve(__dirname, "./@shadcn"),
    },
  },
});
