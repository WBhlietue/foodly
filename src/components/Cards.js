import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Navigate } from "../../App";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export function HomeCard1(props) {
  return (
    <TouchableOpacity style={style.homeCard1} activeOpacity={0.9} onPress={() =>{
      Navigate("Recipe");
    }}>
      <View></View>
    </TouchableOpacity>
  );
}

export function HomeCard2(props) {
  return (
    <TouchableOpacity style={style.homeCard2} activeOpacity={0.9} onPress={() =>{
      Navigate("Recipe");
    }}>
      <View></View>
    </TouchableOpacity>
  );
}

export function NormalCard(props){
    return (
        <TouchableOpacity style={style.homeCard3} activeOpacity={0.9} onPress={() =>{
          Navigate("Recipe");
        }}>
          <View></View>
        </TouchableOpacity>
      );
}

export function RandomCard(props){
    return (
        <TouchableOpacity style={style.randomCard} activeOpacity={0.9} onPress={() =>{
          Navigate("Recipe");
        }}>
          <View></View>
        </TouchableOpacity>
      );
}

const style = StyleSheet.create({
  homeCard1: {
    backgroundColor: "#ffaaaa",
    width: windowWidth * 0.8,
    height: ((windowWidth * 0.8) / 16) * 9,
    marginLeft: windowWidth * 0.1,
    marginTop: windowWidth * 0.1,
    borderRadius: 20,
  },
  homeCard2: {
    backgroundColor: "#ffaaaa",
    width: windowWidth * 0.6,
    height: ((windowWidth * 0.6) / 16) * 9,
    borderRadius: 20,
    margin:5
  },
  homeCard3: {
    backgroundColor: "#ffaaaa",
    width: windowWidth * 0.45,
    height: ((windowWidth * 0.45) / 16) * 9,
    borderRadius: 20,
    margin:5
  },
  randomCard: {
    backgroundColor: "#ffaaaa",
    width: windowWidth * 0.9,
    height: ((windowWidth * 0.9) / 16) * 9,
    borderRadius: 20,
    margin: windowWidth * 0.05,
  },
});
