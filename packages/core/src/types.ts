export declare type DeepPartial<T> = T extends Function
  ? T
  : T extends Array<infer U>
    ? _DeepPartialArray<U>
    : T extends object
      ? _DeepPartialObject<T>
      : T | undefined
/** @private */
export interface _DeepPartialArray<T> extends Array<DeepPartial<T>> {}
/** @private */
export declare type _DeepPartialObject<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
}

export interface QuizMetaInfo {
  title: string
  author: {
    name: string
    email: string
    github: string
  }
  tsconfig?: Record<string, any>
  original_issues: number[]
  recommended_solutions: number[]
  tags: string[]
  related?: string[]
}

export type Difficulty = 'warm' | 'easy' | 'medium' | 'hard' | 'extreme' | 'pending'

export interface Quiz {
  no: number
  difficulty: Difficulty
  path: string
  readme: Record<string, string>
  template: string
  info: Record<string, DeepPartial<QuizMetaInfo> | undefined>
  tests?: string
  solutions?: {
    code?: string
    readme?: Record<string, string>
  }
}

export interface CommonOptions {
  cwd?: string
  root?: string
  paths?: {
    quizzes?: string
  }
  locale?: 'zh-CN' | 'en'
  isResolved?: boolean
}

export interface GenerateOptions extends CommonOptions {
  paths: {
    quizzes: string
  }
}
