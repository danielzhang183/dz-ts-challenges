// type TupleToUnion<T extends readonly any[]> = T[number]
// type TupleToUnion<T> = T extends (infer U)[] ? U : never
type TupleToUnion<T> = T extends [infer F, ...infer R] ? F | TupleToUnion<R> : never
