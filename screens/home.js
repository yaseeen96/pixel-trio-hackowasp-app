import { useTheme } from "@react-navigation/native";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

import { TextInput } from "react-native-paper";

const HomeScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const styles = getStyles({ colors });
  const onButtonPress = async () => {
    await navigation.navigate("Signup");
  };

  return (
    <View style={styles.container}>
      <TextInput />
    </View>
  );
};

const getStyles = ({ colors }) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.background,
    },
    text: {
      color: colors.text,
    },
  });

export default HomeScreen;
