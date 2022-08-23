// type AllAwaited<T extends readonly any[]> = T extends [] 
//   ? [] 
//   : T extends readonly [infer F, ...infer R] 
//     ? [Awaited<F>, ...AllAwaited<R>] 
//     : never;

// declare function PromiseAll<T extends any[]>(values: readonly [...T]): Promise<AllAwaited<T>>

declare function PromiseAll<T extends any[]>(values: readonly [...T]):
  Promise<{[P in keyof T] : T[P] extends Promise<infer U> ? U: T[P]}>
