import React from "react";
import { View, Alert, ToastAndroid, Platform, Clipboard } from "react-native";
import { NavigationStackProp } from "react-navigation-stack";
import globalStyles from "../styles/globalStyles";
import ButtonWithIcon from "../shared/ButtonWithIcon";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";

export default function Finished({ navigation }: FinishedProps) {
  const handlePress = () => {
    // COPY TO CLIPBOARD
    Clipboard.setString("huzzah");

    // alert user that the URL has been copied
    if (Platform.OS === "android")
      ToastAndroid.show("Copied to clipboard", 1000);
    else
      Alert.alert(
        "Copied to Clipboard",
        "Shortened URL has been copied to your clipboard!",
      );
  };

  return (
    <View style={globalStyles.container}>
      <TextInput
        style={{ ...globalStyles.textInput, borderColor: "#aaa" }}
        placeholder="shortened-url"
        editable={false}
      />
      <ButtonWithIcon onPress={handlePress}>
        <MaterialCommunityIcons name="content-copy" size={30} color="#fff" />
      </ButtonWithIcon>
    </View>
  );
}

type FinishedProps = { navigation: NavigationStackProp };
