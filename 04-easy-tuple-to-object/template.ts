type TupleToObject<T extends readonly (string | number)[]> = {
  [P in T[number]]: P
}

const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const
type t = TupleToObject<typeof tuple>
