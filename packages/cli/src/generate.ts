import fs from 'fs-extra'
import c from 'picocolors'
import prompts from 'prompts'
import { generate, supportedLocales } from 'dz-ts-challenges/src'
import type { CommandOptions } from './types'

export async function generateFromCommand(options: CommandOptions) {
  const {
    paths: { quizzes: quizzesPath },
  } = options

  console.log(c.bold(c.cyan('Generating local playground...\n')))

  if (fs.existsSync(quizzesPath)) {
    const result = await prompts([{
      name: 'confirm',
      type: 'confirm',
      initial: false,
      message: 'The playground directory already exists, it may contains the answers you did. Do you want to override it?',
    }])
    if (!result?.confirm)
      return console.log(c.yellow('Skipped.'))
  }

  if (!options.locale) {
    const result = await prompts([{
      name: 'locale',
      type: 'select',
      message: 'Select language:',
      choices: supportedLocales.map(i => ({
        title: i,
        value: i,
      })),
    }])
    if (!result)
      return console.log(c.yellow('Skipped.'))
    options.locale = result.locale
  }

  await generate(options)

  console.log()
  console.log(c.bold(c.green('Local playground generated at: ')) + c.dim(quizzesPath))
  console.log()
}
