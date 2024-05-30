<script lang="ts">
  import type { FormEventHandler } from "svelte/elements";

  const regex = /(?<sign>[-]?)(?<integer>\d+)(?:\.(?<fraction>\d+))?/;

  let input = "0.0";
  let html = "0.0";

  const handleInput: FormEventHandler<HTMLDivElement> = (event) => {
    const target = event.target as HTMLDivElement;
    if (input != target.innerText) {
      input = target.innerText;
    }
    console.log(input);
  };

  $: {
    const parts = regex.exec(input);
    if (parts && parts.groups) {
      const { sign, integer, fraction } = parts.groups;
      html = `<span class="text-red-200">${sign || ""}</span><span class="text-orange-200">${integer}</span>.<span class="text-green-200">${fraction || ""}</span>`;
    }
  }
</script>

<!--https://stackoverflow.com/questions/41884969/highlight-syntax-in-contenteditable-->
<div class="">
  <div
    on:beforeinput={handleInput}
    aria-label="input"
    role="textbox"
    tabindex="0"
    class="w-full h-20 z-[1] relative text-7xl font-mono"
    contenteditable
  >
    {@html html}
  </div>
</div>
