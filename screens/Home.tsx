import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ToastAndroid,
} from "react-native";
import { NavigationStackProp } from "react-navigation-stack";
import globalStyles from "../styles/globalStyles";
import { Entypo } from "@expo/vector-icons";
import ButtonWithIcon from "../shared/ButtonWithIcon";
import isURL from "validator/lib/isURL";

export default function Home({ navigation }: HomeProps) {
  const [url, setURL] = useState<string>("");

  const handleTextChange = (text: string) => {
    setURL(() => text);
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={globalStyles.container}>
        <TextInput
          onChangeText={handleTextChange}
          style={globalStyles.textInput}
          placeholder="enter url"
        />
        <ButtonWithIcon
          onPress={() => {
            if (!isURL(url)) {
              if (Platform.OS === "android")
                ToastAndroid.show("Invalid URL", 1000);
              else Alert.alert("Invalid URL");
              Keyboard.dismiss();
              return;
            }
            navigation.navigate("Customize", { inputURL: url });
          }}
        >
          <Entypo name="arrow-with-circle-right" size={30} color="#fff" />
        </ButtonWithIcon>
      </View>
    </TouchableWithoutFeedback>
  );
}

type HomeProps = { navigation: NavigationStackProp };
