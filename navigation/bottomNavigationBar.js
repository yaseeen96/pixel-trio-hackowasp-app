import React from "react";

import { useTheme } from "@react-navigation/native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Ionicons from "react-native-vector-icons/Ionicons";

// screens

import HomeScreen from "../screens/AfterLoginScreens/home";
import ProfileScreen from "../screens/AfterLoginScreens/profile";
import MyPrintScreen from "../screens/AfterLoginScreens/myPrints";

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="home"
      screenOptions={({ route }) => ({
        // tabBarItemStyle: { width: 50, borderRadius: 1000 },
        tabBarActiveBackgroundColor: colors.activeTabBarColor,

        tabBarStyle: { backgroundColor: colors.primary },

        tabBarIcon: ({ focussed, color, size }) => {
          let iconName;
          const rn = route.name;

          if (rn === "home") {
            iconName = focussed ? "home" : "home-outline";
          } else if (rn === "myPrints") {
            iconName = focussed ? "print" : "print-outline";
          } else if (rn === "profile") {
            iconName = focussed ? "person" : "person-outline";
          }

          return (
            <Ionicons name={iconName} size={size} color={colors.iconColor} />
          );
        },

        headerShown: false,
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{ tabBarLabel: "" }}
      />
      <Tab.Screen
        name="myPrints"
        component={MyPrintScreen}
        options={{ tabBarLabel: "" }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{ tabBarLabel: "" }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
