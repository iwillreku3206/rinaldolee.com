<script lang="ts">
  import katex from "katex";
  import { comb, summation } from "../../util/math";
  const k = katex.renderToString;

  let popSize = 0;
  let numSuccess = 0;
  let sampleSize = 0;

  function hyperGeoDist(K: number, x: number, N: number, n: number) {
    return (comb(K, x) * comb(N - K, n - x)) / comb(N, n);
  }
</script>

<div class="flex flex-col gap-2">
  <label for="popSize" class="text-xl">Population Size</label>
  <input
    type="number"
    id="popSize"
    class="input input-primary"
    bind:value={popSize}
  />
  <label for="numSuccess" class="text-xl">Number of Successful Events</label>
  <input
    type="number"
    id="numSuccess"
    class="input input-primary"
    bind:value={numSuccess}
  />
  <label for="sampleSize" class="text-xl">Sample Size</label>
  <input
    type="number"
    id="sampleSize"
    class="input input-primary"
    bind:value={sampleSize}
  />
</div>

<table class="table max-w-md">
  <thead>
    <th>{@html k("\\text{Number of successes}")}</th>
    <th>{@html k("P(x)")}</th>
  </thead>
  <tbody>
    {#each [...Array(sampleSize).keys(), sampleSize] as x}
      <tr>
        <td>{x}</td>
        <td>{hyperGeoDist(numSuccess, x, popSize, sampleSize).toFixed(4)}</td>
      </tr>
    {/each}
  </tbody>
</table>

<p class="mb-4">
  {@html k(`\\mu_X=${((sampleSize * numSuccess) / popSize).toFixed(4)}`)}
</p>
<p>
  {@html k(
    `\\sigma^2_X=${(((sampleSize * numSuccess) / popSize) * (1 - numSuccess / popSize) * ((popSize - sampleSize) / (popSize - 1))).toFixed(4)}`,
  )}
</p>
