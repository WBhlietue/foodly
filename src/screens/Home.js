import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Navigate, stack } from "../../App";
import { backgroundColor } from "../../Datas";
import { GetPopular, GetRandonFood, GetView, Test } from "../back/Main";
import { HomeCard1, HomeCard2 } from "../components/Cards";

function Bar(props) {
  return (
    <View style={{ margin: 10 }}>
      <Text style={style.title}> {props.name}</Text>
      <TouchableOpacity
        style={style.btn}
        onPress={() => {
          Navigate("More", { type: props.name });
        }}
      >
        <Text style={style.title}>{"->"}</Text>
      </TouchableOpacity>
    </View>
  );
}

export function Home(props) {
  const [popularData, setPopularData] = useState([]);
  const [popularLoad, setPopularLoad] = useState(0);
  const [rand, setRand] = useState([]);
  const [load, setLoad] = useState(0);
  if (popularLoad == 0) {
    setPopularLoad(1);
    GetPopular(5).then((res) => {
      setPopularData(res);
    });
  }
  if (load == 0) {
    setLoad(1);
    GetRandonFood().then((res) => {
      setRand(res);
    });
  }
  const popular = [];
  for (let i = 0; i < popularData.length; i++) {
    popular.push(<HomeCard2 data={popularData[i]} key={i} />);
  }

  const [viewData, setViewData] = useState([]);
  const [viewLoad, setViewLoad] = useState(0);
  if (viewLoad == 0) {
    setViewLoad(1);
    GetView(5).then((res) => {
      setViewData(res);
    });
  }
  const view = [];
  for (let i = 0; i < viewData.length; i++) {
    view.push(<HomeCard2 data={viewData[i]} key={i} />);
  }
  return (
    <View style={style.main}>
      {rand.length == 0 ? <View></View> : <HomeCard1 data={rand} />}
      <Bar name="Most Poplular" />
      <View style={style.scroll}>
        <ScrollView horizontal>
          {/* <HomeCard2 data={GetRandonFood()} />
          <HomeCard2 data={GetRandonFood()} />
          <HomeCard2 data={GetRandonFood()} />
          <HomeCard2 data={GetRandonFood()} />
          <HomeCard2 data={GetRandonFood()} /> */}
          {popular}
        </ScrollView>
      </View>
      <Bar name="Most View" />
      <View style={style.scroll}>
        <ScrollView horizontal>
          {/* <HomeCard2 data={GetRandonFood()} />
          <HomeCard2 data={GetRandonFood()} />
          <HomeCard2 data={GetRandonFood()} />
          <HomeCard2 data={GetRandonFood()} />
          <HomeCard2 data={GetRandonFood()} /> */}
          {view}
        </ScrollView>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  main: {
    backgroundColor: backgroundColor,
    height: "100%",
    width: "100%",
  },
  scroll: {},
  title: {
    alignSelf: "center",
    fontSize: 30,
  },
  btn: {
    position: "absolute",
    right: 10,
  },
});
