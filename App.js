import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Header } from "./src/components/Header";
import { Navigator } from "./src/components/Nagivator";
import { MainScreen } from "./src/screens/MainScreen";

export default function App() {
  const [selected, setSelected] = useState(2);
  return (
    <View style={styles.container}>
      <Header page={selected} />
      <MainScreen page={selected} />
      <Navigator select={[selected, setSelected]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
});
