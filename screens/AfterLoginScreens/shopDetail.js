import { useRoute, useTheme } from "@react-navigation/native";
import { width } from "deprecated-react-native-prop-types/DeprecatedImagePropType";
import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, TextInput, Card, Chip } from "react-native-paper";
import StarRating from "react-native-star-rating";
import { useSelector } from "react-redux";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { getDistance } from "../../util/helper";

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
  const services = vendor?.vendor?.services;

  console.log("vendor: ", vendor);

  useEffect(() => {
    if (vendor && userLocation) {
      console.log(vendor);
      setDistance(getDistance(userLocation, vendor.vendor.vendor.location));
    }
  }, [vendor, userLocation]);
  const PrintHandler = (service) => {
    navigation.navigate("print-paper", {
      service,
      vendorId: vendor?.vendor?.vendor?._id,
    });
  };

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
        </Card>

        {/* <Card>
          <Text
            style={{
              color: colors.primary,
              fontWeight: "500",
              fontSize: 28,
              marginBottom: 10,
            }}
          >
            Services
          </Text>
        </Card> */}

        <Text
          style={{
            fontSize: 22,
            marginBottom: 20,
            fontWeight: "500",
            color: colors.text,
          }}
        >
          Your options
        </Text>

        {services &&
          Array.isArray(services) &&
          services.map((service) => {
            return (
              <Card style={{ padding: 16, marginBottom: 20 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ marginBottom: 20 }}>
                    <View
                      style={{
                        width: 100,
                        alignItems: "center",
                        marginBottom: 30,
                      }}
                    >
                      <Ionicons
                        name="document"
                        size={28}
                        color={colors.secondary}
                        style={{ marginBottom: 10 }}
                      />
                      <Text style={{ color: colors.text, fontWeight: "500" }}>
                        {service.paperMaterial} paper
                      </Text>
                    </View>

                    <View
                      style={{
                        width: 100,
                        alignItems: "center",
                      }}
                    >
                      <Ionicons
                        name="document"
                        size={28}
                        color={colors.secondary}
                        style={{ marginBottom: 10 }}
                      />
                      <Text style={{ color: colors.text, fontWeight: "500" }}>
                        {service.paperSize} size
                      </Text>
                    </View>
                  </View>

                  <View>
                    <View
                      style={{
                        width: 100,
                        alignItems: "center",
                        marginBottom: 30,
                      }}
                    >
                      <Ionicons
                        name="document"
                        size={28}
                        color={colors.secondary}
                        style={{ marginBottom: 10 }}
                      />
                      <Text style={{ color: colors.text, fontWeight: "500" }}>
                        {service.printType} print
                      </Text>
                    </View>

                    <View
                      style={{
                        width: 100,
                        alignItems: "center",
                      }}
                    >
                      <Ionicons
                        name="document"
                        size={28}
                        color={colors.secondary}
                        style={{ marginBottom: 10 }}
                      />
                      <Text style={{ color: colors.text, fontWeight: "500" }}>
                        ₹{service.perPageCost} per page
                      </Text>
                    </View>
                  </View>
                </View>

                <Button
                  buttonColor={colors.primary}
                  theme={{ roundness: 2 }}
                  textColor={colors.buttonTextColor}
                  onPress={PrintHandler.bind(null, service)}
                >
                  Print
                </Button>
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
      marginBottom: 25,
    },
  });

export default ShopDetailScreen;
