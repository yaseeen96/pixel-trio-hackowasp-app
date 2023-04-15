// import essentials
import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import themes
import { darkTheme, lightTheme } from "../constants/themes";
// import screens
import LoginScreen from "../screens/BeforeLoginScreens/login";
import SignupScreen from "../screens/BeforeLoginScreens/signup";
import BottomNavigator from "./bottomNavigationBar";
import VerifySignupScreen from "../screens/BeforeLoginScreens/verifySignup";
import { NavigationContainer } from "@react-navigation/native";
import { useColorScheme } from "react-native";
// initialize LoginStack
const LoginStack = createNativeStackNavigator();

const LoginNavigator = () => {
  return (
    <LoginStack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <LoginStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: "Login" }}
      />
      <LoginStack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ title: "Signup" }}
      />
      <LoginStack.Screen
        name="verifySignup"
        component={VerifySignupScreen}
        options={{ title: "verify signup" }}
      />
    </LoginStack.Navigator>
  );
};

export default LoginNavigator;
