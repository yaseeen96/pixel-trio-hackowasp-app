// todo - routes after logging in should be added over here
// nest routes - defaultRoutes > bottomNavigationRoutes

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomNavigator from "./bottomNavigationBar";

const HomeStack = createNativeStackNavigator();

const HomeNavigator = () => {
  return (
    <HomeStack.Navigator initialRouteName="home-navigator">
      <HomeStack.Screen name="home-navigator" component={BottomNavigator} />
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;
