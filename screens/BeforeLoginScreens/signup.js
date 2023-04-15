import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { signupController } from "../../controllers/beforeLoginControllers/beforeLoginControllers";

const SignupScreen = ({ navigation }) => {
  // initializing theme colors
  const { colors } = useTheme();

  const styles = getStyles({ colors });

  const [fullName, setFullName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const onSignupButtonPress = async () => {
    if (password === password2) {
      try {
        const response = await signupController({
          email: emailId,
          password,
          fullName,
        });
        if (response.success === true) {
          navigation.navigate("verifySignup", { email: emailId });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text>Signup, Create your account</Text>
      <TextInput
        style={styles.textInput}
        label="full name"
        value={fullName}
        onChangeText={(fullName) => setFullName(fullName)}
        mode="outlined"
        placeholder="enter your full name"
      />
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
      <TextInput
        style={styles.textInput}
        label="re enter password"
        value={password2}
        onChangeText={(password2) => setPassword2(password2)}
        mode="outlined"
        placeholder="re enter your password"
        secureTextEntry={true}
      />
      <Button
        mode="contained"
        onPress={onSignupButtonPress}
        theme={{ roundness: 2 }}
        buttonColor={colors.buttonColor}
      >
        Sign up
      </Button>
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
