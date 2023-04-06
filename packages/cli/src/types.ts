import type { CommonOptions } from 'dz-ts-challenges'

export interface CommandOptions extends CommonOptions {
  paths: {
    quizzes: string
  }
}
