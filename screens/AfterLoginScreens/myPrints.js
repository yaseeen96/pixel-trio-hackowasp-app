import { useTheme } from "@react-navigation/native";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import {
  TextInput,
  Searchbar,
  Card,
  Button,
  IconButton,
} from "react-native-paper";

const MyPrintScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const styles = getStyles({ colors });

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Prints</Text>
      <Searchbar style={styles.searchBar} placeholder="Search by filename" />
      <Card style={styles.card}>
        <View style={{ flexDirection: "row" }}>
          <Card.Cover
            source={{ uri: "item.vendor.image" }}
            style={{ width: "40%", height: "100%" }}
          />
          <View style={styles.cardContent}>
            <Card.Title
              title={"Sample.pdf"}
              titleStyle={{ color: colors.text, fontWeight: "bold" }}
            />

            <Card.Content>
              <Text style={styles.labelText}>16-04-23</Text>
            </Card.Content>

            <Card.Actions>
              <Button>Open</Button>
              <IconButton icon="share" color={colors.primary} size={20} />
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
    },
    heading: {
      color: colors.text,
      fontSize: 40,
      fontWeight: "bold",
    },
    card: {
      width: "100%",
      marginVertical: "10%",
    },
    searchBar: {
      marginTop: "10%",
    },
    cardContent: {
      width: "60%",
      padding: "2%",
    },
  });

export default MyPrintScreen;
