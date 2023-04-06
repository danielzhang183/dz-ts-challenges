import { resolve } from 'node:path'
import { createConfigLoader } from 'unconfig'
import createDebug from 'debug'
import deepmerge from 'deepmerge'
import type { CommonOptions } from './types'

const debug = createDebug('dz-ts-challenges:config')

export function normalizeConfig<T extends CommonOptions>(options: T): T {
  const {
    root = process.cwd(),
    paths = {},
  } = options

  const { quizzes } = paths
  paths.quizzes = resolve(root, quizzes || './packages/quizzes')

  options.root = root
  options.isResolved = true

  return options
}

export async function resolveConfig<T extends CommonOptions>(options: T): Promise<T> {
  if (options.isResolved)
    return options

  options = normalizeConfig(options)

  const loader = createConfigLoader<CommonOptions>({
    sources: [
      {
        files: [
          'ts-challenges.config',
        ],
      },
      {
        files: [
          '.ts-challengesrc',
        ],
        extensions: ['json', ''],
      },
    ],
    cwd: options.cwd || process.cwd(),
    merge: false,
  })

  const config = await loader.load()

  if (!config.sources.length)
    return options

  debug(`config file found ${config.sources[0]}`)
  const configOptions = normalizeConfig(config.config)
  debug(`normalized config ${JSON.stringify(configOptions)}`)
  const mergedOptions = deepmerge(configOptions, options)
  debug(`merged config ${JSON.stringify(mergedOptions)}`)

  return mergedOptions as T
}
