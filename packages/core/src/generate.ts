import path from 'node:path'
import fs from 'fs-extra'
import { supportedLocales } from './locales'
import type { GenerateOptions } from './types'
import { resolveConfig } from './config'
import { formatToCode } from './utils/formatToCode'
import { loadQuizzes } from './loader/quizzes'

export async function generate(options: GenerateOptions) {
  options = await resolveConfig(options)
  const {
    paths: { quizzes: quizzesPath },
    locale: localeFromOptions,
  } = options
  const locale = supportedLocales.find(locale => locale === localeFromOptions)!

  await fs.remove(quizzesPath)
  await fs.ensureDir(quizzesPath)

  const quizzes = await loadQuizzes()
  for (const quiz of quizzes) {
    const code = formatToCode(quiz, locale)
    const filepath = path.join(quizzesPath, `${quiz.no}.ts`)

    await fs.writeFile(filepath, code, 'utf-8')
  }
}
