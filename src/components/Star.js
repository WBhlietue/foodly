import { useState } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

export function Star(props) {
  const [active, setActive] = useState(props.active);
  return (
    <TouchableOpacity activeOpacity={0.7}
      onPress={() => {
        setActive(!active)
        props.onChange();
      }}
    >
      <Image
        style={{ width: props.size, height: props.size }}
        source={active ? require("../../assets/images/starFull.png"):require( "../../assets/images/starOutline.png")}
      />
    </TouchableOpacity>
  );
}
