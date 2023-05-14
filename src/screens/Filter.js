import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { GetAllMaterials, GetFilters, SetFilter } from "../back/Main";
import { HeaderBack } from "../components/HeaderBack";

function Option(props) {
  const check = require("../../assets/images/select.png");
  const nonCheck = require("../../assets/images/square.png");
  const [active, setActive] = useState(props.active);
  return (
    <View style={style.optionBox}>
      <TouchableOpacity
        style={style.optionBtn}
        onPress={() => {
          SetFilter(props.text).then((i) => {
            setActive(i);
          });
        }}
      >
        <Image style={style.checkBox} source={active == 1 ? check : nonCheck} />
        <Text style={style.txt}>{props.text}</Text>
      </TouchableOpacity>
      <View style={style.blackLine}></View>
    </View>
  );
}

export function FilterScene() {
  const [load, setLoad] = useState(0);
  if (load == 0) {
    setLoad(1);
    GetAllMaterials().then((res) => {
      const list = [];
      const filters = GetFilters();
      res.map((i) => {
        list.push(
          <Option text={i} active={filters.indexOf(i) == -1 ? 0 : 1} />
        );
      });
      setData(list);
    });
  }
  const [data, setData] = useState([]);
  return (
    <View>
      <HeaderBack name="Filter" back="Main" />
      <ScrollView>
        {data}
        <View style={style.space}></View>
      </ScrollView>
    </View>
  );
}

const style = StyleSheet.create({
  optionBox: {
    margin: 20,
  },
  optionBtn: {
    marginBottom: 10,
    flexDirection: "row",
  },
  checkBox: {
    width: 30,
    height: 30,
  },
  txt: {
    margin: 5,
    alignSelf: "center",
  },
  blackLine: {
    backgroundColor: "black",
    width: "100%",
    height: 1,
  },
  space: {
    height: 50,
  },
});
