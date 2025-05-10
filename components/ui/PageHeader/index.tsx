import { Assets } from "@/constants/Assets";
import { heightPercentToDP } from "@/helpers";
import { Image } from "expo-image";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type PageHeaderProps = {
  title: string;
  onBackPress: () => void;
};

export default function PageHeader(props: PageHeaderProps) {
  const { title, onBackPress } = props;

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity onPress={onBackPress}>
        <View>
          <Image
            contentFit="contain"
            source={Assets.icons.back}
            style={styles.searchIconBox}
          />
        </View>
      </TouchableOpacity>
      <View>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <View style={styles.optionsIconContainer} />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFF",
    paddingVertical: heightPercentToDP("1%"),
  },
  titleText: {
    fontSize: 20,
    fontFamily: "SpaceMono",
    fontWeight: "600",
  },
  searchIconBox: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
  optionsIconContainer: {
    width: 24,
    height: 24,
  },
});
