import { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { GetPopular, GetView } from "../back/Main";
import { NormalCard } from "../components/Cards";
import { HeaderBack } from "../components/HeaderBack";

export function More(props) {
  const [load, setLoad] = useState(0);
  const [data1, setData] = useState([]);

  if (load == 0) {
    setLoad(1);
    if (props.route.params.type == "Most Poplular") {
      GetPopular(20).then((res) => {
        setData(res);
      });
    } else {
      GetView(20).then((res) => {
        setData(res);
      });
    }
  }
  const data = [];
  for (let i = 0; i < data1.length; i++) {
    data.push({ id: i, data: data1[i] });
  }

  const renderItem = ({ item }) => <NormalCard item={item}></NormalCard>;
  return (
    <View style={style.main}>
      <HeaderBack
        name={props.route.params["type"]}
        navigation={props.navigation}
        back="Main"
      ></HeaderBack>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        style={style.test}
      />
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
