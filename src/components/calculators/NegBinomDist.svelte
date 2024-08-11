<script lang="ts">
  import katex from "katex";
  import { comb } from "../../util/math";
  const k = katex.renderToString;

  let probability = 0;
  let numSuccess = 0;
  let numEvents = 0;

  function negBinomDist(k: number, x: number, p: number) {
    return comb(x - 1, k - 1) * p ** k * (1 - p) ** (x - k);
  }

  function setGeometric() {
    numSuccess = 1;
  }
</script>

<div class="flex flex-col gap-2">
  <button class="btn btn-primary" on:click={setGeometric}
    >Set geometric distribution</button
  >
  <label for="numEvents" class="text-xl">
    Number of Successful Events {@html k("(k)")}
  </label>
  <input
    type="number"
    id="numSuccess"
    class="input input-primary"
    bind:value={numSuccess}
  />
  <label for="numSuccess" class="text-xl">
    Number of Events {@html k("(0 \\sim x)")}
  </label>
  <input
    type="number"
    id="numEvents"
    class="input input-primary"
    bind:value={numEvents}
  />
  <label for="probability" class="text-xl">Probability of Success</label>
  <input
    type="number"
    id="probability"
    class="input input-primary"
    bind:value={probability}
  />
</div>

<table class="table max-w-md">
  <thead>
    <th>{@html k("x")} (Number of Trials)</th>
    <th>{@html k("P(x)")}</th>
  </thead>
  <tbody>
    {#each [...Array(numEvents).keys()].map((x) => x + 1) as x}
      <tr>
        <td>{x}</td>
        <td>{negBinomDist(numSuccess, x, probability).toFixed(4)}</td>
      </tr>
    {/each}
  </tbody>
</table>

<p class="mb-4">{@html k(`\\mu_X=${(numSuccess / probability).toFixed(4)}`)}</p>
<p>
  {@html k(
    `\\sigma^2_X=${((numSuccess * (1 - probability)) / probability ** 2).toFixed(4)}`,
  )}
</p>
