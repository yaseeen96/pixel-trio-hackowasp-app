import { useTheme } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const SignupScreen = () => {
  // initializing theme colors
  const { colors } = useTheme();

  const styles = getStyles({ colors });
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Signup Screen</Text>
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

export default SignupScreen;
