import { useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { Searchbar } from "react-native-paper";
import { validateMyselfController } from "../../controllers/beforeLoginControllers/beforeLoginControllers";
import { useDispatch, useSelector } from "react-redux";
import { AuthActions } from "../../store/slices/authSlice";
import { Avatar, Button, Card } from "react-native-paper";
import StarRating from "react-native-star-rating";

const HomeScreen = ({ navigation }) => {
  const [rating, setRating] = useState(0);
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

  const handleOnPrintPress = () => {
    navigation.navigate("shop-details");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Hello,</Text>
      <Text style={styles.subheading}>Venkatesh Patil</Text>
      <Searchbar style={styles.searchBar} placeholder="Search nearby shops" />

      <Card style={styles.card}>
        <View style={{ flexDirection: "row" }}>
          <Card.Cover
            source={{ uri: "https://picsum.photos/700" }}
            style={{ width: "40%", height: "100%" }}
          />
          <View style={styles.cardContent}>
            <Card.Title
              title="Balaji xerox center"
              titleStyle={{ color: colors.text, fontWeight: "bold" }}
            />

            <Card.Content>
              <StarRating
                disabled={true}
                maxStars={5}
                rating={2.5}
                fullStar={"star"}
                fullStarColor={colors.secondary}
                halfStarColor={colors.secondary}
                starSize={25}
              />
            </Card.Content>

            <Card.Actions>
              <Button onPress={handleOnPrintPress}>Print</Button>
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
      padding: "2%",
    },
  });

export default HomeScreen;
