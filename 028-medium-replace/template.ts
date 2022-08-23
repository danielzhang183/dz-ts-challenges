// type Replace<S extends string, From extends string, To extends string> = S extends `${infer F}${From}${infer R}`
//   ? `${F}${R}` extends S
//     ? S
//     : `${F}${To}${R}`
//   : S

type Replace<S extends string, From extends string, To extends string> =
  From extends ''
    ? S
    : S extends `${infer F}${From}${infer R}`
      ? `${F}${To}${R}`
      : S
