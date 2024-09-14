import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

const query = `
  query DETAILS($id: String!) {
    pokemon(id: $id) {
      id
      name
      number
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      classification
      types
      resistant
      attacks {
        fast {
          name
          type
          damage
        }
        special {
          name
          type
          damage
        }
      }
      weaknesses
      fleeRate
      maxCP
      evolutions {
        id
        number
        name
      }
      evolutionRequirements {
        amount
        name
      }
      maxHP
      image
    }
  }
`;

export const load: PageServerLoad = async ({ params }) => {
  const res = await fetch("https://graphql-pokemon2.vercel.app/", {
    method: "POST",
    body: JSON.stringify({ query, variables: { id: params.id } }),
    headers: { "Content-Type": "application/json" },
  });

  const { data } = (await res.json()) as {
    data: {
      pokemon: {
        id: string;
        name: string | null;
        number: string | null;
        classification: string | null;
        types: Array<string | null> | null;
        resistant: Array<string | null> | null;
        weaknesses: Array<string | null> | null;
        fleeRate: number | null;
        maxCP: number | null;
        maxHP: number | null;
        image: string | null;
        weight: {
          minimum: string | null;
          maximum: string | null;
        } | null;
        height: {
          minimum: string | null;
          maximum: string | null;
        } | null;
        attacks: {
          fast: Array<{
            name: string | null;
            type: string | null;
            damage: number | null;
          } | null> | null;
          special: Array<{
            name: string | null;
            type: string | null;
            damage: number | null;
          } | null> | null;
        } | null;
        evolutions: Array<{
          id: string;
          number: string | null;
          name: string | null;
        } | null> | null;
        evolutionRequirements: {
          amount: number | null;
          name: string | null;
        } | null;
      } | null;
    };
  };

  if (data.pokemon) {
    return { pokemon: data.pokemon };
  }

  error(404, "Not found");
};
