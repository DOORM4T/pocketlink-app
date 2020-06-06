import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Home from "../screens/Home";
import Customize from "../screens/Customize";
import Finished from "../screens/Finished";
import { createHeader } from "./createHeader";
import { stackNavScreens, navOptionsProps } from "./routes";

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
      headerShown: false,
    }),
  },
};

const HomeStack = createStackNavigator(screens, {
  initialRouteName: "Home",
  mode: "modal",
});

export default createAppContainer(HomeStack);
