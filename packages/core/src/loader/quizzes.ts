import path from 'node:path'
import fg from 'fast-glob'
import type { Quiz } from '../types'
import { loadLocaleVariations } from './variations'
import { loadFile } from './file'
import { loadInfo } from './info'
import { readmeCleanUp } from './readme'

export const QUIZ_ROOT = path.resolve(__dirname, '../questions')

export async function loadQuizzes(): Promise<Quiz[]> {
  const folders = await fg('{0..9}*-*', {
    onlyDirectories: true,
    cwd: QUIZ_ROOT,
  })

  const quizzes = await Promise.all(
    folders.map(async dir => loadQuiz(dir)),
  )

  return quizzes
}

export async function loadQuiz(dir: string): Promise<Quiz> {
  return {
    no: Number(dir.replace(/^(\d+)-.*/, '$1')),
    difficulty: dir.replace(/^\d+-(.+?)-.*$/, '$1') as any,
    path: dir,
    info: await loadLocaleVariations(path.join(QUIZ_ROOT, dir, 'info.yml'), loadInfo),
    readme: await loadLocaleVariations(path.join(QUIZ_ROOT, dir, 'README.md'), readmeCleanUp),
    template: await loadFile(path.join(QUIZ_ROOT, dir, 'template.ts')) || '',
    tests: await loadFile(path.join(QUIZ_ROOT, dir, 'test-cases.ts')),
  }
}
