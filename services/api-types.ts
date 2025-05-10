export declare namespace API {
    export type PokemonRespose = {
      name: string;
      url: string;
      image: string;
    };

    export type PokemonsResponse = {
      count: number;
      next: string | null;
      previous: string | null;
      results: PokemonRespose[];
    };

    export type PokemonType = {
      slot: number;
      type: {
        name: string;
        url: string;
      };
    }
}
  