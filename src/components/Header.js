import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

const headColor = "#aaffaa";
const headSize = 50;

export function Header(props) {
  var name = () => {
    switch (props.page) {
      case 0:
        return "Random";
      case 1:
        return "Category";
      case 2:
        return "Home";
      case 3:
        return "Favorite";
      case 4:
        return "User";
      default:
        return "Unknown";
    }
  };
  var txt = "123";
  return (
    <View style={style.main}>
      <Text style={style.text}>
        {props.page == 0
          ? "Random"
          : props.page == 1
          ? "Category"
          : props.page == 2
          ? "Home"
          : props.page == 3
          ? "Favorite"
          : props.page == 4
          ? "User"
          : "UnKnown"}
      </Text>
      <StatusBar translucent={false} style="auto" backgroundColor={headColor} />
    </View>
  );
}

const style = StyleSheet.create({
  main: {
    backgroundColor: headColor,
    width: "100%",
    position: "absolute",
    height: headSize,
    top: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    zIndex:1
  },
  text: {
    fontSize: 25,
  },
});
