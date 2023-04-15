// import essentials
import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import themes
import { darkTheme, lightTheme } from "../constants/themes";

import { NavigationContainer } from "@react-navigation/native";
import { useColorScheme } from "react-native";
import { useSelector } from "react-redux";
import BottomNavigator from "./bottomNavigationBar";
import LoginNavigator from "./loginRoutes";
import DefaultRoutes from "./homeNavigator";
import HomeNavigator from "./homeNavigator";

const InitialNavigator = () => {
  const scheme = useColorScheme();
  const isLoggedin = useSelector((state) => state.auth.isLoggedIn);
  console.log(isLoggedin);
  return (
    <NavigationContainer theme={scheme === "dark" ? darkTheme : lightTheme}>
      {isLoggedin ? <HomeNavigator /> : <LoginNavigator />}
    </NavigationContainer>
  );
};

export default InitialNavigator;
