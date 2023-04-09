import { View, Text, StyleSheet, ScrollView } from "react-native";
import { HomeCard2 } from "../components/Cards";

export function Category() {
  return (
    <View style={style.main}>
      <ScrollView
        horizontal
        scrollEnabled
        contentContainerStyle={{ minHeight: "100%" }}
      >
        <HomeCard2 />
        <HomeCard2 />
        <HomeCard2 />
      </ScrollView>
    </View>
  );
}

const style = StyleSheet.create({
  main: {
    backgroundColor: "#ffffff",
    height: "100%",
    width: "100%",
  },
});
