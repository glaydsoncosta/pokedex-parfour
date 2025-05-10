/* eslint-disable react-hooks/exhaustive-deps */
import PokemonList from "@/components/ui/PokemonList";
import SearchBox from "@/components/ui/SearchBox";
import { ApiSchema } from "@/constants/Api";
import { Assets } from "@/constants/Assets";
import { heightPercentToDP } from "@/helpers";
import { API } from "@/services/api-types";
import { useGetPokemonListQuery } from "@/services/services";
import { Image } from "expo-image";
import { Stack, useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [pokemonsApiResponse, setPokemonApiResponse] =
    React.useState<API.PokemonsResponse>();
  const [currentPage, setCurrentPage] = React.useState<number>(
    ApiSchema.main.itemsPerPage
  );
  const [searchQuery, setSearchQuery] = React.useState<string>(""); // State for search query
  const [filteredPokemons, setFilteredPokemons] = React.useState<
    API.PokemonRespose[]
  >([]);

  const router = useRouter();

  const { data: pokemons, isFetching } = useGetPokemonListQuery({
    offset: 0,
    limit: currentPage,
  });

  useEffect(() => {
    if (pokemons && !isFetching) {
      setPokemonApiResponse(pokemons);
      setFilteredPokemons(pokemons.results); // Initialize filtered list
    }
  }, [isFetching]);

  useEffect(() => {
    if (pokemonsApiResponse?.results) {
      const filtered = pokemonsApiResponse.results.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPokemons(filtered);
    }
  }, [searchQuery, pokemonsApiResponse]);

  return (
    <SafeAreaView style={styles.safeareaViewContainer}>
      <View style={styles.mainContainer}>
        <Stack.Screen options={{ headerShown: false }} />
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.mainHeader}>
            <Text style={styles.headerText}>Pokédex</Text>
            <Text style={styles.subTtitleText}>
              {
                "Hello Ash, here's your pokémon list. Use the text box below to start searching for pokémons."
              }
            </Text>
            <SearchBox
              onSearch={(query: string) => {
                setSearchQuery(query); // Update search query state
              }}
            />
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.mainList}>
          {filteredPokemons.length === 0 && !isFetching ? (
            <View style={styles.emptyListContainer}>
              <Image
                source={Assets.icons.pokemonNotfound}
                tintColor={"#BDBDBD"}
                contentFit="contain"
                style={styles.pokemonNotFoundImage}
              />
              <Text style={styles.subTtitleText}>
                {`No pokémons found for "${searchQuery}"`}
              </Text>
            </View>
          ) : (
            <PokemonList
              onItemClick={(item: API.PokemonRespose) => {
                router.push({
                  pathname: "/pages/details",
                  params: { pokemon: JSON.stringify(item) }, // Pass the item as a parameter
                });
              }}
              isFetchingData={
                isFetching && (pokemonsApiResponse?.results?.length ?? 0) > 0
              }
              isInitalLoading={
                isFetching && (pokemonsApiResponse?.results?.length ?? 0) === 0
              }
              pokemons={filteredPokemons} // Use filtered Pokémon list
              onNeedMoreData={() => {
                setCurrentPage(
                  (currPage) => currPage + ApiSchema.main.itemsPerPage
                );
              }}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeareaViewContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  mainContainer: {
    flex: 1,
  },
  mainHeader: {
    padding: 16,
    paddingTop: 32,
  },
  mainList: {
    flex: 1,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "SpaceMono",
  },
  subTtitleText: {
    fontSize: 14,
    marginTop: heightPercentToDP("1%"),
    fontFamily: "SpaceMono",
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  pokemonNotFoundImage: {
    width: 72,
    height: 72,
  },
});
