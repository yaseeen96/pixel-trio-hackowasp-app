import { useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { Searchbar } from "react-native-paper";
import {
  getVendorsController,
  validateMyselfController,
} from "../../controllers/controller";
import { useDispatch, useSelector } from "react-redux";
import { AuthActions } from "../../store/slices/authSlice";
import { Avatar, Button, Card } from "react-native-paper";
import StarRating from "react-native-star-rating";
import * as Location from "expo-location";

function getRandomNumber() {
  const min = 1; // minimum value
  const max = 10; // maximum value (exclusive)
  const randomInt = Math.floor(Math.random() * (max - min)) + min; // generate a random integer between 1 and 10 (exclusive)
  const randomNumber = randomInt / 2; // divide the random integer by 2 to get a random number between 0.5 and 5 in increments of 0.5
  return randomNumber;
}

const HomeScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const styles = getStyles({ colors });
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [isLoading, setIsLoading] = useState(false);
  const vendors = useSelector((state) => state.auth.vendors);

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
    fetchLocation();
    fetchVendors();
  }, []);

  const handleOnPrintPress = ({ vendor }) => {
    navigation.navigate("shop-details", { data: { vendor } });
  };

  const fetchLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }
    let {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({});
    dispatch(AuthActions.FillLocation({ latitude, longitude }));
  };

  const fetchVendors = async () => {
    try {
      setIsLoading(true);
      const response = await getVendorsController();
      dispatch(AuthActions.FillVendors(response.vendors));
    } catch (error) {
      console.log("error from vendor: " + error);
    }
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Hello,</Text>
      <Text style={styles.subheading}>{user?.fullName}</Text>
      <Searchbar
        theme={{ roundness: 2 }}
        style={styles.searchBar}
        placeholder="Search nearby shops"
      />

      <ScrollView>
        {vendors.map((item, index) => (
          <Card key={index} style={styles.card}>
            <View style={{ flexDirection: "row" }}>
              <Card.Cover
                source={{ uri: item.vendor.image }}
                style={{ width: "40%", height: "100%" }}
              />
              <View style={styles.cardContent}>
                <Card.Title
                  title={item.vendor.name}
                  titleStyle={{ color: colors.text, fontWeight: "bold" }}
                />

                <Card.Content>
                  <StarRating
                    disabled={true}
                    maxStars={5}
                    rating={getRandomNumber()}
                    fullStar={"star"}
                    fullStarColor={colors.secondary}
                    halfStarColor={colors.secondary}
                    starSize={25}
                  />
                </Card.Content>

                <Card.Actions>
                  <Button
                    onPress={() => {
                      handleOnPrintPress({ vendor: item });
                    }}
                  >
                    Print
                  </Button>
                </Card.Actions>
              </View>
            </View>
          </Card>
        ))}
      </ScrollView>
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
