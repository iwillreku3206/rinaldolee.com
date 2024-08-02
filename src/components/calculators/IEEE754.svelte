<script lang="ts">
  import type { FormEventHandler } from "svelte/elements";
  import BitDisplay from "./common/BitDisplay.svelte";
  import init, { ieee754 } from "rinaldolee_com_wasm";
  const regex = /(?<sign>[-]?)(?<integer>\d+)(?:\.(?<fraction>\d+)?)?/;

  let input = "";
  let html = "";

  const handleInput: FormEventHandler<HTMLDivElement> = (event) => {
    const target = event.target as HTMLDivElement;
    if (input != target.innerText) {
      input = target.innerText;
    }
  };

  let integerPart: bigint = BigInt(0);
  let fractionPart: string = "";
  let signPart = "";
  $: {
    const parts = regex.exec(input.trim());
    if (parts && parts.groups) {
      const { sign, integer, fraction } = parts.groups;

      integerPart = BigInt(parseInt(integer || "0"));
      fractionPart = fraction ?? "0";
      signPart = sign;
      html = `<span class="text-red-300">${sign || ""}</span><span class="text-orange-200">${integer}</span>.<span class="text-green-200">${fraction || ""}</span>`;
    } else {
      html = `<span class="text-red-500">${input}</span>`;
      integerPart = BigInt(0);
      fractionPart = "";
    }
  }

  let doublePrecision = false;

  let sign = BigInt(0);
  let exponent = BigInt(0);
  let mantissa = BigInt(0);

  let fixedIntegerPart = BigInt(0);
  let fixedFractionPart = BigInt(0);
  let fixedFractionPartLength = 1;

  $: {
    init().then(() => {
      const computed = ieee754(
        signPart == "-",
        integerPart,
        fractionPart,
        doublePrecision,
      );
      sign = BigInt(computed.sign());
      exponent = BigInt(computed.exponent());
      mantissa = computed.mantissa();
    });
  }
</script>

<div class="relative overflow-auto">
  <div
    class="absolute top-0 bottom-0 left-0 right-0 text-4xl font-mono select-none"
  >
    {@html html}
  </div>
  <div
    on:input={handleInput}
    aria-label="input"
    role="textbox"
    tabindex="0"
    class="w-full h-20 z-[1] relative text-4xl font-mono text-transparent caret-white"
    contenteditable
  ></div>
  <div
    class="absolute top-0 bottom-0 left-0 right-0 text-4xl font-mono text-slate-500 select-none"
  >
    {input === "" ? "Enter a number..." : ""}
  </div>
</div>

<div class="join">
  <button
    class={`btn join-item ${!doublePrecision ? "btn-primary" : ""}`}
    on:click={() => (doublePrecision = false)}>SP</button
  >
  <button
    class={`btn join-item ${doublePrecision ? "btn-primary" : ""}`}
    on:click={() => (doublePrecision = true)}>DP</button
  >
</div>

<h2 class="text-2xl font-bold my-4">IEEE-754 Notation</h2>
<div class="flex flex-col gap-2">
  <div class="flex flex-row gap-2">
    <div class="flex flex-col-reverse gap-1">
      <span>Sign</span>
      <BitDisplay bitCount={BigInt(1)} value={sign} />
    </div>
    <div class="flex flex-col-reverse gap-1">
      <span>Exponent</span>
      <BitDisplay
        bitCount={BigInt(doublePrecision ? 11 : 8)}
        value={exponent}
      />
    </div>
  </div>
  <div class="flex flex-col-reverse gap-1">
    <span>Mantissa</span>
    <BitDisplay
      bitCount={BigInt(doublePrecision ? 52 : 23)}
      value={mantissa}
      rows={doublePrecision ? 4 : 2}
    />
  </div>
</div>
