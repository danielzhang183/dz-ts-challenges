// import { Includes } from './template';
import { Equal } from "@type-challenges/utils";

export type Includes<T extends readonly any[], U> = T extends [infer F, ...infer R]
  ? Equal<U, F> extends true
    ? true
    : Includes<R, U>
  : false
