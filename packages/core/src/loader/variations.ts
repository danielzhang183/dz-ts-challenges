import path from 'node:path'
import { defaultLocale, supportedLocales } from '../locales'
import { loadFile } from './file'

export async function loadLocaleVariations<T = string>(
  filepath: string,
  preprocessor: (s: string) => T = s => s as any as T,
) {
  const { ext, dir, name } = path.parse(filepath)
  const data: Record<string, T> = {}

  for (const locale of supportedLocales) {
    const file = preprocessor(await loadFile(path.join(dir, `${name}.${locale}${ext}`)) || '')

    if (file)
      data[locale] = file
  }

  if (!data[defaultLocale]) {
    // default version
    const file = preprocessor(await loadFile(filepath) || '')
    if (file)
      data[defaultLocale] = file
  }

  return data
}
