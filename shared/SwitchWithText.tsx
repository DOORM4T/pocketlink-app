import React, { useEffect } from "react";
import { View, Text, Switch } from "react-native";
import globalStyles from "../styles/globalStyles";

export default function SwitchWithText({
  text,
  state,
  setState,
  handleChange = undefined,
}: props) {
  useEffect(() => {
    // run custom handleChange function, if provided
    if (handleChange) handleChange();
  }, [state]);

  const handleSwitchChange = (value: boolean) => {
    setState(() => value);
  };

  return (
    <View style={globalStyles.switch}>
      <Text style={{ fontSize: 16, fontFamily: "OpenSans-Regular" }}>
        {text}
      </Text>
      <Switch
        trackColor={{ false: "#767577", true: "#2699FB" }}
        thumbColor={state ? "#fff" : "#f4f3f4"}
        ios_backgroundColor="#f4f3f4"
        onValueChange={handleSwitchChange}
        value={state}
      />
    </View>
  );
}

type props = {
  text: string;
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  handleChange?: Function;
};
