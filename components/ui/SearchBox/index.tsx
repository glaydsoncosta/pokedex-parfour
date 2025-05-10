import { Assets } from "@/constants/Assets";
import { heightPercentToDP } from "@/helpers";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

type SearchBoxProps = {
  placeHolder?: string;
  onSearch?: (query: string) => void;
};

export default function SearchBox(props: SearchBoxProps) {
  const { placeHolder, onSearch } = props;
  const [searchText, setSearchText] = React.useState("");

  const handleSearch = (text: string) => {
    setSearchText(text);
    if (onSearch) {
      onSearch(text);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View>
        <View style={styles.searchBoxIconContainer}>
          <Image
            contentFit="contain"
            source={Assets.icons.search}
            style={styles.searchIconBox}
          />
        </View>
      </View>
      <View style={styles.searchBoxTextInputContainer}>
        <TextInput
          onChangeText={handleSearch}
          autoCapitalize="none"
          returnKeyType="search"
          style={styles.textInputContainer}
          placeholder={placeHolder || "Start typing to search pokémons..."}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: heightPercentToDP("2%"),
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
    backgroundColor: "#ECEFF1",
  },
  textInputContainer: {
    paddingVertical: heightPercentToDP("1.5%"),
    paddingHorizontal: heightPercentToDP("1%"),
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  searchBoxIconContainer: {
    paddingHorizontal: 15,
    flex: 1,
    justifyContent: "center",
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  searchBoxTextInputContainer: {
    flex: 1,
  },
  searchIconBox: {
    width: 20,
    height: 20,
    position: "absolute",
    left: 10,
    top: 10,
    opacity: 0.5,
  },
});
