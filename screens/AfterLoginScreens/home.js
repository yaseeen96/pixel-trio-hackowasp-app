import { useTheme } from "@react-navigation/native";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import { Searchbar } from "react-native-paper";
import { validateMyselfController } from "../../controllers/beforeLoginControllers/beforeLoginControllers";
import { useDispatch, useSelector } from "react-redux";
import { AuthActions } from "../../store/slices/authSlice";
import { Avatar, Button, Card } from "react-native-paper";

const HomeScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const styles = getStyles({ colors });
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    (async () => {
      try {
        const response = await validateMyselfController();
        if (response.success === true) {
          dispatch(AuthActions.Login({ user: response.user }));
        }
      } catch (error) {
        dispatch(AuthActions.Logout());
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Hello,</Text>
      <Text style={styles.subheading}>Venkatesh Patil</Text>
      <Searchbar style={styles.searchBar} placeholder="Search nearby shops" />

      <Card style={styles.card}>
        <View style={{ flexDirection: "row" }}>
          <Card.Cover
            source={{ uri: "https://picsum.photos/700" }}
            style={{ width: "40%" }}
          />
          <View style={styles.cardContent}>
            <Card.Title title="Balaji xerox center" />

            <Card.Content>
              <Text variant="titleLarge">Card title</Text>
              <Text variant="bodyMedium">Card content</Text>
            </Card.Content>

            <Card.Actions>
              <Button>Print</Button>
            </Card.Actions>
          </View>
        </View>
      </Card>
    </View>
  );
};

const getStyles = ({ colors }) =>
  StyleSheet.create({
    container: {
      display: "flex",
      flex: 1,
      backgroundColor: colors.background,
      padding: "8%",

      alignItems: "center",
    },
    text: {
      color: colors.text,
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
    searchBar: {
      marginTop: "10%",
    },

    card: {
      width: "100%",
      marginVertical: "10%",
    },

    cardContent: {
      width: "60%",
    },
  });

export default HomeScreen;
