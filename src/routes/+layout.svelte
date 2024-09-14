<script lang="ts">
  import "../app.css";
  import { page } from "$app/stores";

  const TOTAL_POKEMON = 151;
  const PAGE_SIZE = 10;

  let { data, children } = $props();

  const initialIndex = data.pokemons.findIndex(
    (item) => item?.id === data.initialPokemonId,
  );
  let pageNum = $state(
    initialIndex >= 0 ? Math.floor(initialIndex / PAGE_SIZE) : 0,
  );

  let pokemonList = $derived(
    data.pokemons.slice(pageNum * PAGE_SIZE, pageNum * PAGE_SIZE + PAGE_SIZE),
  );

  $effect(() => {
    // scroll the active link into view
    const activeAnchor = document.getElementById(data.initialPokemonId);
    if (activeAnchor) {
      activeAnchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });
</script>

<div class="flex min-h-screen w-screen bg-[#484D57] p-8">
  <div
    class="mx-auto my-auto flex w-full flex-col-reverse overflow-y-auto rounded-[8px] bg-[#3B3E46] md:h-[calc(100vh-4rem)] md:max-h-[50rem] md:min-h-60 md:w-[75rem] md:flex-row md:overflow-hidden"
  >
    <div class="flex flex-col bg-[#2D2F36] md:w-1/2 md:min-w-96">
      <div
        class="max-h-[50vh] flex-grow space-y-4 overflow-y-auto p-8 md:max-h-full"
      >
        {#each pokemonList as pokemon}
          <a
            id={pokemon.id}
            href={pokemon.id}
            data-active={$page.url.pathname.includes(pokemon.id)
              ? true
              : undefined}
            class="flex h-[75px] w-full items-center rounded-[6px] bg-[#3F414B]/80 pb-[16px] pl-[27px] pt-[15px] ring-2 ring-transparent hover:bg-[#3F414B] data-[active]:ring-[#F2C94C]"
          >
            <img
              class="mr-[26px] h-[44px] w-[44px] rounded-full bg-white"
              src={pokemon.image || "https://via.placeholder.com/44"}
              alt={pokemon.name || ""}
            />
            <div class="mr-[10px] text-[18px] font-bold text-[#F2C94C]">
              {pokemon.number}
            </div>
            <div class="text-[18px] font-semibold text-[#EDEDED]">
              {pokemon.name}
            </div>
          </a>
        {/each}
      </div>
      <div
        class="w-full bg-[#1F1F1F] p-1 text-center font-semibold text-[#EEECEC] md:p-0"
      >
        <div
          class="my-[22px] ml-[21px] mr-[19px] flex flex-col flex-wrap justify-between gap-2 md:flex-row"
        >
          <div class="flex flex-row gap-2">
            {#if pageNum > 1}
              <button
                type="button"
                onclick={() => {
                  pageNum = pageNum - 2;
                }}
                class="h-[31px] w-[32px] rounded-[8px] bg-[#2D2F36] hover:brightness-150"
              >
                {pageNum - 1}
              </button>
            {/if}

            {#if pageNum >= 1}
              <button
                type="button"
                onclick={() => {
                  pageNum = pageNum - 1;
                }}
                class="h-[31px] w-[32px] rounded-[8px] bg-[#2D2F36] hover:brightness-150"
              >
                {pageNum}
              </button>
            {/if}

            <button
              type="button"
              class="pointer-events-none h-[31px] w-[32px] rounded-[8px] bg-[#2D2F36] ring-2 ring-[#F2C94C]"
            >
              {pageNum + 1}
            </button>

            {#if pageNum + 1 < TOTAL_POKEMON / PAGE_SIZE}
              <button
                type="button"
                onclick={() => {
                  pageNum = pageNum + 1;
                }}
                class="h-[31px] w-[32px] rounded-[8px] bg-[#2D2F36] hover:brightness-150"
              >
                {pageNum + 2}
              </button>
            {/if}

            {#if pageNum + 2 < TOTAL_POKEMON / PAGE_SIZE}
              <button
                type="button"
                onclick={() => {
                  pageNum = pageNum + 2;
                }}
                class="h-[31px] w-[32px] rounded-[8px] bg-[#2D2F36] hover:brightness-150"
              >
                {pageNum + 3}
              </button>
            {/if}
          </div>

          <div class="ml-auto">
            <button
              type="button"
              disabled={pageNum <= 0}
              onclick={() => {
                pageNum = pageNum - 1;
              }}
              class="h-[31px] w-[81px] rounded-[8px] bg-[#2D2F36] hover:brightness-150 disabled:cursor-not-allowed disabled:brightness-90"
            >
              Prev
            </button>

            <button
              type="button"
              disabled={pageNum + 1 >= TOTAL_POKEMON / PAGE_SIZE}
              onclick={() => {
                pageNum = pageNum + 1;
              }}
              class="h-[31px] w-[81px] rounded-[8px] bg-[#2D2F36] hover:brightness-150 disabled:cursor-not-allowed disabled:brightness-90"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>

    {@render children()}
  </div>
</div>
