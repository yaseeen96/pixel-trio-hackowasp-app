import { useTheme } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

import { TextInput } from "react-native-paper";

const MyPrintScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const styles = getStyles({ colors });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>My Prints screen</Text>
    </View>
  );
};

const getStyles = ({ colors }) =>
  StyleSheet.create({
    container: {
      display: "flex",
      flex: 1,
      backgroundColor: colors.background,
      justifyContent: "center",
      alignItems: "center",
    },
    text: {
      color: colors.text,
    },
  });

export default MyPrintScreen;
