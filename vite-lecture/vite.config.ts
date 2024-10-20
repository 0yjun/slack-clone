import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
//import tsconfigPaths from 'vite-tsconfig-paths'
import dotenv from "dotenv";
import * as process from "process";
import * as path from "node:path";

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "src") },
      {
        find: "@hooks",
        replacement: path.resolve(__dirname, "src/hooks"),
      },
      {
        find: "@layouts",
        replacement: path.resolve(__dirname, "src/layouts"),
      },
      { find: "@pages", replacement: path.resolve(__dirname, "src/pages") },
      { find: "@utils", replacement: path.resolve(__dirname, "src/utils") },
      {
        find: "@typings",
        replacement: path.resolve(__dirname, "src/typings"),
      },
      {
        find: "@component",
        replacement: path.resolve(__dirname, "src/component"),
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
  plugins: [react()],
});
