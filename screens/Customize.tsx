import React, { useState } from "react";
import { View, Text, Switch } from "react-native";
import { NavigationStackProp } from "react-navigation-stack";
import globalStyles from "../styles/globalStyles";
import ButtonWithIcon from "../shared/ButtonWithIcon";
import { Entypo } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";

export default function Customize({ navigation }: CustomizeProps) {
  const [url, setURL] = useState<string>("");
  const [isPermanent, setIsPermanent] = useState<boolean>(false);

  const handleTextChange = (text: string) => {
    setURL(() => text);
  };

  const handleSwitchChange = (value: boolean) => {
    setIsPermanent(() => value);
  };

  return (
    <View style={globalStyles.container}>
      <TextInput
        onChangeText={handleTextChange}
        style={globalStyles.textInput}
        placeholder="customize name"
      />
      <ButtonWithIcon
        onPress={() => {
          navigation.navigate("Finished");
        }}
      >
        <Entypo name="arrow-with-circle-right" size={30} color="#fff" />
      </ButtonWithIcon>
      <View style={globalStyles.switch}>
        <Text>Permanent</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#2699FB" }}
          thumbColor={isPermanent ? "#2699FB" : "#f4f3f4"}
          ios_backgroundColor="#f4f3f4"
          onValueChange={handleSwitchChange}
          value={isPermanent}
        />
      </View>
    </View>
  );
}

type CustomizeProps = { navigation: NavigationStackProp };
