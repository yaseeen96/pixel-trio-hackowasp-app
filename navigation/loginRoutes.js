// import essentials
import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import themes
import { darkTheme, lightTheme } from "../constants/themes";
// import screens
import LoginScreen from "../screens/BeforeLoginScreens/login";
import SignupScreen from "../screens/BeforeLoginScreens/signup";
import BottomNavigator from "./bottomNavigationBar";
import { NavigationContainer } from "@react-navigation/native";
import { useColorScheme } from "react-native";
// initialize HomeStack
const HomeStack = createNativeStackNavigator();

const LoginNavigator = () => {
  const scheme = useColorScheme();
  return (
    <NavigationContainer theme={scheme === "dark" ? darkTheme : lightTheme}>
      <HomeStack.Navigator initialRouteName="Login">
        <HomeStack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "Login" }}
        />
        <HomeStack.Screen
          name="Signup"
          component={SignupScreen}
          options={{ title: "Signup" }}
        />
      </HomeStack.Navigator>
    </NavigationContainer>
  );
};

export default LoginNavigator;
