import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'index.ts',
    'cli.ts',
  ],
  declaration: true,
  rollup: {
    emitCJS: true,
  },
})
