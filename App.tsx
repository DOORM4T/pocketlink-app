import React, { useState } from "react";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import HomeStack from "./routes/HomeStack";
console.disableYellowBox = true;

const getFonts = () =>
  Font.loadAsync({
    "OpenSans-Regular": require("./assets/fonts/Open_Sans/OpenSans-Regular.ttf"),
    "OpenSans-Bold": require("./assets/fonts/Open_Sans/OpenSans-Bold.ttf"),
    "OpenSans-Light": require("./assets/fonts/Open_Sans/OpenSans-Light.ttf"),
  });

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (fontsLoaded) return <HomeStack />;
  else
    return (
      <AppLoading startAsync={getFonts} onFinish={() => setFontsLoaded(true)} />
    );
}
