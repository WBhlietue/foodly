import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  backgroundColor,
  searchBarColor,
  searchOutBarColor,
  width,
} from "../../Datas";

export function Category() {
  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <TextInput
          style={styles.searchInput}
          placeholder="search with name..."
        />
        <TouchableOpacity>
          <Image
            style={styles.searchIcon}
            source={require("../../assets/images/search.png")}
          ></Image>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: backgroundColor,
  },
  searchBox: {
    height: 50,
    backgroundColor: searchOutBarColor,
    alignItems: "center",
    margin: 20,
    borderRadius: 100,
    borderColor: "black",
    padding: 10,
    flexDirection: "row",
  },
  searchInput: {
    backgroundColor: searchBarColor,
    borderRadius: 100,
    height: "100%",
    width: width * 0.7,
    padding: 0,
    paddingHorizontal: 10,
  },
  searchIcon: {
    height: 40,
    width: 40,
  },
});
