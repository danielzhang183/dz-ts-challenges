// type ReplaceAll<S extends string, From extends string, To extends string> =
//   S extends `${infer F}${From}${infer R}`
//     ? `${F}${R}` extends S
//       ? S
//       : `${F}${To}${ReplaceAll<`${R}`, From, To>}`
//     : S

type ReplaceAll<S extends string, From extends string, To extends string> = From extends ''
  ? S
  : S extends `${infer F}${From}${infer R}`
    ? `${F}${To}${ReplaceAll<`${R}`, From, To>}`
    : S
