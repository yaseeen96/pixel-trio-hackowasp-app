import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { TextInput, Button } from "react-native-paper";
import { loginController } from "../../controllers/beforeLoginControllers/beforeLoginControllers";
import { AuthActions } from "../../store/slices/authSlice";

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.auth);
  const [emailId, setEmailId] = useState("mdmusaibali@gmail.com");
  const [password, setPassword] = useState("Password11.com");
  console.log("state: " + state);
  const { colors } = useTheme();
  const styles = getStyles({ colors });

  const onButtonPress = async () => {
    try {
      const response = await loginController({ email: emailId, password });
      dispatch(AuthActions.Login(response));
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
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
      />
      <Button
        mode="contained"
        onPress={onButtonPress}
        theme={{ roundness: 2 }}
        buttonColor={colors.buttonColor}
      >
        Signin
      </Button>
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
  });

export default LoginScreen;
