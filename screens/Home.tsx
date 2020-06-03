import React, { useState } from "react";
import { View, TextInput, Text } from "react-native";
import { NavigationStackProp } from "react-navigation-stack";
import globalStyles from "../styles/globalStyles";
import { Entypo } from "@expo/vector-icons";
import ButtonWithIcon from "../shared/ButtonWithIcon";

export default function Home({ navigation }: HomeProps) {
  const [url, setURL] = useState<string>("");

  const handleTextChange = (text: string) => {
    setURL(() => text);
  };

  return (
    <View style={globalStyles.container}>
      <TextInput
        onChangeText={handleTextChange}
        style={globalStyles.textInput}
        placeholder="enter url"
      />
      <ButtonWithIcon
        onPress={() => {
          navigation.navigate("Customize");
        }}
      >
        <Entypo name="arrow-with-circle-right" size={30} color="#fff" />
      </ButtonWithIcon>
    </View>
  );
}

type HomeProps = { navigation: NavigationStackProp };
