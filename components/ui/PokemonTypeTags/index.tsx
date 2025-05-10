import { heightPercentToDP, widthPercentToDP } from "@/helpers";
import { API } from "@/services/api-types";
import { StyleSheet, Text, View } from "react-native";

type PokemonTypeTagsProps = {
  types: API.PokemonType[];
};

export default function PokemonTypeTags(props: PokemonTypeTagsProps) {
  const { types } = props;
  return (
    <View style={styles.mainContainer}>
      {types.map((item, index) => (
        <View key={index} style={styles.tagContainer}>
          <Text key={index} style={styles.tagText}>
            {item.type.name}
          </Text>
        </View>
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    paddingVertical: heightPercentToDP("1%"),
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  tagContainer: {
    backgroundColor: "#E1BEE7",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: heightPercentToDP("1%"),
    paddingHorizontal: widthPercentToDP("5%"),
    marginRight: widthPercentToDP("2%"),
  },
  tagText: {
    fontSize: 14,
    fontFamily: "SpaceMono",
    textAlign: "center",
  },
});
