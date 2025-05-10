import { heightPercentToDP } from "@/helpers";
import { API } from "@/services/api-types";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import PokemonImageCard from "../PokemonImageCard";

type PokemonListProps = {
  pokemons: API.PokemonRespose[] | undefined | [];
  onNeedMoreData?: () => void;
  onItemClick?: (item: API.PokemonRespose) => void;
  isFetchingData?: boolean;
  isInitalLoading?: boolean;
};

export default function PokemonList(props: PokemonListProps) {
  const {
    pokemons,
    onNeedMoreData,
    isFetchingData,
    isInitalLoading,
    onItemClick,
  } = props;
  const [flatListWidth, setFlatListWidth] = useState<number>(0);

  const handleLayout = (event: any) => {
    const { width } = event.nativeEvent.layout;
    setFlatListWidth(width);
  };

  const handleEndReached = () => {
    if (onNeedMoreData) {
      onNeedMoreData();
    }
  };

  return (
    <View style={styles.mainContainer}>
      {isInitalLoading ? (
        <View style={styles.initialLoadingContainer}>
          <ActivityIndicator size="large" color="#3F51B5" />
          <Text style={styles.initialLoadingText}>
            Loading pokémons, please wait...
          </Text>
        </View>
      ) : (
        <>
          <FlatList
            contentContainerStyle={styles.contentContainerStyle}
            showsVerticalScrollIndicator={false}
            onLayout={handleLayout}
            numColumns={2}
            data={pokemons}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  if (onItemClick) {
                    onItemClick(item);
                  }
                }}
              >
                <PokemonImageCard
                  width={96}
                  height={96}
                  imageUrl={item.image}
                  name={item?.name}
                  containerWidth={flatListWidth / 2}
                  containerHeight={heightPercentToDP("20%")}
                />
              </TouchableOpacity>
            )}
            onEndReached={handleEndReached}
            onEndReachedThreshold={0.5}
          />
          {isFetchingData && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color="#3F51B5" />
            </View>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  contentContainerStyle: {
    paddingTop: 10,
  },
  loadingContainer: {
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  initialLoadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  initialLoadingText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "SpaceMono",
  },
});
