import React, { useState } from "react";
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
} from "react-native";
import { NavigationStackProp } from "react-navigation-stack";
import globalStyles from "../styles/globalStyles";
import ButtonWithIcon from "../shared/ButtonWithIcon";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import SwitchWithText from "../shared/SwitchWithText";
const { meaningful } = require("meaningful-string");
import { generate as generateShort } from "shortid";

export default function Customize({ navigation }: CustomizeProps) {
  const [shortenedURL, setShortenedURL] = useState<string>(generateShort());
  const [isTemporary, setIsTemporary] = useState<boolean>(false);
  const [usingMeaningful, setUsingMeaningful] = useState<boolean>(false);
  const [isMonetized, setIsMonetized] = useState<boolean>(false);
  const inputURL = navigation.getParam("inputURL");

  const generateShortURL = () =>
    usingMeaningful ? meaningfulString() : generateShort();

  const handleTextChange = (text: string) => {
    setShortenedURL(() => text);
  };

  const setNewURL = () => {
    setShortenedURL(generateShortURL());
  };

  const handleNavigationButtonPress = () => {
    if (!isValidURL(shortenedURL)) {
      if (Platform.OS === "android") ToastAndroid.show("Invalid URL", 1000);
      else Alert.alert("Invalid URL");
      Keyboard.dismiss();
      return;
    }
    navigation.navigate("Finished", { shortenedURL, inputURL });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={globalStyles.container}>
        {/* <Text>{inputURL}</Text> */}
        <Text style={styles.domainText}>https://pocketurl.com/</Text>
        <View style={styles.customizableURL}>
          <TextInput
            onChangeText={handleTextChange}
            style={{ ...globalStyles.textInput, width: "84%", fontSize: 20 }}
            placeholder="customize "
            value={shortenedURL}
          />
          <ButtonWithIcon
            color="#FBD826"
            onPress={setNewURL}
            style={{ width: "15%", marginLeft: "1%" }}
          >
            <FontAwesome5 name="dice-d20" size={24} color="#fff" />
          </ButtonWithIcon>
        </View>
        <View style={styles.switches}>
          <SwitchWithText
            text="Temporary"
            state={isTemporary}
            setState={setIsTemporary}
            handleChange={() => {
              console.log(`${isTemporary ? "Show" : "Hide"} Temporary Options`);
            }}
          />
          <SwitchWithText
            text="Use Meaningful String"
            state={usingMeaningful}
            setState={setUsingMeaningful}
            handleChange={setNewURL}
          />
          <SwitchWithText
            text="Monetize"
            state={isMonetized}
            setState={setIsMonetized}
            handleChange={() => {
              console.log(isMonetized ? "Monetized" : "Not monetized");
            }}
          />
        </View>
        <ButtonWithIcon onPress={handleNavigationButtonPress}>
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
  if (url.length > 35) {
    const msg = "Custom URL cannot be longer than 35 characters";
    if (Platform.OS === "android") ToastAndroid.show(msg, 1000);
    else Alert.alert(msg);
    return false;
  }

  const pattern = /[^-_A-Za-z\d]/g;
  return !pattern.test(url);
}
