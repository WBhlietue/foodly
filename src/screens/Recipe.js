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
import {
  backgroundColor,
  recipeDataBoxColor,
  recipeDescriptionColor,
  recipeHowToColor,
} from "../../Datas";
import { AddFavorite, GetIsFav } from "../back/Main";
import { headSize } from "../components/Header";
import { HeaderBack } from "../components/HeaderBack";
import { lorem } from "../components/Lorem";
import { Star } from "../components/Star";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

function Data(props) {
  return (
    <View style={style.dataBox}>
      <Text style={style.dataText}>{props.type}:</Text>
      <Text style={style.dataText2}>{props.value}</Text>
    </View>
  );
}

function TopImage(props) {
  return (
    <View>
      <Image source={props.source} style={style.topImageImage}></Image>
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
  const data = props.route.params;
  const duration = 300;
  const opacity = useRef(new Animated.Value(0)).current;
  const posY = useRef(new Animated.Value(height)).current;
  const [reviewFilter, setReviewFilter] = useState("none");
  const [favorite, setFavorite] = useState(GetIsFav(data[0].num));
  const materials = data[0].material.join(", ");
  let howTo = "";
  for (let i = 0; i < data[0].howto.length; i++) {
    howTo += "      Step" + (i + 1) + ": " + (data[0].howto[i].trim()) + "\n";
  }
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
      <HeaderBack
        name={data[0].name}
        navigation={props.navigation}
        back="Main"
      />
      <ScrollView horizontal={false} style={style.main}>
        <TopImage
          source={data[1]}
          Click={() => {
            OnClick();
          }}
        />
        <View style={style.options}>
          {/* <TouchableOpacity
            style={style.topImageComment}
            onPress={() => {
              props.Click();
            }}
          >
            <Image
              style={{ width: 30, height: 30 }}
              source={require("../../assets/images/comment.png")}
            ></Image>
          </TouchableOpacity> */}
          <View style={style.topImageStar}>
            <Star size={30} onChange={() => {
              AddFavorite(data[0].num, data[0].favorite).then((res) => {
                active = res;
              });
              alert("added")
            }} active={favorite}/>
          </View>
        </View>
        <View style={style.dataParent}>
          <View style={style.dataRow}>
            <Data type="Type" value={data[0].type} />
            <Data type="Kkal" value={data[0].kkal} />
          </View>
          <View style={style.dataRow}>
            <Data type="Difficult" value={data[0].difficut} />
            <Data type="Time" value={data[0].time} />
          </View>
          <View style={[style.dataRow]}>
            <Data type="Material" value={materials} />
          </View>
        </View>
        <View style={style.description}>
          <Text style={style.descriptionText}>{data[0].description}</Text>
        </View>
        <View style={style.howTo}>
          <Text style={style.howToText}>{howTo}</Text>
        </View>
      </ScrollView>
      <Animated.View
        style={[
          style.commentFilter,
          { opacity: opacity, display: reviewFilter },
        ]}
      ></Animated.View>
      <Animated.View style={[style.commentPanel, { translateY: posY }]}>
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
          <TextInput
            style={style.input}
            placeholder="Enter your comment..."
            selectionColor={"black"}
          ></TextInput>
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
    marginTop: width * 0.05,
    resizeMode: "stretch",
  },
  options: {
    flexDirection: "row",
    width: width * 0.9,
    justifyContent: "space-between",
    alignSelf: "center",
    marginTop: 10,
  },
  topImageComment: {},
  topImageStar: {},
  dataParent: {
    width: "100%",
  },
  dataRow: {
    flexDirection: "row",
    margin: 10,
    marginBottom: 0,
  },
  dataBox: {
    flex: 1,
    margin: 5,
    backgroundColor: recipeDataBoxColor,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    flexDirection: "row",
  },
  dataText: {
    fontSize: 15,
    textTransform: "capitalize",
    minWidth: 50,
    textAlign: "right",
    marginRight: 5,
  },
  dataText2: {
    fontSize: 15,
    textTransform: "capitalize",
    flex: 1,
  },
  howTo: {
    width: width * 0.9,
    left: width * 0.05,
    backgroundColor: recipeHowToColor,
    marginTop: 20,
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
  },
  howToText: {
    fontSize: 15,
  },
  description: {
    width: width * 0.9,
    left: width * 0.05,
    backgroundColor: recipeDescriptionColor,
    marginTop: 20,
    borderRadius: 20,
    padding: 10,
  },
  descriptionText: {
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
    marginTop: 10,
  },
  commentHeadet: {
    position: "absolute",
    alignSelf: "center",
    marginTop: 10,
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
    width: "80%",
    marginLeft: 10,
    height: 40,

    // borderColor: "gray",
    // borderWidth: 1,
  },
});
