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

const navBarInnerPadding = 30;
const navColor = "#9999ff";
const navSize = 50;
const backSize = 1.5;
const pos = [];
function NavButton(props) {
  const [active, setActive] = useState(props.num == props.selected);
  const aniScale = useRef(new Animated.Value(1)).current
  const aniPosY = useRef(new Animated.Value(0)).current
  useEffect(() => {
    if(active){
        Animated.timing(aniScale, {
            toValue:1.5,
            duration:100,
            easing:Easing.elastic(),
            useNativeDriver:true
        }).start()
        Animated.timing(aniPosY, {
            toValue:-10,
            duration:100,
            easing:Easing.elastic(),
            useNativeDriver:true
        }).start()
    }
  }, [])
  if((props.num == props.selected) != active){
    if(!active){
        Animated.timing(aniScale, {
            toValue:1.5,
            duration:100,
            easing:Easing.elastic(),
            useNativeDriver:true
        }).start()
        Animated.timing(aniPosY, {
            toValue:-10,
            duration:100,
            easing:Easing.elastic(),
            useNativeDriver:true
        }).start()
    }else{
        Animated.timing(aniScale, {
            toValue:1,
            duration:100,
            useNativeDriver:true,
            easing: Easing.elastic(),
        }).start()
        Animated.timing(aniPosY, {
            toValue:0,
            duration:100,
            easing:Easing.elastic(),
            useNativeDriver:true
        }).start()
    }
    setActive(props.num == props.selected)
  }
  return (
    <TouchableOpacity
      onPress={() => {
        
        props.onPress(props.num);
      }}
    >
      <Animated.View style={[style.navBtn, {scaleX:aniScale, scaleY:aniScale, translateY:aniPosY}]}>
        <Image style={style.img} source={
          props.num == 0?require("../../assets/images/shuffle.png"):
          props.num == 1?require("../../assets/images/carousel.png"):
          props.num == 2?require("../../assets/images/home.png"):
          props.num == 3?require("../../assets/images/star.png"):
          props.num == 4?require("../../assets/images/user.png"):require("../../assets/images/home.png")
        }></Image>
      </Animated.View>
    </TouchableOpacity>
  );
}

export function Navigator(props) {
  const windowWidth = Dimensions.get("window").width;
  pos.length = 0;
  for (let i = 0; i < 5; i++) {
    pos.push(
      navBarInnerPadding +
        ((windowWidth - 2 * navBarInnerPadding - navSize * 5) / 4 + navSize) * i
    );
  }
  const [backLeft, setBackLeft] = useState(pos[2]);
  const aniBackLeft = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    setBackLeft(pos[props.select[0]]);
  }, [props.select[0]]);
  useEffect(() => {
    Animated.timing(aniBackLeft, {
        toValue: backLeft,
        duration: 100,
        useNativeDriver: true,
        easing: Easing.elastic(),
      }).start();
  }, [backLeft]);
  function Click(num) {
    props.select[1](num);
  }
  return (
    <View style={style.main}>
      <Animated.View
        style={[
          style.navBack,
          { translateX: aniBackLeft },
        ]}
      ></Animated.View>
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
    backgroundColor: navColor,
    width: "100%",
    position: "absolute",
    height: navSize,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingLeft: navBarInnerPadding,
    paddingRight: navBarInnerPadding,
  },
  navBtn: {
    height: navSize,
    width: navSize,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: navSize,
  },
  navBack: {
    position: "absolute",
    height: navSize * backSize,
    width: navSize * backSize,
    backgroundColor: navColor,
    borderRadius: navSize,
    bottom: 0,
    marginLeft: -((backSize - 1) * navSize) / 2,
  },
  img:{
    height:30,
    width:30
  }
});
