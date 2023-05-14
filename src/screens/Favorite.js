import { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { GetFavorites } from "../back/Main";
import { NormalCard } from "../components/Cards";

export function Favorite() {
  const [load, setLoad] = useState(0);
  const [datas, setData] = useState([]);
  const [text, setText] = useState("Loading")
  if (load == 0) {
    setLoad(1);
    GetFavorites().then((res) => {
      setData(res)
      setText("Empty")
    });
  }
  const data = [];
  for (let i = 0; i < datas.length; i++) {
    data.push({ id: i, data: datas[i] });
  }
  const renderItem = ({ item }) => <NormalCard item={item}></NormalCard>;
  return (
    <View style={style.main}>
      {datas.length == 0 ? (
        <Text>{text}</Text>
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          style={style.test}
        />
      )}
    </View>
  );
}

const style = StyleSheet.create({
  main: {
    backgroundColor: "#ffffff",
    height: "100%",
    width: "100%",
    marginTop: 0,
    marginBottom: 50,
    // paddingBottom:120,
    alignItems: "center",
  },
});
