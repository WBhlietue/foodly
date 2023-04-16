import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { headSize } from "../components/Header";
import { HeaderBack } from "../components/HeaderBack";
import { lorem } from "../components/Lorem";
import { Star } from "../components/Star";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

function Data(props) {
  return (
    <View style={style.dataBox}>
      <Text style={style.dataText}>
        {props.type}: {props.value}
      </Text>
    </View>
  );
}

function TopImage(props) {
  return (
    <View>
      <View style={style.topImageImage}>
        <TouchableOpacity
          style={style.topImageComment}
          onPress={() => {
            props.Click();
          }}
        >
          <Image
            style={{ width: 30, height: 30 }}
            source={require("../../assets/images/comment.png")}
          ></Image>
        </TouchableOpacity>
        <View style={style.topImageStar}>
          <Star size={30} onChange={() => {}} />
        </View>
      </View>
    </View>
  );
}

function CommentBox(props) {
  return (
    <View style={style.commentBox}>
      <Image
        style={{ height: 30, width: 30, marginRight: 10 }}
        source={require("../../assets/images/profile-user.png")}
      ></Image>
      <View>
        <Text style={{ fontSize: 20 }}>{props.name}</Text>
        <Text style={{ fontSize: 15 }}>{props.text}</Text>
      </View>
    </View>
  );
}

export function Recipe(props) {
  const duration = 300;
  const opacity = useRef(new Animated.Value(0)).current;
  const posY = useRef(new Animated.Value(height)).current;
  const [reviewFilter, setReviewFilter] = useState("none");
  useEffect(() => {
    Animated.timing(posY, {
      toValue: height,
      duration: 0,
      useNativeDriver: true,
    }).start();
  }, []);
  function OnClick() {
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
  function OnOff() {
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
    <View>
      <HeaderBack name="Recipe" navigation={props.navigation} back="Main" />
      <ScrollView horizontal={false} style={style.main}>
        <TopImage
          Click={() => {
            OnClick();
          }}
        />
        <View style={style.dataParent}>
          <View style={style.dataRow}>
            <Data type="Type" value="Food" />
            <Data type="Kkal" value="99" />
          </View>
          <View style={style.dataRow}>
            <Data type="Difficult" value="Easy" />
            <Data type="Time" value="30min" />
          </View>
          <View style={[style.dataRow, { height: 60 }]}>
            <Data type="Material" value="Meat, Flour, Water... etc" />
          </View>
        </View>
        <View style={style.howTo}>
          <Text style={style.howToText}>{lorem}</Text>
        </View>
      </ScrollView>
      <Animated.View
        style={[
          style.commentFilter,
          { opacity: opacity, display: reviewFilter },
        ]}
      ></Animated.View>
      <Animated.View
        style={[
          style.commentPanel,
          { translateY: posY }
        ]}
      >
        <TouchableOpacity
          style={style.commentBackArror}
          onPress={() => {
            OnOff();
          }}
        >
          <Image
            style={{ height: 30, width: 30 }}
            source={require("../../assets/images/go-back-arrow.png")}
          ></Image>
        </TouchableOpacity>
        <View style={style.commentHeadet}>
          <Text style={{ fontSize: 20 }}>Comments</Text>
        </View>
        <ScrollView style={style.commentBody}>
          <CommentBox name="DIO" text="Za Warudo"></CommentBox>
          <CommentBox name="Kira Yoshikage" text="Killer Queen"></CommentBox>
          <CommentBox name="Diavolo" text="King Crimson"></CommentBox>
          <CommentBox name="Enrico Pucchi" text="Made in Heaven"></CommentBox>
          <CommentBox
            name="Funny Valentine"
            text="Dirty Deeds Done Dirt Cheap"
          ></CommentBox>
          <CommentBox name="Toru" text="Wonder of You"></CommentBox>
          <CommentBox name="Kishibe Rohan" text="Heaven's Door"></CommentBox>
          <CommentBox name="Wes Bluemarine" text="Weather Report"></CommentBox>
        </ScrollView>
        <View style={style.commentSend}>
          <TextInput style={style.input} placeholder="Enter your comment..." selectionColor={"black"}></TextInput>
          <Image
            style={{ height: 30, width: 30, position: "absolute", right: 10 }}
            source={require("../../assets/images/send-message.png")}
          ></Image>
        </View>
      </Animated.View>
    </View>
  );
}

const style = StyleSheet.create({
  main: {
    height: height - headSize,
    width: "100%",
  },
  topImageImage: {
    width: width * 0.9,
    height: ((width * 0.9) / 16) * 9,
    backgroundColor: "red",
    borderRadius: width * 0.1,
    left: width * 0.05,
    top: width * 0.05,
  },
  topImageComment: {
    position: "absolute",
    bottom: 10,
    left: 20,
  },
  topImageStar: {
    position: "absolute",
    bottom: 10,
    right: 20,
  },
  dataParent: {
    width: "100%",
    top: width * 0.1,
  },
  dataRow: {
    flexDirection: "row",
    margin: width * 0.05,
    marginBottom: 0,
    height: 60,
  },
  dataBox: {
    flex: 1,
    margin: 5,
    backgroundColor: "#F77F00",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  dataText: {
    fontSize: 15,
  },
  howTo: {
    width: width * 0.9,
    minHeight: width * 0.4,
    left: width * 0.05,
    backgroundColor: "#FccF99",
    top: width * 0.17,
    borderRadius: 20,
    padding: 10,
    marginBottom: 80,
  },
  howToText: {
    fontSize: 15,
  },
  commentFilter: {
    position: "absolute",
    zIndex: 10,
    width: "100%",
    height: "100%",
    backgroundColor: "black",
  },
  commentPanel: {
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 3,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    width: width,
    height: height / 1.5,
    zIndex: 12,
    position: "absolute",
    bottom: 0,
  },
  commentBackArror: {
    left: 20,
    top: 10,
  },
  commentHeadet: {
    position: "absolute",
    alignSelf: "center",
    top: 10,
  },
  commentBody: {
    marginTop: 20,
  },
  commentSend: {
    backgroundColor: "#fccf99",
    marginLeft: width * 0.05,
    marginRight: width * 0.05,
    marginBottom: width * 0.02,
    marginTop: width * 0.02,
    borderRadius: 20,
    height: 50,
    justifyContent: "center",
  },
  commentBox: {
    flexDirection: "row",
    backgroundColor: "#F77F00",
    borderRadius: 30,
    margin: width * 0.05,
    height: 70,
    padding: 10,
    alignItems: "center",
  },
  input: {
    width:"80%",
    marginLeft:10,
    height: 40,
    
    // borderColor: "gray",
    // borderWidth: 1,
  },
});
