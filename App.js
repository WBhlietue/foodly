import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Header } from "./src/components/Header";
import { Navigator } from "./src/components/Nagivator";
import { MainScreen } from "./src/screens/MainScreen";
import { More } from "./src/screens/More";
import { Recipe } from "./src/screens/Recipe";

const stack = createNativeStackNavigator();

var nav = null;

export function Navigate(name, option={}){
  nav.navigate(name, option);
}

function Main({navigation}){
  nav = navigation
  const [selected, setSelected] = useState(2);
  return (
    <View style={styles.container}>
      <Header page={selected} />
      <MainScreen page={selected}  />
      <Navigator select={[selected, setSelected]} />
    </View>
  );
}

export default function App() {
  return(
    <NavigationContainer>
      <stack.Navigator screenOptions={{headerShown:false}}>
        <stack.Screen name="Main" component={Main}/>
        <stack.Screen name="More" component={More}/>
        <stack.Screen name="Recipe" component={Recipe}/>
      </stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
});
