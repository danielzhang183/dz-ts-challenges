// type MyOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

type MyPick1<T, K extends keyof T> = {
  [P in K]: T[P]
}
type MyExclude1<T, K> = T extends K ? never : T
type MyOmit<T, K extends keyof T> = MyPick1<T, MyExclude1<keyof T, K>>
