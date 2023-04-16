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
import { validateMyselfController } from "../controllers/controller";
import { AuthActions } from "../store/slices/authSlice";
import { getSession } from "../util/helper";

const InitialNavigator = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    (async () => {
      const token = await getSession();
      if (token) {
        dispatch(AuthActions.Login({ token }));
      }
    })();
  }, []);

  const scheme = useColorScheme();
  const isStoreLoggedin = useSelector((state) => state.auth.isLoggedIn);

  return (
    <NavigationContainer theme={scheme === "dark" ? darkTheme : lightTheme}>
      {isStoreLoggedin ? <HomeNavigator /> : <LoginNavigator />}
    </NavigationContainer>
  );
};

export default InitialNavigator;
