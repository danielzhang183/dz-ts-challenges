type MyExclude<T, U> = T extends U ? never : T

// usage
// type a = MyExclude<'a' | 'b' | 'c', 'a'>
