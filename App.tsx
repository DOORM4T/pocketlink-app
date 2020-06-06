import React, { useState, useEffect } from "react";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import HomeStack from "./routes/HomeStack";
// import { linksDB } from "./firebaseApp";

const getFonts = () =>
  Font.loadAsync({
    "OpenSans-Regular": require("./assets/fonts/Open_Sans/OpenSans-Regular.ttf"),
    "OpenSans-Bold": require("./assets/fonts/Open_Sans/OpenSans-Bold.ttf"),
    "OpenSans-Light": require("./assets/fonts/Open_Sans/OpenSans-Light.ttf"),
  });

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // useEffect(() => {
  //   linksDB.get().then((snapshot) => {
  //     snapshot.docs.forEach((doc) => console.log(doc.data()));
  //   });
  // });

  if (fontsLoaded) return <HomeStack />;
  else
    return (
      <AppLoading startAsync={getFonts} onFinish={() => setFontsLoaded(true)} />
    );
}
