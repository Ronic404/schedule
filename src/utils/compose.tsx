const compose = (...funcs: any[]) => (comp: any): any => funcs.reduceRight(
  (wrapped, f) => f(wrapped), comp,
);

export default compose;
