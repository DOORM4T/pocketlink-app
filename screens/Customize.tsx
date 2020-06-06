import React, { useState, useEffect, useMemo } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ToastAndroid,
  Alert,
  ActivityIndicator,
} from "react-native";
import { NavigationStackProp } from "react-navigation-stack";
import globalStyles from "../styles/globalStyles";
import ButtonWithIcon from "../shared/ButtonWithIcon";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import SwitchWithText from "../shared/SwitchWithText";
const { meaningful } = require("meaningful-string");
import { generate as generateShort } from "shortid";
import { linksDB } from "../firebaseApp";

export default function Customize({ navigation }: CustomizeProps) {
  const [shortenedURL, setShortenedURL] = useState<string>("");
  const [isTaken, setIsTaken] = useState<boolean>(false);
  // const [isTemporary, setIsTemporary] = useState<boolean>(false);
  const [usingMeaningful, setUsingMeaningful] = useState<boolean>(false);
  // const [isMonetized, setIsMonetized] = useState<boolean>(false);
  const inputURL = navigation.getParam("inputURL");
  const [isValidating, setIsValidating] = useState<boolean>(false);

  useEffect(() => {
    console.log("rerendered");
    setShortenedURL(() => generateShort());
  }, []);

  const generateShortURL = () =>
    usingMeaningful ? meaningfulString() : generateShort();

  const handleTextChange = (text: string) => {
    setIsTaken(() => false); // User changes the URL, so URL might not be taken (until it is checked)
    setShortenedURL(() => text);
  };

  const setNewRandomURL = useMemo(() => {
    console.log("set new url");
    setIsTaken(() => false);
    setShortenedURL(generateShortURL());
  }, [usingMeaningful]); // runs ONLY when usingMeaningful changes

  /**
   * @desc navigate to next page if shortened link is valid
   */
  const navigateIfValid = async () => {
    // Invalid if any illegal characters
    setIsValidating(() => true);
    if (!isValidURL(shortenedURL)) {
      errorAlert("Invalid URL");
      setIsValidating(() => false);
      return;
    }

    // Check if shortened URL is already taken
    if (isTaken) {
      // User didn't change the URL after they got the alert
      errorAlert("That shortened URL ID is already taken.");
      console.log("user did not change URL though it is already taken");
      setIsValidating(() => false);
      return;
    }
    const snapshot = await linksDB.where("shortened", "==", shortenedURL).get();

    if (snapshot.size !== 0) {
      errorAlert("That shortened URL ID is already taken.");
      setIsTaken(() => true);
      setIsValidating(() => false);
      return;
    }

    // URL is Valid. Navigate to 'Finished' screen
    navigation.navigate("Finished", { shortenedURL, inputURL });
    setIsValidating(() => false);
  };

  if (isValidating)
    return (
      <View style={{ marginTop: "25%" }}>
        <ActivityIndicator size="large" color="#2699FB" />
        <Text
          style={{
            ...globalStyles.text,
            textAlign: "center",
            marginTop: "2%",
          }}
        >
          Validating link...
        </Text>
      </View>
    );
  else
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={globalStyles.container}>
          {/* <Text>{inputURL}</Text> */}
          <Text style={styles.domainText}>
            https://pocketlink.herokuapp.com/
          </Text>
          <View style={styles.customizableURL}>
            <TextInput
              onChangeText={handleTextChange}
              style={{ ...globalStyles.textInput, width: "84%", fontSize: 20 }}
              placeholder="customize "
              value={shortenedURL}
            />
            <ButtonWithIcon
              color="#FBD826"
              onPress={() => {
                setShortenedURL(() => generateShortURL());
              }}
              style={{ width: "15%", marginLeft: "1%" }}
            >
              <FontAwesome5 name="dice-d20" size={24} color="#fff" />
            </ButtonWithIcon>
          </View>
          <View style={styles.switches}>
            {/* <SwitchWithText
              text="Temporary"
              state={isTemporary}
              setState={setIsTemporary}
              handleChange={() => {
                console.log(
                  `${isTemporary ? "Show" : "Hide"} Temporary Options`,
                );
              }}
            /> */}
            <SwitchWithText
              text="Use Meaningful String"
              state={usingMeaningful}
              setState={setUsingMeaningful}
              handleChange={setNewRandomURL}
            />
            {/* <SwitchWithText
              text="Monetize"
              state={isMonetized}
              setState={setIsMonetized}
              handleChange={() => {
                console.log(isMonetized ? "Monetized" : "Not monetized");
              }}
            /> */}
          </View>
          <ButtonWithIcon onPress={navigateIfValid}>
            <AntDesign name="checkcircleo" size={30} color="#fff" />
          </ButtonWithIcon>
        </View>
      </TouchableWithoutFeedback>
    );
}

type CustomizeProps = { navigation: NavigationStackProp };

const styles = StyleSheet.create({
  customizableURL: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  domainText: {
    fontSize: 16,
    position: "absolute",
    top: 85,
    left: 25,
    fontFamily: "OpenSans-Regular",
    color: "#999",
  },
  switches: {
    marginBottom: 12,
  },
});

function meaningfulString() {
  const strings = meaningful().toLowerCase().split("-");
  const temp = strings[0];
  strings[0] = strings[1];
  strings[1] = temp;
  return strings.join("-");
}

function isValidURL(url: string) {
  if (url.length === 0) {
    errorAlert("Custom URL ID must be longer than 0 characters");
    return;
  }
  if (url.length > 35) {
    errorAlert("Custom URL ID cannot be longer than 35 characters");
    return;
  }

  const pattern = /[^-_A-Za-z\d]/g;
  return !pattern.test(url);
}

function errorAlert(message: string) {
  Keyboard.dismiss();
  if (Platform.OS === "android") ToastAndroid.show(message, 1000);
  else Alert.alert(message);
}
