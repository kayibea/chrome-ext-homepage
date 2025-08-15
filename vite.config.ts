import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      animations: path.resolve('src', 'animations'),
      types: path.resolve('src', 'types'),
      constant: path.resolve('src', 'constant'),
    },
  },
});
