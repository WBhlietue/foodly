import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Image, StyleSheet } from "react-native";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import {
  backgroundColor,
  loginRegisterButtonColor,
  loginRegisterButtonTextColor,
  loginRegsiterTextColor,
  width,
} from "../../Datas";
import { GetIsLogin, LoginTo } from "../back/Main";
const imagePath = "../../assets/images/";
export function Login(props) {
  const lineNum = 10;
  const line = "―";
  let text = "OR";
  const [isLogin, setIsLogin] = useState(0);
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
  for (let i = 0; i < lineNum; i++) {
    text = line + text + line;
  }

  function LoginAction() {
    if (isLogin == 0) {
      setIsLogin(1);
      LoginTo(
        email,
        pass,
        () => {
          setIsLogin(0);
          // props.navigation.push("Main");
          props.route.params.setIsLogin(1)
        },
        (error) => {
          setIsLogin(0);
          alert(error.code);
        }
      );
    }
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
        placeholder="email"
        placeholderTextColor={"#00000040"}
        onChangeText={(e) => {
          setemail(e)
        }}
      />
      <TextInput
        style={style.input}
        placeholder="password"
        placeholderTextColor={"#00000040"}
        onChangeText={(e) => {
          setpass(e)
        }}
      />
      <View style={style.option}>
        <TouchableOpacity style={style.saveBtn}>
          <Text style={style.saveText}>Remember me</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.forgetBtn}>
          <Text style={style.forgetBtnTxt}>forget my password</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={style.loginBtn}
        onPress={() => {
          LoginAction();
        }}
      >
        <Text style={style.loginBtnTxt}>
          {!isLogin ? "Login" : "Waiting..."}
        </Text>
      </TouchableOpacity>

      <Text style={style.line}>{text}</Text>
      <View style={style.buttons}>
        <TouchableOpacity style={style.btn}>
          <Image
            style={style.otherBtn}
            source={require(imagePath + "google.png")}
          ></Image>
        </TouchableOpacity>
        <TouchableOpacity style={style.btn}>
          <Image
            style={style.otherBtn}
            source={require(imagePath + "facebook.png")}
          ></Image>
        </TouchableOpacity>
      </View>
      <View style={style.fill}></View>
      <View style={style.register}>
        <Text style={style.registerTxt}>Don't have Account? </Text>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("Register");
          }}
        >
          <Text style={[style.registerTxt, { color: loginRegsiterTextColor }]}>
            Sign up
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
  buttons: {
    flexDirection: "row",
  },
  otherBtn: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    top: 0,
    margin: 10,
  },
  register: {
    flexDirection: "row",
    margin: 30,
  },
  registerTxt: {},
  fill: {
    flex: 1,
  },
  btn: {},
});
