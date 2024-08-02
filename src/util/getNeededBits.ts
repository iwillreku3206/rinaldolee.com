export function getNeededBits(n: number): number {
  if (n <= 1) return 1;
  return Math.ceil(Math.log2(Number(n)))
}

export function getNeededBitsBI(n: bigint): number {
  return n.toString(2).length
}
