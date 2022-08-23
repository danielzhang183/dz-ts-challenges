type Permutation<T> = T extends `${infer F}`| `${infer R}`
  ?
  : []
