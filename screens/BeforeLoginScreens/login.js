import { useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import * as SecureStore from "expo-secure-store";

// google signin integration
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { makeRedirectUri, ResponseType } from "expo-auth-session";

import { TextInput, Button } from "react-native-paper";
import {
  loginController,
  signInWithGoogleController,
  signupController,
  validateMyselfController,
} from "../../controllers/beforeLoginControllers/beforeLoginControllers";
import { AuthActions } from "../../store/slices/authSlice";

// store token in secure store
// async function saveAuthToken(value) {
//   try {
//     await SecureStore.setItemAsync("auth_token", value);
//     console.log("Token saved successfully");
//   } catch (error) {
//     console.log("Error saving auth token:", error);
//   }
// }

WebBrowser.maybeCompleteAuthSession();
const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [emailId, setEmailId] = useState("mdmusaibali@gmail.com");
  const [password, setPassword] = useState("Password11.com");
  const { colors } = useTheme();
  const styles = getStyles({ colors });

  const [request, response, promptAsync] = Google.useAuthRequest(
    {
      androidClientId: process.env.GOOGLE_CLIENT_ID,
      expoClientId: process.env.EXPO_CLIENT_ID,
      responseType: ResponseType.Token,
      redirectUri: makeRedirectUri({ useProxy: true }),
    },
    { useProxy: true }
  );

  const getGoogleLoginToken = async () => {
    const authResponse = await promptAsync({ useProxy: true });
    if (authResponse?.type === "success") {
      // dispatch(
      //   googleSignIn({ authToken: authResponse.authentication.accessToken })
      // );

      const token = authResponse.authentication.accessToken;
      return token;
    }
  };

  const googleLogin = async () => {
    const token = await getGoogleLoginToken();
    try {
      const response = await signInWithGoogleController({ token });
      if (response.success === true) {
        dispatch(AuthActions.Login(response));
      } else {
        // todo - return notification to create an account first
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onLoginButtonPress = async () => {
    try {
      const response = await loginController({ email: emailId, password });
      dispatch(
        AuthActions.Login({ email: response.email, token: response.token })
      );
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
        loading={true}
        disabled={true}
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
      <Button
        icon="google"
        mode="contained"
        onPress={googleLogin}
        theme={{ roundness: 2 }}
        buttonColor={colors.buttonColor}
      >
        {" "}
        Sign in with google
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
    signupButtonContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
  });

export default LoginScreen;

//
