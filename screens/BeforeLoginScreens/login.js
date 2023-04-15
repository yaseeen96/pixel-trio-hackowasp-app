import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { TextInput, Button } from "react-native-paper";
import {
  loginController,
  signupController,
} from "../../controllers/beforeLoginControllers/beforeLoginControllers";
import { AuthActions } from "../../store/slices/authSlice";

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.auth);
  const [emailId, setEmailId] = useState("mdmusaibali@gmail.com");
  const [password, setPassword] = useState("Password11.com");
  const { colors } = useTheme();
  const styles = getStyles({ colors });

  const onLoginButtonPress = async () => {
    try {
      const response = await loginController({ email: emailId, password });
      dispatch(AuthActions.Login(response));
    } catch (error) {
      console.log(error);
    }
  };

  const onSignupButtonPress = () => {
    navigation.navigate("Signup");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Login Screen</Text>
      <TextInput
        style={styles.textInput}
        label="email"
        value={emailId}
        onChangeText={(emailId) => setEmailId(emailId)}
        mode="outlined"
        placeholder="enter your email address"
      />
      <TextInput
        style={styles.textInput}
        label="password"
        value={password}
        onChangeText={(password) => setPassword(password)}
        mode="outlined"
        placeholder="enter your email address"
        secureTextEntry={true}
      />
      <Button
        mode="contained"
        onPress={onLoginButtonPress}
        theme={{ roundness: 2 }}
        buttonColor={colors.buttonColor}
      >
        Sign in
      </Button>
      <View style={styles.signupButtonContainer}>
        <Text>Don't have an account? </Text>
        <Button
          mode="text"
          textColor={colors.primary}
          onPress={onSignupButtonPress}
        >
          Signup
        </Button>
      </View>
    </View>
  );
};

const getStyles = ({ colors }) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      justifyContent: "flex-start",
      padding: "10%",
    },
    textInput: {
      marginVertical: 10,
    },
    signupButtonContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
  });

export default LoginScreen;
