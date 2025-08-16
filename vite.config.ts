import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      types: path.resolve('src', 'types'),
      constant: path.resolve('src', 'constant'),
      animations: path.resolve('src', 'animations'),
    },
  },
});
