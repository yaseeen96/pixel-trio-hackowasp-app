import { useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, useColorScheme } from "react-native";
import { useDispatch } from "react-redux";
import Toast from "react-native-toast-message";
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
} from "../../controllers/controller";
import { AuthActions } from "../../store/slices/authSlice";

const logoWhite = require("../../assets/logo-white.png");
const logoDark = require("../../assets/logo-dark.png");
const googleLogo = require("../../assets/googleLogo.png");

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
  const [isLoading, setIsLoading] = useState(false);
  const [emailId, setEmailId] = useState("mdmusaibali@gmail.com");
  const [password, setPassword] = useState("Password11.com");
  const { colors } = useTheme();
  const scheme = useColorScheme();

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
      setIsLoading(true);
      const response = await loginController({ email: emailId, password });
      if (response.success === true) {
        dispatch(
          AuthActions.Login({ email: response.email, token: response.token })
        );
      } else {
        Toast.show({
          type: "error",
          text1: "Uh Oh",
          text2: "Invalid credentials",
        });
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const onSignupButtonPress = () => {
    navigation.navigate("Signup");
  };

  return (
    <View style={styles.container}>
      {scheme === "dark" ? (
        <Image source={logoDark} style={styles.logo} />
      ) : (
        <Image source={logoWhite} style={styles.logo} />
      )}
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
        placeholder="enter your password"
        secureTextEntry={true}
      />
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={onLoginButtonPress}
          theme={{ roundness: 2 }}
          buttonColor={colors.buttonColor}
          loading={isLoading}
          disabled={isLoading}
          textColor={colors.buttonTextColor}
          style={{ borderColor: "black", borderWidth: 1 }}
        >
          Sign in
        </Button>
      </View>

      <View style={styles.signupButtonContainer}>
        <Text style={styles.text}>Don't have an account? </Text>
        <Button
          mode="text"
          textColor={colors.primary}
          onPress={onSignupButtonPress}
          style={styles.button}
        >
          Signup
        </Button>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          icon={() => (
            <Image
              source={googleLogo}
              style={{ width: 20, height: 20, resizeMode: "contain" }}
            />
          )}
          mode="contained"
          onPress={googleLogin}
          theme={{ roundness: 2 }}
          buttonColor={colors.googleButtonColor}
          textColor={colors.text}
          style={{ borderColor: "black", borderWidth: 1, height: 50 }}
          contentStyle={{ justifyContent: "center" }}
          labelStyle={{ justifyContent: "center" }}
        >
          Sign in with google
        </Button>
      </View>
    </View>
  );
};

const getStyles = ({ colors }) =>
  StyleSheet.create({
    container: {
      width: "100%",
      flex: 1,
      backgroundColor: colors.background,
      justifyContent: "flex-start",
      padding: "10%",
      alignItems: "center",
    },
    textInput: {
      width: "100%",
      marginVertical: 10,
      borderRadius: 100,
    },
    signupButtonContainer: {
      height: 75,
      marginVertical: "5%",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    logo: {
      width: "100%",
      resizeMode: "contain",
      height: "25%",
      marginTop: "10%",
      marginBottom: "10%",
    },
    buttonContainer: {
      width: "100%",
    },
    text: {
      color: colors.text,
    },
  });

export default LoginScreen;

//
