type WhiteSpace = ' ' | '\t' | '\n'
type Trim<S extends string> = S extends `${WhiteSpace}${infer T}`|`${infer T}${WhiteSpace}` ? Trim<T> : S
