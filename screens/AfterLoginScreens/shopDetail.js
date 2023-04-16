import { useRoute, useTheme } from "@react-navigation/native";
import { width } from "deprecated-react-native-prop-types/DeprecatedImagePropType";
import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, TextInput, Card, Chip } from "react-native-paper";
import StarRating from "react-native-star-rating";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in kilometers
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  const roundedDistance = Math.round(distance / 10) * 10; // Round to nearest 10
  return roundedDistance;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

const ShopDetailScreen = ({ navigation }) => {
  const [distance, setDistance] = useState(null);
  const route = useRoute();
  const vendor = route.params.data;
  const { colors } = useTheme();
  const styles = getStyles({ colors });
  const userLocation = useSelector((state) => state.auth.location);
  console.log("my location: " + userLocation.latitude);

  console.log("vendor: ", vendor);

  useEffect(() => {
    if (vendor && userLocation) {
      console.log(vendor);
      setDistance(
        calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          vendor.vendor.vendor.location.latitude,
          vendor.vendor.vendor.location.longitude
        )
      );
    }
  }, [vendor, userLocation]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Card style={styles.card}>
          <Card.Cover source={{ uri: vendor.vendor.vendor.image }} />
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              marginTop: "10%",
            }}
          >
            <View
              style={{
                flexDirection: "column",
                width: "50%",
                justifyContent: "center",
              }}
            >
              <Pressable></Pressable>
              <Card.Title
                title={vendor.vendor.vendor.name}
                titleNumberOfLines={2}
                titleStyle={{
                  color: colors.text,
                  fontWeight: "bold",
                  fontSize: 20,
                }}
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
            </View>
            <View
              style={{
                width: 1,
                height: "100%",
                backgroundColor: colors.text,
                marginLeft: "5%",
              }}
            />
            <View style={styles.location}>
              <Ionicons name="location" color={colors.secondary} size={50} />
              <Text style={styles.heading}>{distance} km</Text>
            </View>
          </View>
          <View style={styles.serviceSection}>
            <Text style={styles.heading}>Services</Text>
            <Text style={styles.labelText}>Print Size</Text>
            <View style={styles.chipRow}>
              <Chip
                style={styles.chip}
                textStyle={{
                  alignSelf: "center",
                  color: colors.buttonTextColor,
                }}
              >
                A4
              </Chip>
              <Chip
                style={styles.chip}
                textStyle={{
                  alignSelf: "center",
                  color: colors.buttonTextColor,
                }}
              >
                A3
              </Chip>
              <Chip
                style={styles.chip}
                textStyle={{
                  alignSelf: "center",
                  color: colors.buttonTextColor,
                }}
              >
                A2
              </Chip>
            </View>
            <Text style={styles.labelText}>Print Material</Text>
            <View style={styles.chipRow}>
              <Chip
                style={[styles.chip, { width: "50%" }]}
                textStyle={{
                  alignSelf: "center",
                  color: colors.buttonTextColor,
                }}
              >
                Standard
              </Chip>
              <Chip
                style={[styles.chip, { width: "50%" }]}
                textStyle={{
                  alignSelf: "center",
                  color: colors.buttonTextColor,
                }}
              >
                Glossy
              </Chip>
            </View>
            <Text style={styles.labelText}>Print Type</Text>
            <View style={styles.chipRow}>
              <Chip
                style={[styles.chip, { width: "50%" }]}
                textStyle={{
                  alignSelf: "center",
                  color: colors.buttonTextColor,
                }}
              >
                Color
              </Chip>
              <Chip
                style={[styles.chip, { width: "50%" }]}
                textStyle={{
                  alignSelf: "center",
                  color: colors.buttonTextColor,
                }}
              >
                Grayscale
              </Chip>
            </View>
          </View>

          {/* <Card.Actions>
  <Button>Print</Button>
</Card.Actions> */}
        </Card>
        <Button
          title="Logout"
          //   onPress={logoutHandler}
          mode="contained"
          buttonColor={colors.primary}
          textColor={colors.buttonTextColor}
          style={styles.button}
          theme={{ roundness: 2 }}
        >
          {" "}
          Book Service
        </Button>
      </ScrollView>
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
      fontSize: 25,
      alignSelf: "center",
    },
    location: {
      width: "50%",
      alignItems: "center",
      justifyContent: "center",
    },
    serviceSection: {
      marginVertical: "5%",
      paddingHorizontal: "8%",
    },
    labelText: {
      color: colors.labelText,
      marginVertical: "2%",
    },
    chipRow: {
      flexDirection: "row",
      marginBottom: "5%",
    },
    chip: {
      marginRight: "5%",
      width: "30%",
      textAlign: "center",
      backgroundColor: colors.primary,
    },
    button: {
      marginVertical: "5%",
    },
    card: {
      //   backgroundColor: colors.background,
      width: "100%",
    },
  });

export default ShopDetailScreen;
