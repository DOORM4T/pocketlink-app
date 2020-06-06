import { decode, encode } from "base-64";
import { YellowBox } from "react-native";
YellowBox.ignoreWarnings(["Setting a timer"]);

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/functions";
import config from "./firebase.config.json";

if (firebase.apps.length === 0) firebase.initializeApp(config);

export const linksDB = firebase.firestore().collection("links");
export const functions = firebase.functions();
