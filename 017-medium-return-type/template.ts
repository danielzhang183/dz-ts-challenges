type MyReturnType<T extends (...args: never[]) => unknown> = T extends (...args: never[]) => infer R ? R : never
