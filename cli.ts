import { cac } from 'cac'
import { zip } from '.'
import { version } from './package.json'

const cli = cac('archiver')

cli
  .command('[input] <rename>', '压缩指定目录或文件')
  .option('--output', '输出文件 - name of the output zip file')
  .option('--time-suffix', '时间后缀', { default: false })
  .action(async (input, rename, options) => {
    console.log(`开始压缩 ${input}...`)
    const suffix = `-${new Date().toLocaleString('zh', {
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
      options.timeSuffix ? suffix : '',
      '.zip',
    ].join('')

    await zip(input, output)
    console.log('压缩完成')
  })

cli.help()
cli.version(version)
cli.parse()
