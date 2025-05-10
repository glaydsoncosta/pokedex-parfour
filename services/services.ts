import { ApiSchema } from "@/constants/Api";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API } from "./api-types";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: ApiSchema.main.baseUrl }),
  endpoints: (builder) => ({
    getPokemonList: builder.query<
      API.PokemonsResponse & { results: (API.PokemonRespose & { image: string })[] },
      { offset: number; limit: number }
    >({
      query: ({ offset, limit }) => 
        `${ApiSchema.endpoints.getPokemonList}?offset=${offset}&limit=${limit}`,
      async transformResponse(baseResponse: API.PokemonsResponse) {
        // Fetch additional details for each Pokémon
        const detailedResults = await Promise.all(
          baseResponse.results.map(async (pokemon) => {
            const pokemonId = pokemon.url.replace(/^.*\/(\d+)\/$/, "$1");
            const detailsURL = `${ApiSchema.main.baseUrl}${ApiSchema.endpoints.getPokemon}/${pokemonId}`
            const response = await fetch(detailsURL);
            const details = await response.json();
            return {
              ...pokemon,
              details: {
                height: details.height,
                weight: details.weight,
                base_experience: details.base_experience,
                types: details.types,
              },
              image: details.sprites.other["official-artwork"].front_default, // Add the image URL to the Pokémon object
            };
          })
        );

        return {
          ...baseResponse,
          results: detailedResults,
        };
      },
    }),
    getPokemon: builder.query<API.PokemonRespose, number>({
      query: (id: number) => `${ApiSchema.endpoints.getPokemon}/${id}`,
    }),
  }),
});

export const { useGetPokemonListQuery, useGetPokemonQuery } = apiSlice;