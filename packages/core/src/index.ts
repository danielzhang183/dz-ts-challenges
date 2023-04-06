import type { CommonOptions } from './types'

export * from './generate'
export * from './config'
export * from './types'
export * from './locales'

export function defineConfig(config: Partial<CommonOptions>) {
  return config
}
