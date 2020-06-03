import React from "react";
import {
  createAppContainer,
  NavigationRouteConfigMap,
  NavigationRoute,
  NavigationParams,
  CreateNavigatorConfig,
  NavigationScreenConfigProps,
} from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import {
  StackNavigationOptions,
  StackNavigationProp,
} from "react-navigation-stack/lib/typescript/src/vendor/types";

import Header from "../shared/Header";
import Home from "../screens/Home";
import Customize from "../screens/Customize";
import Finished from "../screens/Finished";

// screens for stack navigation
const screens: stackNavScreens = {
  Home: {
    screen: Home,
    navigationOptions: ({ navigation }: navOptionsProps) => ({
      headerTitle: () => createHeader("SHORTEN LINK", navigation),
    }),
  },
  Customize: {
    screen: Customize,
    navigationOptions: ({ navigation }: navOptionsProps) => ({
      headerTitle: () => createHeader("CUSTOMIZE", navigation),
    }),
  },
  Finished: {
    screen: Finished,
    navigationOptions: ({ navigation }: navOptionsProps) => ({
      headerTitle: () => createHeader("FINISHED", navigation),
    }),
  },
};

// create & export navigator
const HomeStack = createStackNavigator(screens);
export default createAppContainer(HomeStack);

//
// HELPERS
//

/**
 * @description create a navigation Header with a custom title
 * @param title title of header
 * @param navigation prop for stack navigation
 */
function createHeader(title: string, navigation: navigationProp) {
  return <Header title={title} navigation={navigation} />;
}

//
// TYPE ALIASES
//
export type stackNavScreens = NavigationRouteConfigMap<
  StackNavigationOptions,
  StackNavigationProp<NavigationRoute<NavigationParams>, NavigationParams>,
  unknown
>;

export type navOptionsProps = NavigationScreenConfigProps<
  StackNavigationProp<NavigationRoute<NavigationParams>, NavigationParams>,
  unknown
>;

export type navigationProp = StackNavigationProp<
  NavigationRoute<NavigationParams>,
  NavigationParams
>;
