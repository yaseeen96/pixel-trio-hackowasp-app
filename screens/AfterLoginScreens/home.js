import { useTheme } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

import { TextInput } from "react-native-paper";
import { validateMyselfController } from "../../controllers/beforeLoginControllers/beforeLoginControllers";
import { useDispatch } from "react-redux";
import { AuthActions } from "../../store/slices/authSlice";

const HomeScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const styles = getStyles({ colors });
  const dispatch = useDispatch();
  const onButtonPress = async () => {
    await navigation.navigate("Signup");
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await validateMyselfController();
        if (response.success === true) {
          dispatch(AuthActions.Login({ user: response.user }));
        }
      } catch (error) {
        dispatch(AuthActions.Logout());
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}> Home Screen</Text>
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

export default HomeScreen;
