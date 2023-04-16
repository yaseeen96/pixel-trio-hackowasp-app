import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";
import OTPInputs from "../../components/OTPInputs";
import { Button } from "react-native-paper";
import { verifySignupController } from "../../controllers/controller";
import { useDispatch } from "react-redux";
import { AuthActions } from "../../store/slices/authSlice";

const VerifySignupScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { email } = route.params;
  const emailId = email;

  const [otp, setOtp] = useState("");
  const { colors } = useTheme();
  const styles = getStyles({ colors });

  const onSubmitPress = async () => {
    try {
      const response = await verifySignupController({ email, otp });
      if (response.success === true) {
        dispatch(AuthActions.Login(response));
        console.log("success");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Email Verification</Text>
      <Text style={styles.subheading}>
        A four digit OTP has been sent to your Email Id. Enter the OTP below.
      </Text>
      <OTPInputs otp={otp} setOtp={setOtp} />
      <Button
        mode="contained"
        onPress={onSubmitPress}
        theme={{ roundness: 2 }}
        buttonColor={colors.buttonColor}
        textColor={colors.buttonTextColor}
        style={styles.button}
        contentStyle={{ height: 50, justifyContent: "center" }}
        labelStyle={{ fontSize: 18, fontWeight: "bold" }}
      >
        Submit
      </Button>
    </View>
  );
};

const getStyles = ({ colors }) =>
  StyleSheet.create({
    container: {
      padding: "10%",
      backgroundColor: colors.background,
      justifyContent: "flex-start",
      alignItems: "center",
      display: "flex",
      flex: 1,
      marginTop: "30%",
    },

    heading: {
      color: colors.text,
      alignSelf: "flex-start",
      fontSize: 30,
      marginTop: 10,
      marginBottom: 5,
      width: "80%",
    },
    subheading: {
      color: colors.secondary,
      alignSelf: "flex-start",
      fontSize: 30,
      fontWeight: "bold",
      width: "80%",
    },
    button: {
      width: "100%",
      height: 50,
      alignContent: "center",
      textAlignVertical: "center",
      fontSize: 20,
      borderColor: "black",
      borderWidth: 1,
    },
  });

export default VerifySignupScreen;
