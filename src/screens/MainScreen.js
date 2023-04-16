import { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, StyleSheet, Text, View } from "react-native";
import { Category } from "./Category";
import { Favorite } from "./Favorite";
import { Home } from "./Home";
import { Random } from "./Random";
import { User } from "./User";

var current = -1;

export function MainScreen(props) {
  const windowWidth = Dimensions.get("window").width;

  const page = [];
  if (current == -1 || current == props.page) {
    current = props.page;
    page.push(
      <View style={{ height: "100%", width: "100%", zIndex: 0 }}>
        {props.page == 0 ? (
          <Random navigation={props.navigation} />
        ) : props.page == 1 ? (
          <Category navigation={props.navigation} />
        ) : props.page == 2 ? (
          <Home navigation={props.navigation} />
        ) : props.page == 3 ? (
          <Favorite navigation={props.navigation} />
        ) : props.page == 4 ? (
          <User navigation={props.navigation} />
        ) : (
          <View />
        )}
      </View>
    );
  } else {
    var w = windowWidth * (current > props.page ? -1:1)
    var aniPosX = new Animated.Value(w);
    var ani = Animated.timing(aniPosX, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    })
    ani.reset();
    ani.start()
    page.push(
      <View style={{ height: "100%", width: "100%", zIndex: 0 }}>
        {current == 0 ? (
          <Random navigation={props.navigation} />
        ) : current == 1 ? (
          <Category navigation={props.navigation} />
        ) : current == 2 ? (
          <Home navigation={props.navigation} />
        ) : current == 3 ? (
          <Favorite navigation={props.navigation} />
        ) : current == 4 ? (
          <User navigation={props.navigation} />
        ) : (
          <View />
        )}
      </View>
    );
  
    page.push(
      <Animated.View
        style={[
          {
            position: "absolute",
            height: "100%",
            width: "100%",
            zIndex: 1,
          },
          { translateX: aniPosX },
        ]}
      >
        {props.page == 0 ? (
          <Random navigation={props.navigation} />
        ) : props.page == 1 ? (
          <Category navigation={props.navigation} />
        ) : props.page == 2 ? (
          <Home navigation={props.navigation} />
        ) : props.page == 3 ? (
          <Favorite navigation={props.navigation} />
        ) : props.page == 4 ? (
          <User navigation={props.navigation} />
        ) : (
          <View />
        )}
      </Animated.View>
    );
    current = props.page;
  }
  return <View style={style.main}>{page}</View>;
}

const style = StyleSheet.create({
  main: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "100%",
    marginBottom: 50,
    marginTop: 50,
    left: 0,
  },
});
