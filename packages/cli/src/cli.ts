import cac from 'cac'
import { resolveConfig } from 'dz-ts-challenges'
import { version } from '../package.json'
import { generateFromCommand } from './generate'
import type { CommandOptions } from './types'

const cli = cac('dz-ts-challenges')

cli
  .version(version)
  .option('-r, --root <path>', 'root path')
  .option('-locale, --locale <locale>', 'locale')
  .help()

cli
  .command('generate')
  .action(generate)

cli
  .command('')
  .action(() => {
    cli.outputHelp()
  })

cli.parse()

async function generate(options: CommandOptions) {
  await generateFromCommand(await resolveConfig(options))
}
