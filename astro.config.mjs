import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from '@astrojs/mdx';
import wasm from 'vite-plugin-wasm'
import wasmPack from 'vite-plugin-wasm-pack';
import topLevelAwait from 'vite-plugin-top-level-await'

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  srcDir: "src",
  integrations: [tailwind(), mdx(), svelte(), wasm()],
  vite: {
    plugins: [wasm(), topLevelAwait(), wasmPack('rinaldolee_com_wasm')],
    resolve: {
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue', '.svelte', '.md', '.mdx', '.wasm']
    }
  }
});
