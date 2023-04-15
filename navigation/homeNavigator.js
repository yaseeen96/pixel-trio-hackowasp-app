// todo - routes after logging in should be added over here
// nest routes - defaultRoutes > bottomNavigationRoutes

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomNavigator from "./bottomNavigationBar";
import ShopDetailScreen from "../screens/AfterLoginScreens/shopDetail";

const HomeStack = createNativeStackNavigator();

const HomeNavigator = () => {
  return (
    <HomeStack.Navigator
      initialRouteName="home-navigator"
      screenOptions={{ headerShown: false }}
    >
      <HomeStack.Screen name="home-navigator" component={BottomNavigator} />
      <HomeStack.Screen name="shop-details" component={ShopDetailScreen} />
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;
