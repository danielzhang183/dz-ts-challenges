// type Last<T extends any[]> = T extends [...any, infer L] ? L : never
type Last<T extends any[]> = [any, ...T][T['length']]
