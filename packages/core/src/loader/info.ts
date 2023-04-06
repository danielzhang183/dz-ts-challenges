import YAML from 'js-yaml'
import type { Quiz, QuizMetaInfo } from '../types'
import { defaultLocale } from '../locales'

export function loadInfo(s: string): Partial<QuizMetaInfo> | undefined {
  const object = YAML.load(s) as any
  if (!object)
    return undefined

  const arrayKeys = ['tags', 'related']

  for (const key of arrayKeys) {
    if (object[key]) {
      object[key] = (object[key] || '')
        .toString()
        .split(',')
        .map((i: string) => i.trim())
        .filter(Boolean)
    }
    else {
      object[key] = undefined
    }
  }

  return object
}

export function resolveInfo(quiz: Quiz, locale: string = defaultLocale): QuizMetaInfo {
  const info = Object.assign({}, quiz.info[defaultLocale], quiz.info[locale])
  info.tags = quiz.info[locale]?.tags || quiz.info[defaultLocale]?.tags || []
  info.related = quiz.info[locale]?.related || quiz.info[defaultLocale]?.related || []

  if (typeof info.tags === 'string')
    // @ts-expect-error no
    info.tags = info.tags.split(',').map(i => i.trim()).filter(Boolean)

  return info as QuizMetaInfo
}
