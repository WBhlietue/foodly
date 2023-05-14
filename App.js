import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { GetIsLogin, SetIsLogin } from "./src/back/Main";
import { Header } from "./src/components/Header";
import { Navigator } from "./src/components/Nagivator";
import { EditRecipe } from "./src/screens/EditRecipe";
import { FilterScene } from "./src/screens/Filter";
import { Login } from "./src/screens/Login";
import { MainScreen } from "./src/screens/MainScreen";
import { More } from "./src/screens/More";
import { MyRecipe } from "./src/screens/MyRecipe";
import { Recipe } from "./src/screens/Recipe";
import { Register } from "./src/screens/Register";

const stack = createNativeStackNavigator();

var nav = null;

export function Navigate(name, option = {}) {
  nav.navigate(name, option);
}

function Main(props) {
  nav = props.navigation;
  const [selected, setSelected] = useState(2);
  return (
    <View style={styles.container}>
      <Header page={selected} />
      <MainScreen page={selected} setIsLogin={props.route.params.setIsLogin}/>
      <Navigator select={[selected, setSelected]} />
    </View>
  );
}

export default function App() {
  const [isLogin, setIsLogin] = useState(0);

  if (isLogin == 0) {
    return (
      <NavigationContainer>
        <stack.Navigator screenOptions={{ headerShown: false }}>
          <stack.Screen
            name="Login"
            component={Login}
            initialParams={{ setIsLogin: setIsLogin }}
          />
          <stack.Screen
            name="Register"
            component={Register}
            initialParams={{ setIsLogin: setIsLogin }}
          />
        </stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <stack.Navigator screenOptions={{ headerShown: false }}>
          <stack.Screen
            name="Main"
            component={Main}
            initialParams={{ setIsLogin: setIsLogin }}
          />
          <stack.Screen name="More" component={More} />
          <stack.Screen name="Recipe" component={Recipe} />
          <stack.Screen name="MyRecipe" component={MyRecipe} />
          <stack.Screen name="EditRecipe" component={EditRecipe} />
          <stack.Screen name="Filter" component={FilterScene} />
        </stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
});
