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
      <Text style={styles.heading}>Signup</Text>
      <Text style={styles.subheading}>Create your account :)</Text>

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
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={onSignupButtonPress}
          theme={{ roundness: 2 }}
          buttonColor={colors.buttonColor}
          textColor={colors.buttonTextColor}
        >
          Sign up
        </Button>
      </View>
    </View>
  );
};

const getStyles = ({ colors }) =>
  StyleSheet.create({
    container: {
      padding: "10%",
      backgroundColor: colors.background,
      height: "100%",
      display: "flex",
      flex: 1,
    },

    heading: {
      color: colors.text,
      fontSize: 50,
      marginTop: 10,
      marginVertical: 10,
    },
    subheading: {
      color: colors.text,
      fontSize: 20,
      marginVertical: 10,
    },
    textInput: {
      width: "100%",
      marginVertical: 10,
      borderRadius: 100,
    },

    buttonContainer: {
      width: "100%",
      marginVertical: "4%",
    },
  });

export default SignupScreen;
