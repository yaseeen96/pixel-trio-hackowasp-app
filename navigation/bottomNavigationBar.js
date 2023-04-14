import React from "react";

import { useTheme } from "@react-navigation/native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Ionicons from "react-native-vector-icons/Ionicons";

// screens

import HomeScreen from "../screens/home";
import ProfileScreen from "../screens/profile";

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focussed, color, size }) => {
          let iconName;
          const rn = route.name;

          if (rn === "home") {
            iconName = focussed ? "home" : "home-outline";
          } else if (rn === "profile") {
            iconName = focussed ? "settings" : "settings-outline";
          }

          return (
            <Ionicons name={iconName} size={size} color={colors.iconColor} />
          );
        },
      })}
    >
      <Tab.Screen name="home" component={HomeScreen} />
      <Tab.Screen name="profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
