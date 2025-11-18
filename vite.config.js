import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { config } from "dotenv";

config();

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  define: {
    "process.env": process.env,
  },
});
