import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { headerColor } from "../../Datas";

export const headSize = 50;

export function Header(props) {
  return (
    <View style={style.main}>
      <Text style={style.text}>
        {props.page == 0
          ? "Random"
          : props.page == 1
          ? "Search"
          : props.page == 2
          ? "Home"
          : props.page == 3
          ? "Favorite"
          : props.page == 4
          ? "User"
          : props.name}
      </Text>
      <StatusBar
        translucent={false}
        style="auto"
        backgroundColor={headerColor}
      />
    </View>
  );
}

const style = StyleSheet.create({
  main: {
    backgroundColor: headerColor,
    width: "100%",
    position: "absolute",
    height: headSize,
    top: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    zIndex: 1,
  },
  text: {
    fontSize: 25,
  },
});
