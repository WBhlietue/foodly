import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Navigate, stack } from "../../App";
import { Header } from "./Header";

const headColor = "#aaffaa";
const headSize = 50;

export function HeaderBack(props) {
  return (
    <View style={style.main}>
      <Header page={-1} name={props.name} />
      <TouchableOpacity
        activeOpacity={0.8}
        style={style.btn}
        onPress={() => {
          Navigate(props.back);
        }}
      >
        <Image
          style={{ height: 30, width: 30 }}
          source={require("../../assets/images/go-back-arrow.png")}
        ></Image>
      </TouchableOpacity>
    </View>
  );
}
const style = StyleSheet.create({
  main: {
    backgroundColor: headColor,
    width: "100%",
    // position: "absolute",
    height: headSize,
    top: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    zIndex: 1,
  },
  btn: {
    position: "absolute",
    left: 10,
    top: 10,
    height: 50,
    width: 50,
    zIndex: 1,
  },
});
