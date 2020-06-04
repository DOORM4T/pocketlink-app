import React from "react";
import {
  View,
  Text,
  Alert,
  ToastAndroid,
  Platform,
  Clipboard,
  TextInput,
} from "react-native";
import { NavigationStackProp } from "react-navigation-stack";
import globalStyles from "../styles/globalStyles";
import ButtonWithIcon from "../shared/ButtonWithIcon";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import QRCode from "react-native-qrcode-svg";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Finished({ navigation }: FinishedProps) {
  const shortenedURL = "pocketurl.link/" + navigation.getParam("shortenedURL");
  const copyToClipboard = () => {
    // COPY TO CLIPBOARD
    Clipboard.setString(shortenedURL);

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
      `${shortenedURL}\n\nThis redirects to:\n ${navigation.getParam(
        "inputURL",
      )}`,
    );
  };

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
        placeholder={shortenedURL}
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
    </View>
  );
}

type FinishedProps = { navigation: NavigationStackProp };
