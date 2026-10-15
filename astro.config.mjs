import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import wasm from "vite-plugin-wasm";
import tailwindcss from "@tailwindcss/vite";
import svelte from "@astrojs/svelte";
import { remarkReadingTime } from "./remark/remark-reading-time.mjs";

// https://astro.build/config
export default defineConfig({
  srcDir: "src",
  integrations: [mdx(), svelte()],
  vite: {
    plugins: [wasm(), tailwindcss()],
    resolve: {
      extensions: [
        ".mjs",
        ".js",
        ".ts",
        ".jsx",
        ".tsx",
        ".json",
        ".vue",
        ".svelte",
        ".md",
        ".mdx",
        ".wasm",
      ],
    },
  },
  markdown: {
    remarkPlugins: [remarkReadingTime],
  },
  site: "https://rinaldolee.com",
});
