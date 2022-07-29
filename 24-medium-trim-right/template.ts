type TrimRight<S> = S extends `${infer T}${WhiteSpace}` ? TrimRight<T> : S
