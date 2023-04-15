import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";
import OTPInputs from "../../components/OTPInputs";
import { Button } from "react-native-paper";
import { verifySignupController } from "../../controllers/beforeLoginControllers/beforeLoginControllers";
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
      <Text>Email Verification</Text>
      <Text>
        A four digit email has been sent to your email id. enter the OTP below
      </Text>
      <OTPInputs otp={otp} setOtp={setOtp} />
      <Button
        mode="contained"
        onPress={onSubmitPress}
        theme={{ roundness: 2 }}
        buttonColor={colors.buttonColor}
      >
        Submit
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

export default VerifySignupScreen;
