import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Alert,
  ToastAndroid,
  Platform,
  Clipboard,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { NavigationStackProp } from "react-navigation-stack";
import globalStyles from "../styles/globalStyles";
import ButtonWithIcon from "../shared/ButtonWithIcon";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import QRCode from "react-native-qrcode-svg";
import { TouchableOpacity } from "react-native-gesture-handler";
import { NavigationActions } from "react-navigation";
import { functions, linksDB } from "../firebaseApp";
const createShortenedURL = functions.httpsCallable("createShortenedURL");

const domainName = "pocketlink.herokuapp.com/";

export default function Finished({ navigation }: FinishedProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const shortenedURL = navigation.getParam("shortenedURL");
  const inputURL = navigation.getParam("inputURL");

  const returnToHome = () => {
    navigation.reset([NavigationActions.navigate({ routeName: "Home" })], 0);
  };

  useEffect(() => {
    (async () => {
      try {
        const snapshot = await linksDB
          .where("shortened", "==", shortenedURL)
          .get();
        if (snapshot.size !== 0)
          throw new Error("shortened URL already exists");

        await createShortenedURL({
          original: inputURL,
          shortened: shortenedURL,
        });

        console.log("Successfully saved shortened URL in database");
        setLoading(() => false);
      } catch (error) {
        console.log(error.message);
        console.log(
          "Failed to save shortened URL in database. Returning to 'Home' screen.",
        );
        returnToHome();
      }
    })();
  }, []);

  const copyToClipboard = () => {
    // COPY TO CLIPBOARD
    Clipboard.setString(`${domainName}${shortenedURL}`);

    // alert user that the URL has been copied
    if (Platform.OS === "android")
      ToastAndroid.show("Copied to clipboard", 1000);
    else
      Alert.alert(
        "Copied to Clipboard",
        "Shortened URL has been copied to your clipboard!",
      );
  };

  const handleOutputPress = () => {
    Alert.alert(
      `Here's your link:`,
      `${domainName}${shortenedURL}\n\nThis redirects to:\n ${inputURL}`,
    );
  };

  if (loading)
    return (
      <View style={{ marginTop: "30%" }}>
        <ActivityIndicator size="large" color="#2699FB" />
        <Text
          style={{ ...globalStyles.text, textAlign: "center", marginTop: 15 }}
        >
          Saving link...
        </Text>
      </View>
    );
  else {
    return (
      <View style={globalStyles.container}>
        <Text
          style={{
            ...globalStyles.text,
            position: "absolute",
            alignSelf: "center",
            top: 50,
            fontSize: 24,
            color: "#2699FB",
          }}
        >
          Here's Your Link:
        </Text>
        <TextInput
          style={{
            ...globalStyles.textInput,
            borderColor: "#aaa",
            fontFamily: "OpenSans-Regular",
            textAlign: "center",
            fontSize: 20,
          }}
          placeholder={domainName + shortenedURL}
          editable={false}
        />
        <View style={{ flexDirection: "row", flex: 1 }}>
          <ButtonWithIcon onPress={copyToClipboard}>
            <MaterialCommunityIcons
              name="content-copy"
              size={30}
              color="#fff"
              style={{ width: "80%", textAlign: "center" }}
            />
          </ButtonWithIcon>
          <ButtonWithIcon
            onPress={handleOutputPress}
            color="#FBD826"
            style={{ marginLeft: 2, width: "20%" }}
          >
            <MaterialCommunityIcons name="magnify" size={30} color="#fff" />
          </ButtonWithIcon>
        </View>

        <View style={{ alignSelf: "center" }}>
          <TouchableOpacity onPress={copyToClipboard}>
            <QRCode value={shortenedURL} size={300} />
          </TouchableOpacity>
          <Text
            style={{
              ...globalStyles.text,
              color: "#2699FB",
              textAlign: "center",
            }}
          >
            ...and a QR Code for good measure
          </Text>
        </View>
        <ButtonWithIcon
          onPress={returnToHome}
          style={{
            position: "absolute",
            bottom: 5,
            width: "100%",
            alignSelf: "center",
          }}
        >
          <MaterialIcons name="add-circle-outline" size={30} color="#fff" />
        </ButtonWithIcon>
      </View>
    );
  }
}

type FinishedProps = { navigation: NavigationStackProp };
