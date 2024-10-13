import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      { find: "@/", replacement: path.resolve(__dirname) },
      {
        find: "@hooks",
        replacement: path.resolve(__dirname, "hooks"),
      },
      {
        find: "@layouts",
        replacement: path.resolve(__dirname, "layouts"),
      },
      {
        find: "@components",
        replacement: path.resolve(__dirname, "components"),
      },
      { find: "@pages", replacement: path.resolve(__dirname, "pages") },
      { find: "@utils", replacement: path.resolve(__dirname, "utils") },
      {
        find: "@typings",
        replacement: path.resolve(__dirname, "typings"),
      },
    ],
  },
  server: {
    proxy: {
      "/api": "http://localhost:8080",
    },
    port: 3000,
  },
  plugins: [react()],
});
