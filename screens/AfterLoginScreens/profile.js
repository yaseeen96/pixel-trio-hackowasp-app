import { useTheme } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useDispatch } from "react-redux";
import { logoutController } from "../../controllers/controller";
import { AuthActions } from "../../store/slices/authSlice";
import Ionicons from "react-native-vector-icons/Ionicons";

const ProfileScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const styles = getStyles({ colors });
  const dispatch = useDispatch();

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
      <Ionicons
        name="person"
        color={colors.primary}
        size={150}
        style={{ alignSelf: "center", marginTop: "10%" }}
      />
      <View style={styles.profileDetailsContainer}>
        <TextInput
          style={styles.textInput}
          label="name"
          value={"Yoo venkatesh"}
          mode="outlined"
          disabled={true}
          underlineStyle={{ borderWidth: 0 }}
        />
        <TextInput
          style={styles.textInput}
          label="email"
          value={"Venkateshpatil193@gmail.com"}
          mode="outlined"
          disabled={true}
        />
      </View>

      <Button
        title="Logout"
        onPress={logoutHandler}
        mode="contained"
        buttonColor={colors.primary}
        textColor={colors.buttonTextColor}
        style={styles.button}
        theme={{ roundness: 2 }}
      >
        Logout
      </Button>
    </View>
  );
};

const getStyles = ({ colors }) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      display: "flex",
      flex: 1,
      height: "100%",
      padding: "10%",
    },
    heading: {
      color: colors.text,
      fontSize: 40,
      alignSelf: "center",
    },
    button: {
      marginVertical: "20%",
    },
    profileDetails: {
      color: colors.text,
      fontSize: 14,
      alignSelf: "flex-start",
    },
    profileDetailsContainer: {
      marginTop: "10%",
      padding: "10%",
      backgroundColor: colors.googleButtonColor,
      borderRadius: 20,
    },
    textInput: {
      width: "100%",
      marginVertical: 10,
      borderRadius: 100,
    },
  });

export default ProfileScreen;
