type TrimLeft<S> = S extends `${WhiteSpace}${infer T}` ? TrimLeft<T> : S
