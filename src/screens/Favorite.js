import { View, Text, StyleSheet, FlatList } from "react-native";
import { NormalCard } from "../components/Cards";

export function Favorite() {
  const data = [
    { id: "0", title: "item 1" },
    { id: "1", title: "item 1" },
    { id: "2", title: "item 1" },
    { id: "3", title: "item 1" },
    { id: "4", title: "item 1" },
    { id: "5", title: "item 1" },
    { id: "6", title: "item 1" },
    { id: "7", title: "item 1" },
    { id: "8", title: "item 1" },
    { id: "9", title: "item 1" },
    { id: "10", title: "item 1" },
    { id: "11", title: "item 1" },
    { id: "12", title: "item 1" },
    { id: "13", title: "item 1" },
    { id: "14", title: "item 1" },
    { id: "15", title: "item 1" },
    { id: "16", title: "item 1" },
    { id: "17", title: "item 1" },
    { id: "18", title: "item 1" },
    { id: "19", title: "item 1" },
  ];
  const renderItem = ({ item }) => <NormalCard></NormalCard>;
  return (
    <View style={style.main}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
      />
    </View>
  );
}

const style = StyleSheet.create({
  main: {
    backgroundColor: "#ffffff",
    height: "100%",
    width: "100%",
    marginTop:20,
    marginBottom:50,
    paddingBottom:120,
    alignItems:"center"
  },
});
