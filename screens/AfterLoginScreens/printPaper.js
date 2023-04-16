import { View, Text, ScrollView, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import { Card, useNavigation, useTheme } from "@react-navigation/native";
import { Button, TextInput } from "react-native-paper";
import * as DocumentPicker from "expo-document-picker";
import { useDispatch } from "react-redux";
import { bookServiceController } from "../../controllers/controller";

const PrintPaper = ({ route }) => {
  const { colors } = useTheme();
  const [paperSize, setPaperSize] = useState();
  const service = route.params?.service;
  const vendorId = route.params?.vendorId;
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const dispatch = useDispatch();
  const navigator = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const pickDocument = async ({}) => {
    setIsLoading(true);
    if (!from || !to) {
      return Alert.alert("Error", "Please fill from and to ranges");
    }

    if (+to < +from) {
      return Alert.alert("Error", "To cannot be greater than from");
    }

    let result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
    });

    if (result.type === "success") {
      // Use the selected PDF
      console.log(result.uri);
      const fileType = result.uri.slice(result.uri.lastIndexOf(".") + 1);
      const formData = new FormData();
      formData.append("paperMaterial", service?.paperMaterial);
      formData.append("paperSize", service?.paperSize);
      formData.append("printType", service?.printType);
      formData.append("from", from);
      formData.append("to", to);
      formData.append("vendorId", vendorId);
      formData.append("file", {
        uri: result.uri,
        type: `application/pdf`,
        name: "file",
      });

      await bookServiceController({ formData });
      navigator.navigate("myPrints");
    } else {
      // The user cancelled the document picker
    }
    setIsLoading(false);
  };

  return (
    <ScrollView style={{ paddingTop: 40, flex: 1 }}>
      <View style={{ width: "90%", alignSelf: "center" }}>
        <Text style={{ fontSize: 40 }}>Print</Text>
        <Text
          style={{ fontSize: 40, color: colors.primary, fontWeight: "500" }}
        >
          Settings
        </Text>

        <TextInput
          style={styles.textInput}
          label="Print size"
          value={service?.paperSize}
          disabled
          mode="outlined"
        />

        <TextInput
          style={styles.textInput}
          label="Print material"
          value={service?.paperMaterial}
          disabled
          mode="outlined"
        />

        <TextInput
          style={styles.textInput}
          label="Print type"
          value={service?.printType}
          disabled
          mode="outlined"
        />

        <TextInput
          style={styles.textInput}
          label="Range from"
          keyboardType="number-pad"
          value={from}
          mode="outlined"
          onChangeText={(val) => {
            setFrom(val);
          }}
        />

        <TextInput
          style={styles.textInput}
          label="Range to"
          keyboardType="number-pad"
          value={to}
          mode="outlined"
          onChangeText={(val) => {
            setTo(val);
          }}
        />

        <View>
          <Button
            mode="contained"
            textColor={"#000"}
            onPress={pickDocument}
            style={{
              height: 48,
              backgroundColor: colors.primary,
              marginTop: 16,
            }}
            theme={{ roundness: 1 }}
            loading={isLoading}
            disabled={isLoading}
          >
            Add document and submit
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  textInput: {
    width: "100%",
    marginVertical: 10,
    borderRadius: 100,
  },
});

export default PrintPaper;
