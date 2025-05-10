import { capitalizeFirstLetter } from "@/helpers";
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

type PokemonImageCardProps = {
  width?: number;
  height?: number;
  imageUrl?: string;
  name?: string;
  containerWidth: number;
  containerHeight: number;
};

export default function PokemonImageCard(props: PokemonImageCardProps) {
  const { width, height, imageUrl, name, containerWidth, containerHeight } =
    props;

  return (
    <View>
      <View
        style={[
          styles.mainContainer,
          { width: containerWidth, height: containerHeight },
        ]}
      >
        <Image
          source={{ uri: imageUrl }}
          style={{ width: width, height: height }}
        />
        {name && (
          <Text style={styles.itemText}>
            {capitalizeFirstLetter(name || "")}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E8EAF6",
    marginBottom: 10,
    marginRight: 10,
    borderRadius: 10,
  },
  itemText: {
    fontSize: 16,
    fontFamily: "SpaceMono",
  },
});
