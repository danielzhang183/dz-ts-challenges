type AppendArgument<Fn, A> = Fn extends (...args: infer Args) => infer Return
  ? (...args: [...Args, A]) => Return
  : never
