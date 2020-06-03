import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { navOptionsProps } from "../routes/HomeStack";
import { StackNavigationProp } from "react-navigation-stack/lib/typescript/src/vendor/types";
import { NavigationRoute, NavigationParams } from "react-navigation";

export default function Header({ title, navigation }: HeaderProps) {
  return (
    <View>
      <Text>{title || "No Title"}</Text>
    </View>
  );
}

type HeaderProps = {
  title: string;
  navigation: StackNavigationProp<
    NavigationRoute<NavigationParams>,
    NavigationParams
  >;
};
