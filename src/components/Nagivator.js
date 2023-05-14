import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Circle, Path, Svg } from "react-native-svg";
import { footerColor } from "../../Datas";

const navBarInnerPadding = 15;
export const navSize = 50;
const backSize = 1.5;
const pos = [-137, -67, 2, 71, 137];
const width = Dimensions.get("window").width;
const dur = 500;
function NavButton(props) {
  const [active, setActive] = useState(props.num == props.selected);
  const aniScale = useRef(new Animated.Value(1)).current;
  const aniPosY = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (active) {
      Animated.timing(aniScale, {
        toValue: 1.2,
        duration: dur,
        easing: Easing.elastic(),
        useNativeDriver: true,
      }).start();
      Animated.timing(aniPosY, {
        toValue: -15,
        duration: dur,
        easing: Easing.elastic(),
        useNativeDriver: true,
      }).start();
    }
  }, []);
  if ((props.num == props.selected) != active) {
    if (!active) {
      Animated.timing(aniScale, {
        toValue: 1.2,
        duration: dur,
        easing: Easing.elastic(),
        useNativeDriver: true,
      }).start();
      Animated.timing(aniPosY, {
        toValue: -15,
        duration: dur,
        easing: Easing.elastic(),
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(aniScale, {
        toValue: 1,
        duration: dur,
        useNativeDriver: true,
        easing: Easing.elastic(),
      }).start();
      Animated.timing(aniPosY, {
        toValue: 0,
        duration: dur,
        easing: Easing.elastic(),
        useNativeDriver: true,
      }).start();
    }
    setActive(props.num == props.selected);
  }
  return (
    <TouchableOpacity
      onPress={() => {
        props.onPress(props.num);
      }}
    >
      <Animated.View
        style={[
          style.navBtn,
          { scaleX: aniScale, scaleY: aniScale, translateY: aniPosY },
        ]}
      >
        <Image
          style={style.img}
          source={
            props.num == 0
              ? require("../../assets/images/shuffle.png")
              : props.num == 1
              ? require("../../assets/images/search.png")
              : props.num == 2
              ? require("../../assets/images/home.png")
              : props.num == 3
              ? require("../../assets/images/star.png")
              : props.num == 4
              ? require("../../assets/images/user.png")
              : require("../../assets/images/home.png")
          }
        ></Image>
      </Animated.View>
    </TouchableOpacity>
  );
}

export function Navigator(props) {
  const windowWidth = Dimensions.get("window").width;

  const [backLeft, setBackLeft] = useState(pos[2]);
  const aniBackLeft = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    setBackLeft(pos[props.select[0]]);
  }, [props.select[0]]);
  useEffect(() => {
    Animated.timing(aniBackLeft, {
      toValue: pos[props.select[0]],
      duration: dur,
      useNativeDriver: true,
      easing: Easing.elastic(),
    }).start();
  }, [backLeft]);
  function Click(num) {
    props.select[1](num);
  }
  return (
    <View style={style.main}>
      <View style={style.newNavParent}>
        <Animated.View style={[style.newNavBack, { translateX: aniBackLeft }]}>
          {/* <Image
            style={style.ultraNewNavImage}
            source={require("../../assets/images/suuri.svg")}
          ></Image> */}
          <Svg
            width="800"
            height="53"
            viewBox="0 0 800 53"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={style.ultraNewNavImage}
          >
            <Path
              d="M0 0H328.891C350.661 0 371.468 8.97559 386.407 24.811V24.811C400.836 40.1066 425.164 40.1066 439.593 24.811V24.811C454.532 8.97559 475.339 0 497.109 0H800V53H0V0Z"
              fill={footerColor}
            />
          </Svg>
          <View style={style.ultraNewNavCircle}></View>
          <View style={style.ultraNewNavLeft}></View>
          <View style={style.ultraNewNavRight}></View>
        </Animated.View>
      </View>
      <NavButton
        src="../../assets/images/home.png"
        onPress={(e) => {
          Click(e);
        }}
        num={0}
        selected={props.select[0]}
      />
      <NavButton
        src="../../assets/images/home.png"
        onPress={(e) => {
          Click(e);
        }}
        num={1}
        selected={props.select[0]}
      />
      <NavButton
        src="../../assets/images/home.png"
        onPress={(e) => {
          Click(e);
        }}
        num={2}
        selected={props.select[0]}
      />
      <NavButton
        src="../../assets/images/home.png"
        onPress={(e) => {
          Click(e);
        }}
        num={3}
        selected={props.select[0]}
      />
      <NavButton
        src="../../assets/images/home.png"
        onPress={(e) => {
          Click(e);
        }}
        num={4}
        selected={props.select[0]}
      />
    </View>
  );
}

const style = StyleSheet.create({
  main: {
    width: "100%",
    position: "absolute",
    height: navSize,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingRight: navBarInnerPadding,
  },
  navBtn: {
    height: navSize,
    width: navSize,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: navSize,
  },
  img: {
    height: 30,
    width: 30,
  },

  ultraNewNavImage: {
    position: "absolute",
    bottom: -30,
    left: -233,
  },
  ultraNewNavCircle: {
    height: 50,
    width: 50,
    position: "absolute",
    bottom: -10,
    left: width / 2 - 25,
    backgroundColor: footerColor,
    borderRadius: 100,
  },
});
