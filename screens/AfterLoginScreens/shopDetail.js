import { useTheme } from "@react-navigation/native";
import { width } from "deprecated-react-native-prop-types/DeprecatedImagePropType";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, TextInput, Card, Chip } from "react-native-paper";
import StarRating from "react-native-star-rating";
import Ionicons from "react-native-vector-icons/Ionicons";

const ShopDetailScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const styles = getStyles({ colors });

  return (
    <View style={styles.container}>
      <ScrollView>
        <Card style={styles.card}>
          <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
          <View
            style={{ flexDirection: "row", width: "100%", marginTop: "10%" }}
          >
            <View
              style={{
                flexDirection: "column",
                width: "50%",
                justifyContent: "center",
              }}
            >
              <Card.Title
                title="Balaji xerox center"
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
              <Text style={styles.heading}>40 km</Text>
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
