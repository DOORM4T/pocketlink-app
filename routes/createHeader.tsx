import React from "react";
import Header from "../shared/Header";
import { navigationProp } from "./routes";

/**
 * @description create a navigation Header with a custom title
 * @param title title of header
 * @param navigation prop for stack navigation
 */
export function createHeader(title: string, navigation: navigationProp) {
  return <Header title={title} navigation={navigation} />;
}
