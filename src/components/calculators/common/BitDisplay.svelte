<script lang="ts">
  export let value: bigint;
  export let bitCount: bigint;
  export let rows: number = 1;
  const bitOneClass = "text-black bg-slate-500 ";
  const bitZeroClass = "text-white bg-slate-800 ";
  let bitArray: bigint[] = [];
  $: {
    bitArray = [];
    for (let i = BigInt(0); i < bitCount; i++) {
      const lshift = BigInt(1) << i;
      const mask = value & lshift;
      const bit = mask >> i;
      bitArray.push(bit);
    }
  bitArray.reverse();
  }
</script>

<div
  class="grid gap-1 w-[min-content] h-[min-content]"
  style={`grid-template-columns: repeat(${Math.ceil(bitArray.length / rows)}, 1fr);`}
>
  {#each bitArray as bit}
    <div
      class={`w-6 h-6 text-xs flex items-center justify-center ${bit === BigInt(1) ? bitOneClass : bitZeroClass}`}
    >
      {bit}
    </div>
  {/each}
</div>
