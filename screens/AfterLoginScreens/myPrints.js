import { useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { Searchbar, Card, Button, IconButton, Chip } from "react-native-paper";
import { getBookingsController } from "../../controllers/controller";

const MyPrintScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const styles = getStyles({ colors });
  const [bookings, setBookings] = useState([]);

  const formatDateTime = (date) => {
    var isoString = date;
    var date = new Date(isoString);

    var options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    };
    var indianFormat = date.toLocaleString("en-IN", options);
    return indianFormat;
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await getBookingsController();
        setBookings(response.bookings);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      // The screen is focused
      // Call any action
      const response = await getBookingsController();
      setBookings(response.bookings);
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Prints</Text>
      <Searchbar
        style={styles.searchBar}
        theme={{ roundness: 2 }}
        placeholder="Search by filename"
      />
      <ScrollView style={{ flex: 1 }}>
        {bookings &&
          bookings?.length !== 0 &&
          bookings.map((booking, i) => {
            return (
              <Card style={styles.card} key={i}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View style={{ backgroundColor: "red" }}></View>
                  <View>
                    <View>
                      <Text style={{ marginBottom: 6 }}>
                        {booking?.fileName}
                      </Text>
                      <Text>{formatDateTime(booking?.createdAt)}</Text>
                    </View>
                    <Chip
                      style={{ backgroundColor: colors.primary }}
                      textStyle={{ color: colors.text }}
                    >
                      {booking?.isPending ? "Pending" : "Completed"}
                    </Chip>
                  </View>
                </View>
              </Card>
            );
          })}
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
    },
    heading: {
      color: colors.text,
      fontSize: 40,
      fontWeight: "bold",
    },
    card: {
      width: "100%",
      padding: 10,
      marginVertical: 12,
    },
    searchBar: {
      marginTop: "10%",
      marginBottom: 20,
    },
    cardContent: {
      width: "60%",
      padding: "2%",
    },
  });

export default MyPrintScreen;
