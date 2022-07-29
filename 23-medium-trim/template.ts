type WhiteSpace = ' ' | '\t' | '\n'
type Trim<S> = S extends `${WhiteSpace}${infer T}`|`${infer T}${WhiteSpace}` ? Trim<T> : S
