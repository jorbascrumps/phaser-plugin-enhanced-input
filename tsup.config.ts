import {defineConfig} from 'tsup';


export default defineConfig({
    entry: ['src/index.ts'],
    format: ['esm', 'cjs'],
    target: 'es2020',
    splitting: false,
    sourcemap: true,
    clean: true,
    dts: true,
    external: ['phaser'], // <-- This ensures Phaser is not bundled
});
