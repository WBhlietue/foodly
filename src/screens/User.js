import { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  Animated,
  Image,
} from "react-native";
import { headColor } from "../components/Header";
import { navSize } from "../components/Nagivator";
import { GetTest, Test } from "../back/Main";
import { AnimatedPanel } from "../components/AnimatedPanel";
import { Navigate } from "../../App";
import { headerColor, userBtnColor, userInfoBackColor } from "../../Datas";

export function User(props) {
  return (
    <View style={style.main}>
      <View style={style.topColor}></View>
      <Image source={require("../../assets/images/cooker.png")}  style={style.userImage}></Image>
      <View style={style.userInfo}>
        <Image
          source={require("../../assets/images/user1.png")}
          style={style.userInfoIcon}
        ></Image>
        <Text style={style.userInfoName}>UserName</Text>
      </View>
      <View style={style.items}>
        <TouchableOpacity style={style.itemsBtn} activeOpacity={0.8}onPress={() => {
          Navigate("MyRecipe")
        }}>
          <Image
            source={require("../../assets/images/menu.png")}
            style={style.itemsBtnIcon}
          ></Image>
          <Text style={style.itemsBtnText}>My recipe</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.itemsBtn} activeOpacity={0.8}>
          <Image
            source={require("../../assets/images/language.png")}
            style={style.itemsBtnIcon}
          ></Image>
          <Text style={style.itemsBtnText}>Languages</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.itemsBtn} activeOpacity={0.8} onPress={() => {
          Navigate("Filter")
        }}>
          <Image
            source={require("../../assets/images/filter.png")}
            style={style.itemsBtnIcon}
          ></Image>
          <Text style={style.itemsBtnText}>Filter</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.setIsLogin(0)
          }}
          style={style.itemsBtn}
          activeOpacity={0.8}
        >
          <Image
            source={require("../../assets/images/logout.png")}
            style={style.itemsBtnIcon}
          ></Image>
          <Text style={style.itemsBtnText}>Logout</Text>
        </TouchableOpacity>
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
  topColor: {
    backgroundColor: headerColor,
    height: 50,
  },
  userImage: {
    backgroundColor: userInfoBackColor,
    width: 100,
    height: 100,
    marginTop: -50,
    alignSelf: "center",
    borderRadius: 100,
  },
  userInfo: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: 20,
  },
  userInfoIcon: {
    marginRight: 5,
    width: 25,
    height: 25,
  },
  userInfoName: {},
  items: {
    flex: 1,
    paddingTop:40,
    paddingBottom:60,
    justifyContent: "space-around",
    marginBottom: navSize * 2,
  },
  itemsBtn: {
    height: 50,
    width: "100%",
    backgroundColor: userBtnColor,
    borderRadius: 10,
    // alignItems:"center",
    paddingLeft: 20,
    alignItems: "center",
    flexDirection: "row",
  },
  itemsBtnIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  itemsBtnText: {
    fontSize: 18,
  },
  loginBtn: {
    margin: 50,
  },
  otherBtn: {
    alignSelf: "center",
    margin: 20,
    width: "80%",
    height: 50,
    backgroundColor: userBtnColor,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  otherBtnIcon: {},
  otherBtnText: {
    fontSize: 20,
  },
  aniBlock: {
    width: "100%",
    height: "100%",
    backgroundColor: "black",
    position: "absolute",
  },
});
