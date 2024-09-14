<script lang="ts">
  let { data } = $props();
</script>

<svelte:head>
  <title>{data.pokemon.name}</title>
</svelte:head>

<div class="flex flex-grow flex-col text-[#EDEDED]">
  <div
    class="flex w-full justify-between border-b-[2px] border-b-[#2D2F36] p-[42px]"
  >
    <div class="text-[32px] font-semibold">{data.pokemon.name}</div>
    <div
      class="text-[32px] font-semibold text-[#F2C94C]"
      style="letterSpacing: 0.1em"
    >
      #{data.pokemon.number}
    </div>
  </div>
  <div class="h-full overflow-y-auto p-8">
    <img
      src={data.pokemon.image || "https://via.placeholder.com/200"}
      alt={data.pokemon.name || ""}
      class="mx-auto h-[200px] rounded-xl"
    />
    <div class="my-6 flex w-full justify-between text-center">
      <div class="flex flex-col">
        <div class="font-mono text-2xl font-semibold">
          {data.pokemon.types?.filter((t) => t).join(" / ")}
        </div>
        <div>Type</div>
      </div>
      <div class="w-[2px] bg-[#2D2F36]"></div>
      <div class="">
        <div class="font-mono text-2xl font-semibold">
          {data.pokemon.weight?.minimum} - {data.pokemon.weight?.maximum}
        </div>
        <div>Weight</div>
      </div>
      <div class="w-[2px] bg-[#2D2F36]"></div>
      <div class="">
        <div class="font-mono text-2xl font-semibold">
          {data.pokemon.height?.minimum} - {data.pokemon.height?.maximum}
        </div>
        <div>Height</div>
      </div>
    </div>

    <div class="h-[2px] bg-[#2D2F36]"></div>

    <div class="flex">
      <div class="m-4 w-1/2 space-y-2">
        <p class="mb-4 text-center text-2xl">Special Attacks</p>

        {#if data.pokemon.attacks?.special}
          {#each data.pokemon.attacks.special as a}
            {#if a}
              <div class="rounded-[6px] bg-[#1F1F1F] p-4">
                <div class="flex flex-wrap text-lg font-semibold">
                  {a.name}
                  <span class="ml-auto inline-block text-[#F2C94C]">
                    {a.damage}
                  </span>
                </div>
                <div>Type {a.type}</div>
              </div>
            {/if}
          {/each}
        {/if}
      </div>

      <div class="m-4 w-1/2 space-y-2">
        <p class="mb-4 text-center text-2xl">Fast Attacks</p>

        {#if data.pokemon.attacks?.fast}
          {#each data.pokemon.attacks.fast as a}
            {#if a}
              <div class="rounded-[6px] bg-[#1F1F1F] p-4">
                <div class="flex flex-wrap text-lg font-semibold">
                  {a.name}
                  <span class="ml-auto inline-block text-[#F2C94C]">
                    {a.damage}
                  </span>
                </div>
                <div>Type {a.type}</div>
              </div>
            {/if}
          {/each}
        {/if}
      </div>
    </div>
  </div>
</div>
