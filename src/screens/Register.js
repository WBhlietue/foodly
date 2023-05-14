import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Image, KeyboardAvoidingView, StyleSheet } from "react-native";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { Navigate } from "../../App";
import {
  backgroundColor,
  center,
  loginRegisterButtonColor,
  loginRegisterButtonTextColor,
  loginRegsiterTextColor,
  width,
} from "../../Datas";
import { RegisterTo, SetIsLogin } from "../back/Main";

export function Register(props) {
  const [isLogin, setIsLogin] = useState(0);
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
  const [repass, setrepass] = useState("");
  const [userName, setuserName] = useState("");
  function Click() {
    if(isLogin==1){
      return
    }
    if (pass != repass) {
      alert("password not match");
      return;
    }
    setIsLogin(1);
    RegisterTo(
      userName,
      email,
      pass,
      () => {
        setIsLogin(0);
        // props.navigation.push("Main");
        props.route.params.setIsLogin(1)
      },
      (error) => {
        setIsLogin(0);
        alert(error);
      }
    );
  }
  return (
    <View style={style.main}>
      <StatusBar
        translucent={false}
        style="auto"
        backgroundColor={backgroundColor}
      />
      <View style={style.logo}>
        <Image
          style={style.logoImg}
          source={require("../../assets/images/foodly.png")}
        ></Image>
      </View>
      <TextInput
        style={style.input}
        placeholder="userName"
        placeholderTextColor={"#00000040"}
        onChangeText={(e) => {
          setuserName(e);
        }}
      />
      <TextInput
        style={style.input}
        placeholder="email"
        placeholderTextColor={"#00000040"}
        onChangeText={(e) => {
          setemail(e);
        }}
      />
      <TextInput
        style={style.input}
        placeholder="password"
        placeholderTextColor={"#00000040"}
        onChangeText={(e) => {
          setpass(e);
        }}
      />
      <TextInput
        style={style.input}
        placeholder="repeat password"
        placeholderTextColor={"#00000040"}
        onChangeText={(e) => {
          setrepass(e);
        }}
      />
      <TouchableOpacity
        style={style.loginBtn}
        onPress={() => {
          Click();
        }}
      >
        <Text style={style.loginBtnTxt}>
          {isLogin == 0 ? "Register" : "Waiting..."}
        </Text>
      </TouchableOpacity>
      <View style={style.fill}></View>
      <View style={style.register}>
        <Text style={style.registerTxt}>Already have Account? </Text>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("Login");
          }}
        >
          <Text style={[style.registerTxt, { color: loginRegsiterTextColor }]}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const style = StyleSheet.create({
  main: {
    alignItems: "center",
    backgroundColor: backgroundColor,
    flex: 1,
  },
  logo: {},
  logoImg: {
    marginTop: 50,
    marginBottom: 50,
    width: width * 0.9,
    height: ((width * 0.9) / 16) * 9,
    resizeMode: "contain",
  },
  input: {
    borderColor: "#999999",
    borderWidth: 1,
    width: width * 0.9,
    margin: 10,
    height: 50,
    borderRadius: 100,
    paddingHorizontal: 20,
  },
  option: {
    width: width * 0.9,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  forgetBtn: {
    margin: 10,
  },
  forgetBtnTxt: {
    textDecorationLine: "underline",
    color: loginRegsiterTextColor,
  },
  saveBtn: {
    margin: 10,
  },
  saveText: {},
  saveCheck: {},
  loginBtn: {
    backgroundColor: loginRegisterButtonColor,
    width: width * 0.6,
    height: width * 0.15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    marginTop: 30,
    marginBottom: 10,
  },
  loginBtnTxt: {
    fontSize: 25,
    color: loginRegisterButtonTextColor,
  },
  line: {},
  buttons: {},
  otherBtn: {},
  register: {
    flexDirection: "row",
    margin: 30,
  },
  registerTxt: {},
  fill: {
    flex: 1,
  },
});
