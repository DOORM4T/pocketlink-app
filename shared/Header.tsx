import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { StackNavigationProp } from "react-navigation-stack/lib/typescript/src/vendor/types";
import { NavigationRoute, NavigationParams } from "react-navigation";
import { SimpleLineIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Header({ title, navigation }: HeaderProps) {
  return (
    <View style={styles.header}>
      {navigation.isFirstRouteInParent() && (
        <MaterialCommunityIcons name="menu" size={30} color="#2699FB" />
      )}
      <Text style={styles.headerText}>{title || "No Title"}</Text>
      <SimpleLineIcons name="options-vertical" size={24} color="#2699FB" />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    color: "#2699FB",
    fontWeight: "bold",
    fontSize: 18,
    fontFamily: "OpenSans-Bold",
  },
});

type HeaderProps = {
  title: string;
  navigation: StackNavigationProp<
    NavigationRoute<NavigationParams>,
    NavigationParams
  >;
};
