import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";

export default function ButtonWithIcon({
  onPress,
  onLongPress,
  children,
  color = "#2699FB",
  style,
}: props) {
  return (
    <TouchableOpacity
      style={{
        ...styles.button,
        backgroundColor: color,
        ...style,
      }}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      {children}
    </TouchableOpacity>
  );
}

type props = {
  onPress?: (event: GestureResponderEvent) => void | Function;
  onLongPress?: (event: GestureResponderEvent) => void | Function;
  children?: React.ReactNode;
  color?: string;
  style?: Object;
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    flexDirection: "row",
    color: "white",
    height: 42,
    justifyContent: "center",
    alignItems: "center",
  },
});
