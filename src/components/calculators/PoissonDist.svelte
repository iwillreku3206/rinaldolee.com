<script lang="ts">
  import katex from "katex";
  import { comb, factorial, summation } from "../../util/math";
  const k = katex.renderToString;

  let lambda = 0;
  let numEvents = 0;

  function poissonDist(lambda: number, x: number) {
    return (Math.E ** -lambda * lambda ** x) / factorial(x);
  }
</script>

<div class="flex flex-col gap-2">
  <label for="numEvents" class="text-xl">
    Number of Events {@html k("(0 \\sim x)")}
  </label>
  <input
    type="number"
    id="numEvents"
    class="input input-primary"
    bind:value={numEvents}
  />
  <label for="lambda" class="text-xl">Lambda {@html k("\\lambda")}</label>
  <input
    type="number"
    id="lambda"
    class="input input-primary"
    bind:value={lambda}
  />
</div>

<table class="table max-w-md">
  <thead>
    <th>{@html k("x")} (Number of Trials)</th>
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
        <td>{poissonDist(lambda, x).toFixed(4)}</td>
        <td>{summation(0, x, (n) => poissonDist(lambda, n)).toFixed(4)}</td>
        <td>{summation(0, x - 1, (n) => poissonDist(lambda, n)).toFixed(4)}</td>
        <td>{summation(x + 1, numEvents, (n) => poissonDist(lambda, n)).toFixed(4)}</td>
        <td>{summation(x, numEvents, (n) => poissonDist(lambda, n)).toFixed(4)}</td>
      </tr>
    {/each}
  </tbody>
</table>

<p class="mb-4">
  {@html k(`\\mu_X=${(lambda === null ? 0 : lambda).toFixed(4)}`)}
</p>
<p>
  {@html k(`\\sigma^2_X=${(lambda === null ? 0 : lambda).toFixed(4)}`)}
</p>
