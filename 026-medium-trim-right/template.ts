type TrimRight<S extends string> = S extends `${infer T}${WhiteSpace}` ? TrimRight<T> : S
