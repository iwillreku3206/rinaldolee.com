export function factorial(n: number) {
  let o = 1;
  for (let i = 2; i <= n; i++) {
    o *= i;
  }
  return o;
}

export function comb(n: number, r: number) {
  return factorial(n) / (factorial(r) * factorial(n - r));
}

export function summation(start: number, upperLimit: number, func: (x: number) => number) {
  let o = 0;
  for (let i = start; i <= upperLimit; i++) {
    o += func(i)
  }
  return o;
}
