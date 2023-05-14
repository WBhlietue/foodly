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
import { Navigate } from "../../App";
import {
  addSaveRecipeButton,
  backgroundColor,
  recipeDataBoxColor,
  recipeDescriptionColor,
  recipeHowToColor,
} from "../../Datas";
import { Upload } from "../back/Main";
import { headSize } from "../components/Header";
import { HeaderBack } from "../components/HeaderBack";
import { lorem } from "../components/Lorem";
import { Star } from "../components/Star";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

function Data(props) {
  return (
    <View style={style.dataBox}>
      <TextInput style={style.dataText2} placeholder={props.type}></TextInput>
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

export function EditRecipe(props) {
  const data = props.route.params;

  const [prog, setPros] = useState(0);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [kkal, setKkal] = useState("");
  const [difficult, setDifficult] = useState("");
  const [time, setTime] = useState("");
  const [material, setMaterial] = useState("");
  const [description, setDescription] = useState("");
  const [howto, setHowto] = useState("");

  return (
    <View>
      <HeaderBack
        name={data == -1 ? "New Recipe" : "Edit Recipe"}
        navigation={props.navigation}
        back="MyRecipe"
      />
      <ScrollView horizontal={false} style={style.main}>
        <TopImage
          source={data[1]}
          Click={() => {
            OnClick();
          }}
        />

        <View style={style.dataParent}>
          <View style={style.description}>
            <TextInput
              onChangeText={(e) => {
                setName(e);
              }}
              style={style.dataText2}
              placeholder={"Name"}
            ></TextInput>
          </View>
          <View style={style.dataRow}>
            <View style={style.dataBox}>
              <TextInput
                onChangeText={(e) => {
                  setType(e);
                }}
                style={style.dataText2}
                placeholder={"Type"}
              ></TextInput>
            </View>
            <View style={style.dataBox}>
              <TextInput
                onChangeText={(e) => {
                  setKkal(e);
                }}
                style={style.dataText2}
                placeholder={"Kkal"}
              ></TextInput>
            </View>
          </View>
          <View style={style.dataRow}>
            <View style={style.dataBox}>
              <TextInput
                onChangeText={(e) => {
                  setDifficult(e);
                }}
                style={style.dataText2}
                placeholder={"Difficult"}
              ></TextInput>
            </View>
            <View style={style.dataBox}>
              <TextInput
                onChangeText={(e) => {
                  setTime(e);
                }}
                style={style.dataText2}
                placeholder={"Time"}
              ></TextInput>
            </View>
          </View>
          <View style={[style.dataRow]}>
            <View style={style.dataBox}>
              <TextInput
                onChangeText={(e) => {
                  setMaterial(e);
                }}
                style={style.dataText2}
                placeholder={"Material"}
              ></TextInput>
            </View>
          </View>
        </View>

        <View style={style.description}>
          <TextInput
            onChangeText={(e) => {
              setDescription(e);
            }}
            style={style.descriptionText}
            placeholder={"Description"}
          ></TextInput>
        </View>
        <View style={style.howTo}>
          <TextInput
            onChangeText={(e) => {
              setHowto(e);
            }}
            style={style.howToText}
            placeholder={"Steps"}
          ></TextInput>
        </View>
        <TouchableOpacity
          style={style.saveBtn}
          onPress={() => {
            setPros(1);
            Upload(
              name,
              type,
              kkal,
              difficult,
              time,
              material,
              description,
              howto,
              () => {
                setPros(0);
                Navigate("MyRecipe");
              },
              (error) => {
                setPros(0);
                alert(error.code);
              }
            );
          }}
        >
          <Text style={style.saveBtnTxt}>
            {prog == 0 ? (data == -1 ? "Add" : "Save") : "Waiting"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
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
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderBottomColor: "black",
    borderBottomWidth: 1,
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
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginTop: 20,
    marginBottom: 20,
  },
  howToText: {
    fontSize: 15,
  },
  description: {
    width: width * 0.9,
    left: width * 0.05,
    marginTop: 20,
    borderBottomColor: "black",
    borderBottomWidth: 1,
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
  saveBtn: {
    alignSelf: "center",
    width: width * 0.4,
    height: 50,
    backgroundColor: addSaveRecipeButton,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
  saveBtnTxt: {
    fontSize: 25,
  },
});
