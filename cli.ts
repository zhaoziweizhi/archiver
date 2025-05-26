import type { Format } from 'archiver'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { cac } from 'cac'
import { zip } from '.'
import { version } from './package.json'

const cli = cac('archiver')

cli
  .command('[input] <output>', '压缩指定目录至文件名')
  .option('-f, --format <format>', '格式 - format of the output file', { default: 'zip' })
  .option('-v, --version-suffix', '版本后缀', { default: false })
  .option('-t, --time-suffix', '时间后缀', { default: false })
  .action(async (input, rename, options) => {
    const timeSuffix = getTimeSuffix()
    const format: Format = options.format ?? 'zip' // "zip" | "tar"
    const output = [
      rename || input,
      getVersionSuffix(options.versionSuffix),
      options.timeSuffix ? timeSuffix : '',
      '.', format,
    ].join('')

    await zip(input, output, format)
  })

cli.help()
cli.version(version, '--version')
cli.parse()

function getVersionSuffix(value: boolean) {
  if (value) {
    const packageJsonPath = path.resolve(process.cwd(), 'package.json')
    if (fs.existsSync(packageJsonPath)) {
      const packageJsonText = fs.readFileSync(packageJsonPath, 'utf8')
      const packageJson = JSON.parse(packageJsonText)
      if (packageJson.version) {
        return `-v${packageJson.version}`
      }
    }
  }
  return ''
}

function getTimeSuffix() {
  return `-${new Date().toLocaleString('zh', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).replace(/[/\s]/g, '-').replace(/:/g, '')}`
}
