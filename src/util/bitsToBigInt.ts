export function bitsToBigInt(bits: number[]): bigint {
  return bits.reduce((acc, bit) => (acc << BigInt(1)) + BigInt(bit), BigInt(0));
}
