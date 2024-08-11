<script lang="ts">
  import katex from "katex";
  import { comb, summation } from "../../util/math";
  const k = katex.renderToString;

  let numEvents = 0;
  let probability = 0;

  $: {
    numEvents = numEvents - (numEvents % 1);
  }

  function binomDist(n: number, x: number, p: number) {
    return comb(n, x) * p ** x * (1 - p) ** (n - x);
  }

  function setBernoulli() {
    numEvents = 1;
  }
</script>

<div class="flex flex-col gap-2">
  <button class="btn btn-primary" on:click={setBernoulli}
    >Set bernoulli distribution</button
  >
  <label for="numEvents" class="text-xl">Number of Events</label>
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
    <th>{@html k("x")}</th>
    <th>{@html k("P(x)")}</th>
    <th>{@html k("P(\\leq x)")}</th>
    <th>{@html k("P(\\lt x)")}</th>
    <th>{@html k("P(\\gt x)")}</th>
    <th>{@html k("P(\\geq x)")}</th>
  </thead>
  <tbody>
    {#each [...Array(numEvents).keys(), numEvents] as x}
      <tr>
        <td>{x}</td>
        <td>{binomDist(numEvents, x, probability).toFixed(4)}</td>
        <td>
          {summation(0, x, (X) => binomDist(numEvents, X, probability)).toFixed(
            4,
          )}
        </td>
        <td>
          {summation(0, x - 1, (X) =>
            binomDist(numEvents, X, probability),
          ).toFixed(4)}
        </td>
        <td>
          {summation(x + 1, numEvents, (X) =>
            binomDist(numEvents, X, probability),
          ).toFixed(4)}
        </td>
        <td>
          {summation(x, numEvents, (X) =>
            binomDist(numEvents, X, probability),
          ).toFixed(4)}
        </td>
      </tr>
    {/each}
  </tbody>
</table>

<p class="mb-4">{@html k(`\\mu_X=${(numEvents * probability).toFixed(4)}`)}</p>
<p>
  {@html k(
    `\\sigma^2_X=${(numEvents * probability * (1 - probability)).toFixed(4)}`,
  )}
</p>
