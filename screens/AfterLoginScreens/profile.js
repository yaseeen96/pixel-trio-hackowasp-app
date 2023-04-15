import { useTheme } from "@react-navigation/native";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { logoutController } from "../../controllers/beforeLoginControllers/beforeLoginControllers";
import { AuthActions } from "../../store/slices/authSlice";

const ProfileScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const styles = getStyles({ colors });
  const dispatch = useDispatch();
  const onButtonPress = () => {
    navigation.navigate("Signup");
  };

  const logoutHandler = async () => {
    try {
      await logoutController();
      dispatch(AuthActions.Logout());
    } catch (error) {
      dispatch(AuthActions.Logout());
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile Screen</Text>
      <Button title="Logout" onPress={logoutHandler} />
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

export default ProfileScreen;
