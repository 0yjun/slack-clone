import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname) },
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
      "/api":
        process.env.mod == "prd"
          ? "http://localhost:8082"
          : "http://localhost:8081",
    },
    port: 3000,
  },
  plugins: [react(), tsconfigPaths()],
});
