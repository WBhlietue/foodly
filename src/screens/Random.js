import { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { View, Text, StyleSheet } from "react-native";
import { Navigate } from "../../App";
import { backgroundColor, randomBtnColor } from "../../Datas";
import { GetNumberRandomFood, GetRandonFood } from "../back/Main";
import { HomeCard2, RandomCard } from "../components/Cards";

const width = Dimensions.get("window").width;

export function Random() {
  const [rand, setRand] = useState([]);
  const [load, setLoad] = useState(0);
  if (load == 0) {
    setLoad(1);
    GetRandonFood().then((res) => {
      setRand(res);
    });
  }
  return (
    <View style={style.main}>
      {rand.length == 0 ? <View></View> : <RandomCard data={rand} />}
      <RandonPanel />
    </View>
  );
}

export function RandonPanel() {
  const aniScale = useRef(new Animated.Value(1)).current;
  var get = false;
  aniScale.addListener((value) => {
    if (value.value == 1.8 && !get) {
      GetRandonFood().then((res) => {
        Navigate("Recipe", res);
      })
      get = true;
    }
  });
  return (
    <Animated.View style={[style.rand, { scaleX: aniScale, scaleY: aniScale }]}>
      <TouchableOpacity
        style={style.opa}
        activeOpacity={1}
        onPressIn={() => {
          Animated.spring(aniScale, {
            toValue: 1.8,
            useNativeDriver: true,
            friction: 10,
            tension: 10,
          }).start();
        }}
        onPressOut={() => {
          Animated.spring(aniScale, {
            toValue: 1,
            useNativeDriver: true,
            friction: 6,
            tension: 80,
          }).start();
        }}
      >
        <Text style={style.text}>Press</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const style = StyleSheet.create({
  main: {
    backgroundColor: backgroundColor,
    height: "100%",
    width: "100%",
  },
  rand: {
    width: width * 2,
    height: width * 2,
    position: "absolute",
    bottom: 100 - width,
    left: -width / 2,
    borderRadius: width,
    alignItems: "center",
  },
  opa: {
    backgroundColor: randomBtnColor,
    width: width * 2,
    height: width * 2,
    position: "absolute",
    borderRadius: width,
    alignItems: "center",
  },
  text: {
    position: "absolute",
    fontSize: 50,
    color: "#000000",
    marginTop: 150,
  },
});
