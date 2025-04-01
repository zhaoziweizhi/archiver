import { createWriteStream } from 'node:fs'
import createArchiver from 'archiver'
import colors from 'picocolors'

export async function zip(input: string, output: string) {
  console.log(`${colors.cyan('[archiver]')} start zipping ${input}...`)

  const archiver = createArchiver('zip', { zlib: { level: 9 } })

  const stream = createWriteStream(output)
  stream.on('warning', error => console.warn(error))
  stream.on('error', error => console.error(error))
  stream.on('close', () => {
    const B = archiver.pointer()
    const KiB = B / 1024
    const MiB = KiB / 1024
    const size = KiB < 1e4 ? `${KiB.toFixed(2)} KiB` : `${MiB.toFixed(2)} MiB`
    console.log(`${colors.cyan('[archiver]')} ${colors.yellow(output)} ${colors.gray(`${size}`)}`)
  })

  archiver.pipe(stream)
  archiver.directory(input, false)

  await archiver.finalize()
}
