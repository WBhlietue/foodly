import { View, Text, StyleSheet } from "react-native";

export function User() {
  return (
    <View style={style.main}>
      <Text>Main</Text>
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
