import { defineConfig } from 'vite';
import path from 'path';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// https://vite.dev/config/
export default defineConfig({
  build: { emptyOutDir: true },
  plugins: [svelte()],
  resolve: {
    alias: {
      utils: path.resolve('src', 'utils'),
      constant: path.resolve('src', 'constant'),
    },
  },
});
