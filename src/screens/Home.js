import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Navigate, stack } from "../../App";
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
  return (
    <View style={style.main}>
      <HomeCard1 />
      <Bar name="Most Poplular" />
      <View style={style.scroll}>
        <ScrollView horizontal>
          <HomeCard2 />
          <HomeCard2 />
          <HomeCard2 />
          <HomeCard2 />
          <HomeCard2 />
        </ScrollView>
      </View>
      <Bar name="Most View" />
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
