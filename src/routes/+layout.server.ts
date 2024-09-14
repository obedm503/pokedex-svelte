import { error, redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

const query = `
  query POKEMON_LIST {
    pokemons(first: 151) {
      id
      number
      name
      image
    }
  }
`;

export const load: LayoutServerLoad = async ({ params }) => {
  const res = await fetch("https://graphql-pokemon2.vercel.app/", {
    method: "POST",
    body: JSON.stringify({ query }),
    headers: { "Content-Type": "application/json" },
  });

  const { data } = (await res.json()) as {
    data: {
      pokemons: Array<{
        id: string;
        number: string | null;
        name: string | null;
        image: string | null;
      } | null> | null;
    };
  };

  const pokemonId = params.id;

  if (!pokemonId) {
    const firstId = data.pokemons?.find((item) => !!item)?.id;
    if (firstId) {
      redirect(303, firstId);
    }

    error(500, "Error");
  }

  if (data.pokemons) {
    return {
      initialPokemonId: pokemonId,
      pokemons: data.pokemons.filter((item) => item !== null),
    };
  }

  error(500, "Error");
};
