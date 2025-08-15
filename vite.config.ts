import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      constant: path.resolve('src', 'constant'),
    },
  },
});
