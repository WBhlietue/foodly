import { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Navigate } from "../../App";
import {
  myRecipeAddBtnColor,
  myRecipeCardBackGroundColor,
  myRecipeCardBtnColor,
  width,
} from "../../Datas";
import { GetFoodsByCategory, GetMyRecipes } from "../back/Main";
import { HeaderBack } from "../components/HeaderBack";
// {"description": "test", "difficult": "test", "howto": "test", "kkal": "test", "material": "test",
// "name": "test1", "num": 0, "time": "test", "type": "twst", "user": "hakuran"}
function RecipeCard(props) {
  return (
    <View style={style.recipeCardMain}>
      <Image source={props.data[1]} style={style.recipeCardPic}></Image>
      <View style={style.recipeCardDatas}>
        <View style={style.recipeCardRow}>
          <Text style={style.recipeCardText}>Name: </Text>
          <Text style={style.recipeCardText}>{props.data[0].name}</Text>
        </View>
        <View style={style.recipeCardRow}>
          <Text style={style.recipeCardText}>Num: </Text>
          <Text style={style.recipeCardText}>{props.data[0].num}</Text>
        </View>
        <View style={style.recipeCardRow}>
          <Text style={style.recipeCardText}>Views: </Text>
          <Text style={style.recipeCardText}>{props.data[0].view}</Text>
        </View>
        <View style={style.recipeCardRow}>
          <Text style={style.recipeCardText}>Favorites: </Text>
          <Text style={style.recipeCardText}>{props.data[0].favorite}</Text>
        </View>
        <View style={style.recipeCardRow2}>
          <TouchableOpacity style={style.recipeCardBtn}>
            <Text style={style.recipeCardBtnText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.recipeCardBtn}>
            <Text style={style.recipeCardBtnText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

function AddButton() {
  return (
    <TouchableOpacity
      style={style.addBtn}
      onPress={() => {
        Navigate("EditRecipe", -1);
      }}
    >
      <Text style={style.addBtnText}>+</Text>
    </TouchableOpacity>
  );
}

export function MyRecipe(props) {
  const [data, setData] = useState([]);
  const [getData, setGetData] = useState(0);
  if (getData == 0) {
    setGetData(1);
    GetMyRecipes().then((snap) => {
      setData(snap);
    });
  }
  let card = [];
  for (let i = 0; i < data.length; i++) {
    card.push(<RecipeCard data={data[i]} key={i} />);
  }
  for (let i of data) {
  }
  return (
    <View style={style.main}>
      <HeaderBack name={"My Recipes"} back="Main" />
    <ScrollView >
      {card}
      <View style={{height:90}}></View>
      </ScrollView>
      <AddButton />
    </View>
  );
}

const style = StyleSheet.create({
  main: {
    flex: 1,
  },
  addBtn: {
    width: 75,
    height: 75,
    backgroundColor: myRecipeAddBtnColor,
    borderRadius: 100,
    position: "absolute",
    bottom: 0,
    right: 0,
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  addBtnText: {
    color: "#ffffff",
    fontSize: 70,
    marginTop: -10,
  },
  recipeCardMain: {
    padding: 10,
    width: width * 0.9,
    margin: width * 0.05,
    backgroundColor: myRecipeCardBackGroundColor,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
  },
  recipeCardPic: {
    width: width * 0.4,
    height: width * 0.3,
    backgroundColor: "red",
    borderRadius: 20,
  },
  recipeCardDatas: {
    marginHorizontal: 10,
  },
  recipeCardRow: {
    flexDirection: "row",
  },
  recipeCardRow2: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  recipeCardText: {
    minWidth: 70,
    textAlign: "right",
  },
  recipeCardBtn: {
    backgroundColor: myRecipeCardBtnColor,
    padding: 5,
    marginTop: 5,
    minWidth: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
  recipeCardBtnText: {},
});
