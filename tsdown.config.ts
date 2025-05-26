import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: [
    'index.ts',
    'cli.ts',
  ],
  // format: ['esm', 'cjs'],
  exports: true,
  // unbundle: true,

  outputOptions: {
    hashCharacters: 'hex',
  },
})
