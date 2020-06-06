import {
  NavigationRouteConfigMap,
  NavigationRoute,
  NavigationParams,
  NavigationScreenConfigProps,
} from "react-navigation";
import {
  StackNavigationOptions,
  StackNavigationProp,
} from "react-navigation-stack/lib/typescript/src/vendor/types";
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

type screensType = NavigationRouteConfigMap<
  NavigationDrawerOptions,
  NavigationDrawerProp<NavigationRoute<NavigationParams>, any>,
  unknown
>;
