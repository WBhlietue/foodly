import { Children, useEffect, useRef, useState } from "react";
import {
  Animated,
  Button,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export function AnimatedPanel(props) {
  const [z, setZ] = useState(-1);
  const duration = props.duration;
  const opacity = useRef(new Animated.Value(0)).current;
  const posY = useRef(new Animated.Value(height)).current;
  const [reviewFilter, setReviewFilter] = useState("none");
  useEffect(() => {
    console.log(props.button.current);
    Animated.timing(posY, {
      toValue: height,
      duration: 0,
      useNativeDriver: true,
    }).start();
  }, []);
  function Show() {
    setZ(1);
    setReviewFilter("flex");
    Animated.timing(opacity, {
      toValue: 0.4,
      duration: duration,
      useNativeDriver: true,
    }).start();
    Animated.timing(posY, {
      toValue: 0,
      duration: duration,
      useNativeDriver: true,
    }).start();
  }
  function Hide() {
    setZ(-1);
    setReviewFilter("flex");
    Animated.timing(opacity, {
      toValue: 0,
      duration: duration,
      useNativeDriver: true,
    }).start();
    Animated.timing(posY, {
      toValue: height,
      duration: duration,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      setReviewFilter("none");
    }, duration);
  }

  return (
    <View style={[style.main, { zIndex: z }]}>
      <TouchableOpacity
        style={props.openStyle}
        onPress={() => {
          Show();
        }}
      >
        <Text style={props.openTextStyle}>{props.text}</Text>
      </TouchableOpacity>
      <View style={[{ position: "absolute", left: 0, top: 0 }, { zIndex: z }]}>
        <Animated.View
          style={[style.filter, { opacity: opacity, display: reviewFilter }]}
        ></Animated.View>
        <Animated.View style={[style.panel, { translateY: posY }]}>
          
          {Children.map(props.children, (i) => {
            return i;
          })}
        </Animated.View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  main: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  filter: {
    width: width,
    height: height,
    backgroundColor: "black",
    zIndex: 10,
    position: "absolute",
    top: 0,
  },
  panel: {
    width: width,
    height: height,
    alignItems: "center",
    justifyContent: "center",
  },
});
