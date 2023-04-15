// import essentials
import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import themes
import { darkTheme, lightTheme } from "../constants/themes";
import { Text } from "react-native-paper";

import { NavigationContainer } from "@react-navigation/native";
import { useColorScheme } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import BottomNavigator from "./bottomNavigationBar";
import LoginNavigator from "./loginRoutes";
import DefaultRoutes from "./homeNavigator";
import HomeNavigator from "./homeNavigator";
import * as SecureStore from "expo-secure-store";
import { validateMyselfController } from "../controllers/beforeLoginControllers/beforeLoginControllers";
import { AuthActions } from "../store/slices/authSlice";

const InitialNavigator = () => {
  const dispatch = useDispatch();

  const handleGetAuthToken = async () => {
    try {
      const token = await SecureStore.getItemAsync("auth_token");
      console.log("Access token retrieved successfully:", token);
      return token;
    } catch (error) {
      console.log("Error retrieving access token:", error);
    }
  };

  React.useEffect(() => {
    (async () => {
      const token = await handleGetAuthToken();
      try {
        const response = await validateMyselfController({ token });
        if (response.success === true) {
          dispatch(AuthActions.Login({ user: response.user, token }));
        }
      } catch (error) {
        console.log("error from useEffect in initialNavigator.js: " + error);
      }
    })();
  }, []);

  const scheme = useColorScheme();
  const isStoreLoggedin = useSelector((state) => state.auth.isLoggedIn);

  return (
    <NavigationContainer theme={scheme === "dark" ? darkTheme : lightTheme}>
      {/* {isStoreLoggedin ? <HomeNavigator /> : <LoginNavigator />} */}
      <Text>Test</Text>
    </NavigationContainer>
  );
};

export default InitialNavigator;
