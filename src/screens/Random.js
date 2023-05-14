import { useRef } from "react";
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

var random1 = GetRandonFood();

export function Random() {
  return (
    <View style={style.main}>
      <RandomCard data={random1}/>
      <RandonPanel />
    </View>
  );
}

export function RandonPanel() {
  const aniScale = useRef(new Animated.Value(1)).current;
  var get = false;
  aniScale.addListener((value) => {
    if(value.value == 1.8 && !get){
      Navigate("Recipe", GetRandonFood())
      get = true
    }
  })
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
