import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { HomeCard1, HomeCard2 } from "../components/Cards";

function Bar(props) {
  return (
    <View style={{margin:10}}>
      <Text style={style.title}> {props.name}</Text>
      <TouchableOpacity style={style.btn} onPress={() =>{ 
        props.navigation.navigate("More", {type:props.name});
      }}>
        <Text style={style.title}>{"->"}</Text>
      </TouchableOpacity>
    </View>
  );
}

export function Home(props) {
  return (
    <View style={style.main}>
      <HomeCard1 />
      <Bar name="Most Poplular" navigation = {props.navigation}/>
      <View style={style.scroll}>
        <ScrollView horizontal>
          <HomeCard2 />
          <HomeCard2 />
          <HomeCard2 />
          <HomeCard2 />
          <HomeCard2 />
        </ScrollView>
      </View>
      <Bar name="Most View" navigation = {props.navigation}/>
      <View style={style.scroll}>
        <ScrollView horizontal>
          <HomeCard2 />
          <HomeCard2 />
          <HomeCard2 />
          <HomeCard2 />
          <HomeCard2 />
        </ScrollView>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  main: {
    backgroundColor: "#ffffff",
    height: "100%",
    width: "100%",
  },
  scroll: {

  },
  title: {
    alignSelf:"center",
    fontSize:30
  },
  btn: {
    position:"absolute",
    right:10
  },
});
