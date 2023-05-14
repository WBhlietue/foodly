import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Navigate } from "../../App";
import { width } from "../../Datas";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export function HomeCard1(props) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => {
        Navigate("Recipe", props.data);
      }}
    >
      <Image style={style.homeCard1} source={props.data[1]}></Image>
    </TouchableOpacity>
  );
}

export function HomeCard2(props) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => {
        Navigate("Recipe", props.data);
      }}
    >
      <Image style={style.homeCard2} source={props.data[1]}></Image>
    </TouchableOpacity>
  );
}

export function NormalCard(props) {
  const data = props.item.data;
  return (
    <TouchableOpacity
      
      activeOpacity={0.9}
      onPress={() => {
        Navigate("Recipe", data);
      }}
    >
      <Image style={style.homeCard3} source={data[1]}></Image>
    </TouchableOpacity>
  );
}

export function RandomCard(props) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => {
        Navigate("Recipe", props.data);
      }}
    >
      <Image style={style.randomCard} source={props.data[1]}></Image>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  homeCard1: {
    width: windowWidth * 0.8,
    height: ((windowWidth * 0.8) / 16) * 9,
    marginLeft: windowWidth * 0.1,
    marginTop: windowWidth * 0.1,
    borderRadius: 20,
    overflow: "hidden",
    resizeMode: "stretch",
  },
  homeCard2: {
    width: windowWidth * 0.6,
    height: ((windowWidth * 0.6) / 16) * 9,
    borderRadius: 20,
    margin: 5,
    resizeMode: "stretch",
  },
  homeCard3: {
    width: windowWidth * 0.45,
    height: ((windowWidth * 0.45) / 16) * 9,
    borderRadius: 20,
    margin: 5,
    resizeMode: "stretch",
  },
  randomCard: {
    width: windowWidth * 0.9,
    height: ((windowWidth * 0.9) / 16) * 9,
    borderRadius: 20,
    margin: windowWidth * 0.05,
    resizeMode: "stretch",
  },
});
