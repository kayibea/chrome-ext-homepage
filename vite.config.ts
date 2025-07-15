import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// https://vite.dev/config/
export default defineConfig({
  build: { emptyOutDir: true },
  // build: {
  //   outDir: "dist",
  //   emptyOutDir: true,
  //   rollupOptions: {
  //     input: {
  //       main: "src/main.ts",
  //     },
  //     output: {
  //       entryFileNames: "scripts/[name].js",
  //       chunkFileNames: "scripts/[name].js",
  //       assetFileNames: "assets/[name][extname]",
  //       manualChunks: undefined,
  //     },
  //   },
  // },
  plugins: [svelte()],
});
