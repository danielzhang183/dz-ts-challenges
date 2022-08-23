type MyReadonly2<T, K extends keyof T = keyof T> = MyReadonly<MyPick<T, K>> & MyOmit<T, K>
