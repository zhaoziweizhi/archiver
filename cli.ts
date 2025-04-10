import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { cac } from 'cac'
import { zip } from '.'
import { version } from './package.json'

const cli = cac('archiver')

cli
  .command('[input] <rename>', '压缩指定目录或文件')
  .option('--output', '输出文件 - name of the output zip file')
  .option('--version-suffix', '版本后缀', { default: false })
  .option('--time-suffix', '时间后缀', { default: false })
  .action(async (input, rename, options) => {
    const timeSuffix = `-${new Date().toLocaleString('zh', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).replace(/[/\s]/g, '-').replace(/:/g, '')}`

    const output = [
      rename || options.output || input,
      getVersionSuffix(options.versionSuffix),
      options.timeSuffix ? timeSuffix : '',
      '.zip',
    ].join('')

    await zip(input, output)
  })
cli.command('list', '列出压缩包中的文件')
cli.help()
cli.version(version)
cli.parse()

function getVersionSuffix(value: any) {
  // --version-suffix
  if (value === true) {
    const packageJsonPath = path.resolve(process.cwd(), 'package.json')
    if (fs.existsSync(packageJsonPath)) {
      const packageJsonText = fs.readFileSync(packageJsonPath, 'utf8')
      const packageJson = JSON.parse(packageJsonText)
      if (packageJson.version) {
        return `-v${packageJson.version}`
      }
    }
  }
  // --version-suffix [VERSION]
  if (typeof value === 'string') {
    return `-v${value}`
  }
  // null
  return ''
}
