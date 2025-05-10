import PageHeader from "@/components/ui/PageHeader";
import PokemonImageCard from "@/components/ui/PokemonImageCard";
import PokemonTypeTags from "@/components/ui/PokemonTypeTags";
import {
  capitalizeFirstLetter,
  heightPercentToDP,
  widthPercentToDP,
} from "@/helpers";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DetailsScreen() {
  const { pokemon } = useLocalSearchParams(); // Retrieve the parameter
  const [imageContainerWidth, setImageContainerWidth] =
    React.useState<number>(0);
  const router = useRouter();

  const selectedPokemon = JSON.parse(pokemon as string); // Parse the JSON string

  const handleLayout = (event: any) => {
    const { width } = event.nativeEvent.layout;
    setImageContainerWidth(width);
  };

  return (
    <SafeAreaView style={styles.safeareaViewContainer}>
      <View style={styles.mainContainer}>
        <Stack.Screen
          options={{
            title: capitalizeFirstLetter(selectedPokemon?.name),
            headerBackButtonDisplayMode: "minimal",
            headerTitleStyle: {
              fontSize: 16,
              fontFamily: "SpaceMono",
              fontWeight: "600",
            },
            headerShown: false,
          }}
        />
        <PageHeader
          onBackPress={() => router.back()}
          title={capitalizeFirstLetter(selectedPokemon.name)}
        />
        <View onLayout={handleLayout} style={styles.pokemonImageContainer}>
          <PokemonImageCard
            width={200}
            height={200}
            imageUrl={selectedPokemon?.image}
            containerWidth={imageContainerWidth - widthPercentToDP("10%")}
            containerHeight={heightPercentToDP("25%")}
          />
        </View>
        <View style={styles.typesTagsContainer}>
          <PokemonTypeTags types={selectedPokemon?.details?.types} />
        </View>
        <View style={styles.pokemonDetailsContainer}>
          <Text style={styles.infoLabel}>
            Height: {selectedPokemon?.details?.height}
          </Text>
          <Text style={styles.infoLabel}>
            Weight: {selectedPokemon?.details?.weight}
          </Text>
          <Text style={styles.infoLabel}>
            Base XP: {selectedPokemon?.details?.base_experience}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeareaViewContainer: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  mainContainer: {
    flex: 1,
  },
  pokemonImageContainer: {
    height: heightPercentToDP("30%"),
    paddingHorizontal: widthPercentToDP("5%"),
    paddingTop: heightPercentToDP("2%"),
  },
  pokemonDetailsContainer: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: widthPercentToDP("5%"),
  },
  infoLabel: {
    fontSize: 14,
    fontFamily: "SpaceMono",
    fontWeight: "bold",
    marginTop: heightPercentToDP("1%"),
  },
  typesTagsContainer: {
    paddingHorizontal: widthPercentToDP("5%"),
  },
});
