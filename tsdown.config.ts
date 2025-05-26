import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: [
    'index.ts',
    'cli.ts',
  ],
  exports: true,
  outputOptions: {
    hashCharacters: 'hex',
  },
})
