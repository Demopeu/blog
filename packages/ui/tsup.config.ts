import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/**/*.{ts,tsx}'],
  outDir: 'dist',
  format: ['esm'],
  bundle: false,
  dts: true,
  esbuildOptions(options) {
    options.jsx = 'automatic';
  },
  clean: true,
  sourcemap: true,
  target: 'esnext',
});
