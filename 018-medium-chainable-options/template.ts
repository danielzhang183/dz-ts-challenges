// type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false;

// type Chainable = {
//   option<CH extends Chainable & { [key: string]: unknown }, K extends string, V>(
//     this: CH,
//     key: K,
//     value: Equal<CH[K], V> extends true ? never : V,
//   ): { [P in keyof CH | K]: P extends K ? V : CH[P] };
//   get<CH>(this: CH): Omit<CH, keyof Chainable>;
// };

type Chainable<T = {}> = {
  option<K extends string, V>(
    key: K extends keyof T
      ? T[K] extends V 
        ? never
        : K
      : K,
    value: V
    ): Chainable<{
      [Key in keyof T as Key extends K ? never : Key]: T[Key]} & {[key in K]: V
    }>
    // Chainable<Omit<T, K> & Record<K, V>>
  get(): T
}
